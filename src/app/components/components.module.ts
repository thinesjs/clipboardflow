import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundCardComponent } from './not-found-card/not-found-card.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    NotFoundCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  exports: [
    NotFoundCardComponent,
  ]
})
export class ComponentsModule { }
