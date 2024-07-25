import { InputNumberValidationBuilder } from "../input-number-validation-builder";
import { Validation } from "../validation.type";

export function validateClipboardValue({decimalPoint, value, decimalCount, endCursorPosition, startCursorPosition}: InputNumberValidationBuilder) : Validation {

    return function(): boolean {
        const regex = new RegExp(`0{1}|[1-9]+(${decimalPoint})*([0-9]{${decimalCount}})*`);  
        
        return regex.test(value);
    }
}