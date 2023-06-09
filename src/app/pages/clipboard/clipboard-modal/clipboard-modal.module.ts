import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, } from '@ionic/angular';
import { ClipboardModalPage } from './clipboard-modal.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule
  ],
  declarations: [ClipboardModalPage],
  providers: [DatePipe]
})
export class ClipboardModalPageModule { }
