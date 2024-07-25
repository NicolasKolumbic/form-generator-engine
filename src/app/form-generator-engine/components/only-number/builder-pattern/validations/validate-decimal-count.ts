import { InputNumberValidationBuilder } from "../input-number-validation-builder";
import { Validation } from "../validation.type";

export function validateDecimalCount({startCursorPosition, endCursorPosition , decimalPoint, key, value, decimalCount}: InputNumberValidationBuilder) : Validation {

    return function(): boolean {
        const decimalPointMissing = !value.includes(decimalPoint);
        const isWritingBeforeDecimalPoint = startCursorPosition <= value.indexOf(decimalPoint);
        const isWritingAfterDecimalPoint =  startCursorPosition > value.indexOf(decimalPoint) && 
                                                    (
                                                        value.substring(value.indexOf(decimalPoint) + 1).length < decimalCount ||
                                                        endCursorPosition > startCursorPosition
                                                    )
        
            return  decimalPointMissing || isWritingBeforeDecimalPoint || isWritingAfterDecimalPoint;                    
    }
}