import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {
  // @Input() msgErro: string;
  // @Input() mostrarErro: boolean;

  @Input() control: FormControl;
  @Input() label: string;

  constructor() {}

  ngOnInit() {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
