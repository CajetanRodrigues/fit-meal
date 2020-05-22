import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { MealsService } from './providers/meals.service';
import { RoutineService } from './providers/routine.service';
import { ProfileService } from './providers/profile.service';
import { AuthenticationService } from './providers/authentication.service';
import { ImageSearchService } from './providers/image-search.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { AboutPage } from './pages/about/about';
import { AboutModule } from './pages/about/about.module';
import { BasketService } from './providers/basket.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Camera,CameraOptions,PictureSourceType } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { MealsFilterPage } from './pages/meals/meals-filter/meals-filter.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    AboutModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [AppComponent, MealsFilterPage],
  providers: [InAppBrowser, SplashScreen, StatusBar, BasketService,
  Camera, File, WebView, FilePath, Storage,
ImageSearchService,
AuthenticationService,
RoutineService,
MealsService,
GooglePlus,
Facebook,
NativeStorage
],
  bootstrap: [AppComponent],
  entryComponents: [AboutPage, MealsFilterPage]
})
export class AppModule {}
