import { Injectable } from '@angular/core';
import { FormSessionService } from './form-session.service';

@Injectable({
  providedIn: 'root'
})
export class FormManagerService {

  constructor(private readonly formSession: FormSessionService) { }

  get form() {
    return this.formSession.form;
  }
}
