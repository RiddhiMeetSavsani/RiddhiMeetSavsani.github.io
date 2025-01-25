

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './app/components/home/home.component';
import {AboutMeComponent} from './app/components/about-me/about-me.component';
import {SkillsComponent} from './app/components/skills/skills.component';
import {ContactComponent} from './app/components/contact/contact.component';
import {ProjectsComponent} from './app/components/projects/projects.component';
import {MainpageComponent} from './app/components/mainpage/mainpage.component';


const routes: Routes = [
  {path: '', component: MainpageComponent},
  {path: 'home', component: MainpageComponent},
  {path: 'about', component: AboutMeComponent},
  {path: 'contact', component: ContactComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).then(r => console.log('Bootstrap successful'));


