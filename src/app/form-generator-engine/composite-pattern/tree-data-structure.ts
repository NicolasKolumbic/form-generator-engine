import { BaseElement } from './base-element';

export abstract class TreeDataStructure extends BaseElement {
  #left: BaseElement | undefined;
  #right: BaseElement | undefined;
  #child: BaseElement | undefined;

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

  get child(): BaseElement | undefined {
    return this.#child;
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

  hasChild(): boolean {
    return this.#child !== undefined;
  }

  setChild(child: BaseElement): TreeDataStructure {
    this.#child = child;
    return this;
  }
}