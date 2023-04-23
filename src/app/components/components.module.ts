import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NotFoundCardComponent } from './not-found-card/not-found-card.component';
import { MessageWithSvgComponent } from './message-with-svg/message-with-svg.component';

@NgModule({
  declarations: [
    NotFoundCardComponent,
    MessageWithSvgComponent
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
    MessageWithSvgComponent
  ]
})
export class ComponentsModule { }
