import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject, takeUntil } from 'rxjs';
import { ScoutService, Symptom } from 'src/app/services/scout.service';

@Component({
  selector: 'app-symptom-picker',
  templateUrl: './symptom-picker.component.html',
  styleUrls: ['./symptom-picker.component.css']
})
export class SymptomPickerComponent implements OnInit, OnDestroy {
  @ViewChild('auto') autocomplete!: MatAutocomplete;

  @Output() onSymptomSelected = new EventEmitter<Symptom>();

  private unsubscribe = new Subject<void>();

  symptomInputControl!: FormControl;
  symptoms: Symptom[] = [];
  symptomInput = '';
  filteredSymptoms!: Symptom[]

  constructor(
    public scoutService: ScoutService
  ) {}

  ngOnInit(): void {
    this.updateSymptoms();
    this.scoutService.onSymptomsUpdated$.pipe(
        takeUntil(this.unsubscribe)
      ).subscribe( symptoms => {
        this.symptoms = symptoms;
        this.updateFilteredSymptoms();
    });

    this.symptomInputControl = new FormControl('');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  selectSymptom(symptom: Symptom)
  {
    this.onSymptomSelected.emit(symptom);

    this.symptomInput = '';

    this.symptomInputControl.setValue('');

    this.updateFilteredSymptoms();
  }

  onAutoCompleteSelected(event: MatAutocompleteSelectedEvent )
  {
    const symptom: Symptom = event.option.value;

    event.option.deselect();

    this.selectSymptom(symptom);
  }

  onSymptomInputChange(event: Event)
  {
    this.symptomInput = this.symptomInputControl.value;
    this.updateFilteredSymptoms();
  }

  updateSymptoms()
  {
    this.scoutService.getSymptoms().subscribe({
      next: (symptoms) => {
        this.symptoms = symptoms;
      }
    });
  }

  updateFilteredSymptoms()
  {
    if (this.symptomInput.length > 0)
      this.filteredSymptoms = this.symptoms.filter(symptom => symptom.name.substring(0,this.symptomInput.length).toLowerCase() == this.symptomInput.toLowerCase());
    else
      this.filteredSymptoms = this.symptoms;
  }
}
