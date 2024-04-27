import { Routes } from '@angular/router';
import {HelloWorldComponent} from "./pages/hello-world/hello-world.component";
import {HomeComponent} from "./home/home.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {ExplorePageComponent} from "./pages/explore-page/explore-page.component";
import {ViewPostComponent} from "./pages/view-post/view-post.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AllPageComponent} from "./pages/all-page/all-page.component";
import {AdminEditComponent} from "./pages/admin-edit/admin-edit.component";
import {EditorComponent} from "./pages/editor/editor.component";
import {SearchPageComponent} from "./pages/serach-page/serach-page.component";

export const routes: Routes = [
  { path: 'hello-world', component: HelloWorldComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'post-explore', component: ExplorePageComponent },
  { path: 'post/edit', component: EditorComponent },
  { path: 'post-edit/:id', component: EditorComponent },
  { path: 'post/:id', component: ViewPostComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'all', component: AllPageComponent },
  { path: 'adminEdit', component: AdminEditComponent },
  { path: 'search', component: SearchPageComponent },
];
