import {HeaderComponent} from './header/header.component';
import {NgModule} from "@angular/core";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatList} from "@angular/material/list";
import {HomeComponent} from "./home/home.component";
import {MatCard} from "@angular/material/card";
import {NsLayoutComponent} from "./ns-layout/ns-layout.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
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
    NsLayoutComponent,
    HttpClientModule,
    CommonModule
  ],
  providers: [HttpClientModule],
  exports: [
    HeaderComponent
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
