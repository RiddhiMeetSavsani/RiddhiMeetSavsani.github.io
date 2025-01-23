import { Component } from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {ProjectsComponent} from '../projects/projects.component';

@Component({
  selector: 'app-mainpage',
  imports: [
    HomeComponent,
    ProjectsComponent
  ],
  templateUrl: './mainpage.component.html',
  standalone: true,
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {

}
