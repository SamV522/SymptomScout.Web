import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { 'style': ' display: flex; flex-grow: 1; height: 100%; min-width: auto;'}
})
export class AppComponent {
  title = 'SymptomScout.Web';
}
