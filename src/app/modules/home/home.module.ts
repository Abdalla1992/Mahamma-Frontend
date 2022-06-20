import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HowWorkComponent } from './how-work/how-work.component';
import { FeaturesComponent } from './features/features.component';
import { SponsersComponent } from './sponsers/sponsers.component';
import { SubscripeComponent } from './subscripe/subscripe.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    HowWorkComponent,
    FeaturesComponent,
    SponsersComponent,
    SubscripeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgbModule
  ],
  exports: []
})
export class HomeModule { }
