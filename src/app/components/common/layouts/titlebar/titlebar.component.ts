import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent {
  @Output() onNurseClick = new EventEmitter();
}
