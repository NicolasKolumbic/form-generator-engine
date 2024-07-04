import { BaseElement } from './base-element';

export abstract class TreeDataStructure<TChild> extends BaseElement {
  #left: TChild | undefined;
  #right: TChild | undefined;

  constructor(
    name: string,
    title?: string,
    metadata?: JSONObject,
    left?: TChild
  ) {
    super(name, title, metadata);
    this.#left = left;
  }

  hasPrevious(): boolean {
    return this.#left !== undefined;
  }

  hasNext(): boolean {
    return this.#right !== undefined;
  }

  setNext(nextChild: TChild): TreeDataStructure<TChild> {
    this.#right = nextChild;
    return this;
  }

  setPrevious(previousChild: TChild): TreeDataStructure<TChild> {
    this.#left = previousChild;
    return this;
  }
}