import { InputNumberValidationBuilder } from "../input-number-validation-builder";
import { Validation } from "../validation.type";

export function validateZeroValue({startCursorPosition, onlyIntegers, value, decimalPoint, key}: InputNumberValidationBuilder) : Validation {

    const regex = new RegExp(`[1-9${decimalPoint}]`);

    return function(): boolean {

        if(onlyIntegers){
            return /[1-9]/.test(key) ||
                    parseInt(key,10) === 0 && 
                    (
                        parseInt(value, 10) !== 0 ||
                        value === ""
                    );
        }
        return regex.test(key) ||
        (
            parseInt(key,10) === 0 &&
            (
                value === '' ||
                !value.includes(decimalPoint) ||
                (
                    value.includes(decimalPoint) &&
                    startCursorPosition <= value.indexOf(decimalPoint) &&
                    startCursorPosition > 0 &&
                    parseInt(value,10) !== 0
                ) || 
                (
                    value.includes(decimalPoint) &&
                    startCursorPosition > value.indexOf(decimalPoint) 
                )
            )
        ); 
    }
}