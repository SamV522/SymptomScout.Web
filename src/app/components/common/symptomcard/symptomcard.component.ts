import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Symptom } from 'src/app/services/scout.service';

@Component({
  selector: 'app-symptom-card',
  templateUrl: './symptomcard.component.html',
  styleUrls: ['./symptomcard.component.scss'],
  host: { 'style': 'display: flex; width:100%;'}
})
export class SymptomCardComponent {
  @Input() symptom!: Symptom;
  @Input() disableOpenSymptom: boolean = false;
  @Input() disableRemoveSymptom: boolean = false;
  
  @Output() openSymptomClick = new EventEmitter<Symptom>();
  @Output() removeSymptomClick = new EventEmitter<Symptom>();

  constructor (
    private router: Router
  ) {}

  openSymptomClickEvent(symptom: Symptom) {
    this.openSymptomClick.emit(symptom);
    this.router.navigate(['symptoms', symptom.symptomId])
  }
}
