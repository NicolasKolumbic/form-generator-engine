import { BaseElement } from './base-element';

export abstract class TreeDataStructure extends BaseElement {
  #left: BaseElement | undefined;
  #right: BaseElement | undefined;
  #firstChild: BaseElement | undefined;
  #lastChild: BaseElement | undefined;

  constructor(
    name: string,
    isVisible: boolean,
    title?: string,
    metadata?: JSONObject,
    left?: BaseElement
  ) {
    super(name, isVisible,title, metadata);
    this.#left = left;
  }

  get firstChild(): BaseElement | undefined {
    return this.#firstChild;
  }

  get lastChild(): BaseElement | undefined {
    return this.#lastChild;
  }

  get right(): BaseElement | undefined{
    return this.#right;
  }

  get left(): BaseElement | undefined{
    return this.#left;
  }

  hasPrevious(): boolean {
    return this.#left !== undefined;
  }

  hasNext(): boolean {
    return this.#right !== undefined;
  }

  setNext(nextChild: BaseElement): TreeDataStructure {
    this.#right = nextChild;
    return this;
  }

  setPrevious(previousChild: BaseElement): TreeDataStructure {
    this.#left = previousChild;
    return this;
  }

  hasfirstChild(): boolean {
    return this.#firstChild !== undefined;
  }

  setFirstChild(firstChild: BaseElement): TreeDataStructure {
    this.#firstChild = firstChild;
    return this;
  }

  setLastChild(lastChild: BaseElement): TreeDataStructure {
    this.#lastChild = lastChild;
    return this;
  }
}