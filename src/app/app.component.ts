import { Component, OnInit, ViewChild, WritableSignal, signal } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DemoDataService } from './services/demo-data.service';
import { UpdatedForm } from '@form-generator-engine/abstractions/public';
import { PageSchema } from '@form-generator-engine/abstractions/schemas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  schema: WritableSignal<JSONValue | null> = signal(null);
  public editorOptions: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor!: JsonEditorComponent;

  page!: PageSchema;

  constructor(
    private readonly demoDataService: DemoDataService
  ) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; 
  }

  ngOnInit(): void {
    this.demoDataService.getData('/assets/demo-form.json').subscribe((data) => {
      this.schema.set(data as JSONValue);
    });

    this.demoDataService.getData('/assets/demo-page.json').subscribe((data) => {
      this.page = data as PageSchema;
    });
  }

  updateForm(updatedValue: UpdatedForm) {
    console.log(updatedValue);
    updatedValue.form.addSchemaElement(this.page);
  }
}
