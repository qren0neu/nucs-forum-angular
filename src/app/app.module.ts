import {HeaderComponent} from './header/header.component';
import {NgModule} from "@angular/core";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {HomeComponent} from "./home/home.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NsLayoutComponent} from "./ns-layout/ns-layout.component";
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ExplorePageComponent} from "./pages/explore-page/explore-page.component";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MarkdownModule} from "ngx-markdown";
import {ViewPostComponent} from "./pages/view-post/view-post.component";
import {DashboardCardComponent} from "./dashboard-card/dashboard-card.component";
import {LikeComponent} from "./like/like.component";
import {SaveComponent} from "./save/save.component";
import {FollowerComponent} from "./follower/follower.component";
import {AccountUpdateComponent} from "./account-update/account-update.component";
import {MyPostComponent} from "./my-post/my-post.component";
import {HistoryComponent} from "./history/history.component";
import {MatDivider} from "@angular/material/divider";
import {MatOption} from "@angular/material/autocomplete";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatLine} from "@angular/material/core";


@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        ExplorePageComponent,
        DashboardCardComponent,
        LikeComponent,
        SaveComponent,
        FollowerComponent,
        AccountUpdateComponent,
        MyPostComponent,
        HistoryComponent,
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
        MatDivider,
        MatOption,
        MatOption,
        MatLabel,
        MatLabel,
        MatError,
        MatLabel,
        MatFormField,
        MatError,
        MatFormField,
        MatLabel,
        MatError,
        MatOption,
        MatFormField,
        MatLabel,
        MatFormField,
        MatOption,
        MatFormField,
        MatLabel,
        MatFormField,
        MatLabel,
        MatError,
        MatFormField,
        MatError,
        MatFormField,
        MatError,
        MatSelect,
        MatSelect,
        FormsModule,
        FormsModule,
        FormsModule,
        FormsModule,
        FormsModule,
        MatInput,
        MatInput,
        MatInput,
        MatInput,
        MatInput,
        MatInput,
        MatInput,
        MatInput,
        MatInput,
        MatInput,
        MatInput,
        MatListItem,
        MatLine,
        MatListSubheaderCssMatStyler,
    ],
    providers: [HttpClientModule],
    exports: [
        HeaderComponent,
        DashboardCardComponent,
        LikeComponent,
        SaveComponent,
        FollowerComponent,
        AccountUpdateComponent,
        MyPostComponent,
        HistoryComponent,
    ],
    bootstrap: [HomeComponent]
})
export class AppModule {
}
