import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClipboardPageRoutingModule } from './clipboard-routing.module';
import { ClipboardPage } from './clipboard.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClipboardPageRoutingModule,
        ComponentsModule
    ],
    exports: [],
    declarations: [ClipboardPage]
})
export class ClipboardPageModule { }
