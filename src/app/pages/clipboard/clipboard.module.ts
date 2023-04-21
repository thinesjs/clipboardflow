import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClipboardPageRoutingModule } from './clipboard-routing.module';
import { ClipboardPage } from './clipboard.page';
// import { SwiperModule } from 'swiper/angular';
// import { OperationHoursFilterPipe } from './operation-hours-filter/operation-hours-filter.pipe';
// import { TimeFormatterPipe } from './time-formatter/time-formatter.pipe';
// import { SharedPipesModule } from '../../shared/shared-pipes.module';
// import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClipboardPageRoutingModule,
        ReactiveFormsModule,
        // SwiperModule,
        // SharedPipesModule,
        // ComponentsModule
    ],
    exports: [],
    declarations: [ClipboardPage]
})
export class ClipboardPageModule { }
