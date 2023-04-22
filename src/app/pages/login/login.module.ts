import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
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
        LoginPageRoutingModule,
        ReactiveFormsModule,
        // SwiperModule,
        // ComponentsModule
    ],
    exports: [],
    declarations: [LoginPage],
    providers:[AuthService]
})
export class LoginPageModule { }
