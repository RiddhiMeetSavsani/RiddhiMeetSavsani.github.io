import { Component } from '@angular/core';
import {HoverEffectDirective} from '../../directives/hover-effect.directive';

@Component({
  selector: 'app-hobby',
  imports: [
    HoverEffectDirective
  ],
  templateUrl: './hobby.component.html',
  standalone: true,
  styleUrl: './hobby.component.css'
})
export class HobbyComponent {

}
