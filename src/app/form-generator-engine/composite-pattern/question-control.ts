import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Controls } from '../helpers';
import { Question } from './question';
import { FormEngineComponent } from '../typing/form-engine-component';

import { BaseElement } from './base-element';
import { DynamicComponent } from '@form-generator-engine/abstractions/internal';
import { QuestionBaseComponent, UpdateField } from '@form-generator-engine/abstractions/public';
import { QuestionControlSchema } from '@form-generator-engine/abstractions/schemas';

export class QuestionControl
  extends BaseElement
  implements DynamicComponent<QuestionBaseComponent>
{
  component!: FormEngineComponent<QuestionBaseComponent>;
  #parent: Question;
  #componentType!: Controls;
  #name: string;
  #disabled: boolean;
  #label!: string;
  #text!: string;
  #formControl!: FormControl;
  #value?: JSONValue;
  #options: JSONObject[];
  #required: boolean;
  #minlength: number;
  #maxlength: number;
  #pattern: RegExp | null;
  #placeholder: string;

  #update: Subject<UpdateField>;
  #error: Subject<string>;

  constructor(
    {
      disabled,
      name,
      title,
      metadata,
      componentType,
      label,
      value,
      text,
      options,
      required,
      maxLength,
      minLength,
      pattern,
      placeholder,
      isVisible
    }: QuestionControlSchema,
    parent: Question
  ) {
    super(name, isVisible, title, metadata);
    this.#text = text ?? '';
    this.#componentType = componentType;
    this.#name = name ?? crypto.randomUUID();
    this.#disabled = disabled ?? false;
    this.#label = label ?? '';
    this.#value = value;
    this.#parent = parent;
    this.#options = options ?? [];
    this.#required = required ?? false;
    this.#minlength = minLength ?? 0;
    this.#maxlength = maxLength ?? Infinity;
    this.#pattern = pattern ?? null;
    this.#placeholder = placeholder ?? '';
    this.#update = new Subject();
    this.#error = new Subject();
  }

  get text(): string {
    return this.#text;
  }

  get label(): string {
    return this.#label;
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  get type(): Controls {
    return this.#componentType;
  }

  get parent(): Question {
    return this.#parent;
  }

  get update(): Subject<UpdateField> {
    return this.#update;
  }

  get error(): Subject<string> {
    return this.#error;
  }

  get control(): FormControl {
    return this.#formControl;
  }

  get options(): JSONObject[] {
    return this.#options;
  }

  get isRequired(): boolean {
    return this.#required;
  }

  get minlength(): number {
    return this.#minlength;
  }

  get maxlength(): number {
    return this.#maxlength;
  }

  get pattern(): RegExp | null {
    return this.#pattern;
  }

  get placeholder(): string {
    return this.#placeholder;
  }

  updateValue<T>(value: T): void {
    this.#value = value as JSONValue;
    this.#update.next({
      name: this.#name,
      value: this.#value,
    });
  }

  getValue<T>(): T {
    return this.#value as T;
  }

  setControl(formControl: FormControl): void {
    this.#formControl = formControl;
  }

  disable(): void {
    this.#disabled = true;
  }

  enable(): void {
    this.#disabled = false;
  }
}
