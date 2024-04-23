import { HeaderComponent } from './header/header.component';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatList} from "@angular/material/list";
import {HomeComponent} from "./home/home.component";
import {MatCard} from "@angular/material/card";
import {NsLayoutComponent} from "./ns-layout/ns-layout.component";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    // other components
  ],
  imports: [
    MatToolbar,
    MatIcon,
    NgIf,
    MatButton,
    MatIconButton,
    NgOptimizedImage,
    MatList,
    MatCard,
    NsLayoutComponent
  ],
  providers: [],
  exports: [
    HeaderComponent
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
