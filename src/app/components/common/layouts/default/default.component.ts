import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  host: { 'style': 'display: flex; flex-direction: column; flex-grow: 1; min-width: auto; height:100vh;'}
})
export class DefaultLayoutComponent {

}
