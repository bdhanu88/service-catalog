import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { TranslateModule } from './translate/translate.module';
import { MaterialModule } from './material/material.module';
import { GridCustomModule } from './ag-grid/aggrid-custom.module';

@NgModule({
    imports: [
        CommonModule, 
        TranslateModule, 
        MaterialModule, 
        GridCustomModule
    ],
    declarations: [],
    exports: [TranslateModule, MaterialModule, GridCustomModule]

})
export class SharedModule { }
