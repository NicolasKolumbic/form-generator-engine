import { CharacterType } from './charactertype';

export class Character {
  value: string;
  type!: CharacterType;
  position: number;

  #regex!: RegExp;

  constructor(value: string, type: string, position: number) {
    this.value = value;
    this.position = position;
    this.setType(type);
  }

  validate(value: string): boolean {
    return this.#regex.test(value)
  }

  private setType(type: string) {
    switch (type) {
      case '0':
        this.type = CharacterType.ZeroToNine;
        break;
      case '1':
        this.type = CharacterType.OneToNine;
        break;
      case 'A':
        this.type = CharacterType.UpperCase;
        break;
      case 'a':
        this.type = CharacterType.LowerCase;
        break;
      default:
        this.type = CharacterType.Alphabetic;
        break;
    }
    this.#regex = new RegExp(this.type);
  }
}
