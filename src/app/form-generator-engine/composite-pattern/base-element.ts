import { Subject } from 'rxjs';
import { HtmlFormControl, Metadata } from '../abstractions';

export abstract class BaseElement implements Metadata, HtmlFormControl {
  #metadata?: Map<string, JSONValue | null>;
  #name: string;
  #title: string;
  #isInjected: boolean;
  #isVisible: boolean;

  #visibilityChanged: Subject<boolean>;

  constructor(name: string, isVisible: boolean, title?: string, metadata?: JSONObject) {
    this.#name = name ?? crypto.randomUUID();
    this.#isVisible = isVisible === undefined || isVisible;
    this.#title = title ?? '';
    this.#isInjected = false;
    this.#visibilityChanged = new Subject();
    if (metadata !== undefined) {
      this.#metadata = new Map<string, JSONValue | null>();
      Object.keys(metadata).forEach((key: string) => {
        this.#metadata?.set(key, metadata[key]);
      });
    }
  }

  get name(): string {
    return this.#name;
  }

  get title(): string {
    return this.#title;
  }

  get isVisible(): boolean {
    return this.#isVisible;
  }

  get visibilityChanged(): Subject<boolean> {
    return this.#visibilityChanged;
  }

  hasMetadata(): boolean {
    return this.#metadata !== undefined;
  }

  metadata(key?: string): JSONValue | null | undefined {
    if (!key) {
      const result: JSONObject = {};
      const iterable: IterableIterator<string> | undefined =
        this.#metadata?.keys();
      if (iterable) {
        let iterator = iterable.next();
        while (!iterator.done) {
          result[iterator.value] = this.#metadata?.get(iterator.value) || '';
          iterator = iterable?.next();
        }
      }

      return result;
    } else if (this.hasMetadata() && key && this.#metadata?.has(key)) {
      return this.#metadata.get(key);
    }
    return null;
  }

  injected(): void {
    this.#isInjected = true;
  }

  hasInjected(): boolean {
    return this.#isInjected;
  }

  getSchema<T>(includesProps: string[]): T {
    const schema: T = {} as T;
    includesProps.forEach((prop: string) => {
      Object.defineProperty(schema, prop, {
        value: this[prop as keyof JSONValue],
        writable: false,
      });
    });
    return schema;
  }

  show(): void {
    this.#isVisible = true;
    this.#visibilityChanged.next(this.#isVisible);
  }

  hide(): void {
    this.#isVisible = false;
    this.#visibilityChanged.next(this.#isVisible);
  }
}
