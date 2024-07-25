import { isValidCharacter } from "./validations/is-valid-character";
import { validateDecimalPoint } from "./validations/validate-decimal-point";
import { validateClipboardValue } from "./validations/validate-clipboard-value";
import { Validation } from "./validation.type";
import { validateDecimalCount } from "./validations/validate-decimal-count";
import { validateZeroValue } from "./validations/validate-zero-value";
import { Operation } from "./helper/operation.enum";
import { OnlyNumberValidationResult } from "./helper/only-number-validation-result";

export class InputNumberValidationBuilder {

    value: string;
    key: string;
    startCursorPosition: number;
    endCursorPosition: number;
    onlyIntegers: boolean;
    decimalPoint: string;
    decimalCount: number;

    isValidCharacter: Validation;
    validateDecimalPoint: Validation;
    validateZeroValue: Validation;
    validateDecimalCount: Validation;
    validateClipboardValue: Validation;

    constructor(
        value: string,
        key: string,
        startCursorPosition: number,
        endCursorPosition: number,
        onlyIntegers: boolean,
        decimalPoint?: string,
        decimalCount?: number
    ) {
        this.value = value.toString();
        this.startCursorPosition = startCursorPosition;
        this.endCursorPosition = endCursorPosition;
        this.key = key;
        this.onlyIntegers = onlyIntegers;
        this.decimalPoint = decimalPoint ?? ".";
        this.decimalCount = decimalCount ?? 2;

        this.isValidCharacter = isValidCharacter(this);
        this.validateDecimalPoint = validateDecimalPoint(this);
        this.validateDecimalCount = validateDecimalCount(this);
        this.validateZeroValue = validateZeroValue(this);
        this.validateClipboardValue = validateClipboardValue(this);

    }

    validate(): OnlyNumberValidationResult {
        if(this.isValidCharacter() && this.validateDecimalPoint() && this.validateZeroValue() && this.validateDecimalCount()) {
            return this.update(Operation.Normal);
        } else if(/Backspace/.test(this.key)) {           
            if(this.startCursorPosition > 0 || this.endCursorPosition > this.startCursorPosition ) {
                return this.update(Operation.BackSpace);
            } 
        } else if(/Delete/.test(this.key)) {
            return this.update(Operation.Delete);
        } else if(/paste/.test(this.key)) {
            if(this.validateClipboardValue()) {
               return this.update(Operation.Clipboard);
            }
        }

        return {
            isValid: false,
            value: this.value,
            cursor: this.startCursorPosition
        } as OnlyNumberValidationResult
    }

    private update(operation: Operation): OnlyNumberValidationResult {
        let cursor = this.startCursorPosition;
        let startValue = this.value.slice(0, this.startCursorPosition);
        let endValue = this.value.slice(this.endCursorPosition);

        if(operation === Operation.Normal) {
            cursor++;
        } else if(operation === Operation.BackSpace) {      
            if(this.startCursorPosition === this.endCursorPosition && this.startCursorPosition > 0) {
                cursor--;
                startValue = this.value.slice(0, cursor);
                endValue = this.value.slice(cursor + 1);
            }
        } else if(operation === Operation.Delete) {
            endValue = this.value.slice(cursor + 1);
        }

        return {
            value: startValue + (operation === Operation.Normal ? this.key : "") + endValue,
            isValid: true,
            cursor
        } as OnlyNumberValidationResult;
    }
}