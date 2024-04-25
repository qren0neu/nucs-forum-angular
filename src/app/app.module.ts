import {HeaderComponent} from './header/header.component';
import {NgModule} from "@angular/core";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatList} from "@angular/material/list";
import {HomeComponent} from "./home/home.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NsLayoutComponent} from "./ns-layout/ns-layout.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {ExplorePageComponent} from "./pages/explore-page/explore-page.component";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MarkdownModule} from "ngx-markdown";
import {ViewPostComponent} from "./pages/view-post/view-post.component";


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ExplorePageComponent,
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
    CommonModule,
    MatCardContent,
    MatChip,
    MatFabButton,
    MatChipListbox,
    MarkdownModule.forRoot(),
  ],
  providers: [HttpClientModule],
  exports: [
    HeaderComponent
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
