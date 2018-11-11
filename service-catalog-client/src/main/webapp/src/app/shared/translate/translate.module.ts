import { TranslatePipe } from '../translate';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TranslatePipe
  ],
  exports: [
    TranslatePipe
  ]
})
export class TranslateModule { }
