import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {MatLine} from "@angular/material/core";
import {HistoryComponent} from "../../history/history.component";
import {AccountUpdateComponent} from "../../account-update/account-update.component";
import {AppModule} from "../../app.module";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-me-page',
    standalone: true,
    imports: [
        MatIcon,
        MatList,
        MatListItem,
        NgSwitch,
        NgForOf,
        MatLine,
        AppModule,
        NgSwitchCase,
        NgSwitchDefault,
        MatButton
    ],
    templateUrl: './me-page.component.html',
    styleUrl: './me-page.component.css'
})
export class MePageComponent {
    feature = 'account';

    features = [
        {title: 'Account', label: 'account', icon: 'account_circle'},
        {title: 'Saved', label: 'save', icon: 'bookmark'},
        {title: 'Liked', label: 'like', icon: 'star'},
        {title: 'My Post', label: 'post', icon: 'article'},
        {title: 'History', label: 'history', icon: 'history'},
        {title: 'Followed', label: 'follow', icon: 'people'},
        {title: 'Follower', label: 'follower', icon: 'people_alt'}
    ];

    setFeature(label: string) {
        this.feature = label;
    }
}
