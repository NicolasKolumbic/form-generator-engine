export interface FormElement<TElement, TParent> {
    parent?: TParent;
    left?: TElement;
    setNext(element: TElement): void;
    setPrevious(element: TElement): void;
}