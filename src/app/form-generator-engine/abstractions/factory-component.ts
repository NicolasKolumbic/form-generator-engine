import { AfterViewInit, OnChanges } from "@angular/core";
import { DynamicComponent } from "./dynamic-component";

export interface FactoryComponent extends AfterViewInit, OnChanges {
    transform<TComponent>(element: DynamicComponent<TComponent>): void
}