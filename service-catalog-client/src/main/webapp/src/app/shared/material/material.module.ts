import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdDialogModule, MdDatepickerModule,
  MdNativeDateModule, MdAccordion
} from '@angular/material';

@NgModule({
  imports: [BrowserAnimationsModule , MdButtonModule , MdCheckboxModule , MdInputModule , MdSelectModule, MdDialogModule , MdDatepickerModule , MdNativeDateModule],
  declarations: [ ],
  exports: [ BrowserAnimationsModule , MdButtonModule , MdCheckboxModule , MdInputModule , MdSelectModule, MdDialogModule , MdDatepickerModule , MdNativeDateModule]
})
export class MaterialModule { }
