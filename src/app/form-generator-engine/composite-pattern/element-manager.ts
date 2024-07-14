import { Container, Schema, ContainerSchema, FormElement, BaseElement as BaseElementInterface } from '../abstractions';
import { BaseElement } from './base-element';
import { TreeDataStructure } from './tree-data-structure';
import { factory } from '@form-generator-engine/helpers/factory-function';

export abstract class ElementManager<TChild, TParent, TSchema>
  extends TreeDataStructure
  implements Container<TChild, TParent>
{
  elements: TChild[];
  parent?: TParent;

  constructor(schema: TSchema, parent?: TParent) {
    const { name, elements, metadata, title, isVisible } =
      schema as ContainerSchema<Schema>;
    super(name, isVisible, title, metadata, );
    this.elements = [];
    this.parent = parent;
    
    elements.forEach((element: Schema, index: number) => {
      const elementNode = factory(
        element as Schema,
        this 
      );

      if (elementNode && index > 0) {
        elementNode.setPrevious(this.elements[index - 1] as BaseElement);
      }

      if (index < elements.length && index > 0) {
        (this.elements[index - 1] as FormElement<TChild, TParent>).setNext(
          elementNode as TChild
        );
      }

      if (index === 0) {
        this.setChild(elementNode as BaseElement);
      }

      this.elements.push(elementNode as TChild);
    });
  }

  protected setParent(parent: TParent): void {
    this.parent = parent;
  }

  lastElement(): TChild {
    return this.elements[this.elements.length - 1];
  }
  firstElement(): TChild {
    return this.elements[0];
  }

  filterElements(fn: (element: TChild) => boolean): TChild[] {
    return this.elements.filter(fn);
  }

  addElement(panel: TChild): void {
    this.elements.push(panel);
  }

  findElement(fn: (element: TChild) => boolean): TChild | undefined {
    return this.elements.find(fn);
  }

  hasElement(fn: (element: TChild) => boolean): boolean {
    return this.elements.some(fn);
  }

  hasElementByName(name: string): boolean {
    return this.elements.some(
      (element: TChild) => (element as BaseElement).name === name
    );
  }
}