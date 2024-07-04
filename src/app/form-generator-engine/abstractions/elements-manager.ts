export interface ElementsManager<T, U> {
  addElement(element: T): void;
  addSchemaElement(element: U): void;
  hasElement(name: string): boolean;
  findElement(fn: (element: T) => boolean): T | undefined;
  filterElements(fn: (element: T) => boolean): T[];
  lastElement(): T;
  firstElement(): T;
  checkAndUpdate(): void;
}
