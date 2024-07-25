import { InputNumberValidationBuilder } from "../input-number-validation-builder";
import { Validation } from "../validation.type";

export function validateDecimalPoint({startCursorPosition, decimalPoint, value, key}: InputNumberValidationBuilder) : Validation {

    return function(): boolean {
        
        /*
            1 (value.includes(decimalPoint)): Sí ya tenemos un separador decimal no podriamos incluir otro
            2 (startCursorPosition !== 0): no puede empezar con el separador decimal
            3 (decimalPoint === key) presiono el sepador decimal
        */
        return /[0-9]/.test(key) || (key === decimalPoint &&
                !value.includes(decimalPoint) &&
                startCursorPosition > 0);
    }
}