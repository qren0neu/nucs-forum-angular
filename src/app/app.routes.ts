import { Routes } from '@angular/router';
import {HelloWorldComponent} from "./pages/hello-world/hello-world.component";
import {HomeComponent} from "./home/home.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {ExplorePageComponent} from "./pages/explore-page/explore-page.component";
import {ViewPostComponent} from "./pages/view-post/view-post.component";

export const routes: Routes = [
  { path: 'hello-world', component: HelloWorldComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'post-explore', component: ExplorePageComponent },
  { path: 'post/:id', component: ViewPostComponent },
];
