import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './_modules/shared.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { FooterComponent } from './navigation/footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { MarkdownModule} from 'ngx-markdown';
import { NavComponent } from './navigation/nav/nav.component';
import { UtilitiesModule } from './utilities/utilities.module';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { TimeagoModule } from 'ngx-timeago';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { HomeComponent } from './home/home.component';
import { Nav2Component } from './navigation/nav2/nav2.component';
import { TopsocialComponent } from './navigation/topsocial/topsocial.component';
// import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    FooterComponent,
    BlogComponent,
    NavComponent,
    NotFoundComponent,
    HomeComponent,
    Nav2Component,
    TopsocialComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,
    FlexLayoutModule,
    SharedModule,
    UtilitiesModule,
    SweetAlert2Module.forRoot(),
    MarkdownModule.forRoot(),
    TimeagoModule.forRoot(),
    NgImageSliderModule,
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    // {provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
