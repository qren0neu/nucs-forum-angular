import { Routes } from '@angular/router';
import {HelloWorldComponent} from "./pages/hello-world/hello-world.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: 'hello-world', component: HelloWorldComponent },
  { path: 'home', component: HomeComponent },
];
