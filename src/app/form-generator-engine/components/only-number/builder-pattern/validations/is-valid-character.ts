import { InputNumberValidationBuilder } from "../input-number-validation-builder";
import { Validation } from "../validation.type";

export function isValidCharacter({key, decimalPoint}: InputNumberValidationBuilder): Validation {

    const regex = new RegExp(`[0-9${decimalPoint}]`);

    return function(): boolean {
        return regex.test(key);
    }
}