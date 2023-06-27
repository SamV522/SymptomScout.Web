import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Diagnosis, ScoutService, Symptom } from '../../../services/scout.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-diagnoses',
  templateUrl: './diagnoses.component.html',
  styleUrls: ['./diagnoses.component.scss']
})
export class DiagnosesComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();

  diagnosesInput: string = '';
  diagnoses: Diagnosis[] = [];
  filteredDiagnoses: Diagnosis[] = [];

  constructor(
    private scoutService: ScoutService
  )
  { }

  ngOnInit(): void {
    this.updateDiagnoses();
    this.scoutService.onDiagnosesUpdated$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(diagnoses => {
      this.diagnoses = diagnoses;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  updateDiagnoses()
  {
    this.scoutService.getDiagnoses().subscribe({
      next: 
      (diagnoses) => {
        this.diagnoses = diagnoses;
        this.updateFilteredDiagnoses();
      }, error: (error) =>
      {
        console.log(error);
      }
    }
    );
  }

  updateFilteredDiagnoses(): void {
    this.filteredDiagnoses = this.diagnoses.filter(s => s.name.substring(0,this.diagnosesInput.length).toLowerCase() == this.diagnosesInput.toLowerCase());
  }

  diagnosisSelected(event: MatAutocompleteSelectedEvent )
  {
    const diagnosis: Diagnosis = event.option.value;

    if (diagnosis)
      this.diagnosesInput = diagnosis.name;
  }

  onDiagnosisInputChange(event: Event)
  {
    this.updateFilteredDiagnoses();
  }
}
