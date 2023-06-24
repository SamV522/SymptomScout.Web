import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Diagnosis, Symptom } from 'src/app/services/scout.service';

@Component({
  selector: 'app-diagnosis-card',
  templateUrl: './diagnosiscard.component.html',
  styleUrls: ['./diagnosiscard.component.scss'],
  host: { 'style': 'display: flex; width:100%;'}
})
export class DiagnosisCardComponent {
  @Input() diagnosis!: Diagnosis;
  @Input() disableOpenDiagnosis: boolean = false;
  
  @Output() openDiagnosisClick = new EventEmitter<Diagnosis>();

  constructor (
    private router: Router
  ) {}

  openDiagnosisClickEvent(diagnosis: Diagnosis) {
    this.openDiagnosisClick.emit(diagnosis);
    this.router.navigate(['diagnosis', diagnosis.diagnosisId])
  }
}
