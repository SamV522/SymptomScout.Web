import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Diagnosis, ScoutService } from '../../../services/scout.service';
import { Observable, Subject, merge, takeUntil } from 'rxjs';

@Component({
  selector: 'app-diagnoses',
  templateUrl: './diagnoses.component.html',
  styleUrls: ['./diagnoses.component.scss']
})
export class DiagnosesComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();

  public diagnoses$!: Observable<Diagnosis[]>;
  diagnosesInput: string = '';
  diagnoses: Diagnosis[] = [];
  filteredDiagnoses: Diagnosis[] = [];

  constructor(
    private scoutService: ScoutService
  )
  { }

  ngOnInit(): void {
    this.diagnoses$ = merge(
      this.scoutService.getDiagnoses(),
      this.scoutService.onDiagnosesUpdated$.pipe(takeUntil(this.unsubscribe))
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  updateDiagnoses()
  {
    this.diagnoses$.subscribe({
        next: (diagnoses) => {
          this.diagnoses = diagnoses;
          this.updateFilteredDiagnoses();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  updateFilteredDiagnoses(): void {
    this.filteredDiagnoses = this.diagnoses.filter(s => s.name.toLowerCase().includes(this.diagnosesInput.toLowerCase()));
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
