import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {Routes} from '@angular/router';
import {HomeComponent} from './app/components/home/home.component';
import {AboutMeComponent} from './app/components/about-me/about-me.component';
import {SkillsComponent} from './app/components/skills/skills.component';
import {ContactComponent} from './app/components/contact/contact.component';
import {ProjectsComponent} from './app/components/projects/projects.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'aboutMe', component: AboutMeComponent},
  {path: 'skills', component: SkillsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'projects', component: ProjectsComponent},
]

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
