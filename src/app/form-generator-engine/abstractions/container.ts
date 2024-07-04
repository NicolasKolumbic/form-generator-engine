export interface Container<TChild, TParent> {
  elements: TChild[];
  parent?: TParent;
}
