import { Injectable } from "@angular/core";
import { Character } from "./character";

@Injectable()
export class MaskValidationBuilder {

    characters: Character[] = [];

    init(expression: string) {
        expression.split('').forEach((character: string, index: number) => {
            this.characters.push(new Character(character,index))
        });
    }
    
    validate(value: string, startCursorPosition:number, endCursorPosition: number ): boolean {
        const validator = this.characters.at(startCursorPosition);
        if(validator) {
            return validator.validate(value)
        }
        return false;
    }
}