import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ScoutService, Symptom } from '../../../services/scout.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent {

  symptomInput: string = '';
  symptoms: Symptom[] = [];
  filteredSymptoms: Symptom[] = [];

  constructor(
    private scoutService: ScoutService
  )
  { }

  ngOnInit(): void {
    this.updateSymptoms();
  }

  updateSymptoms()
  {
    this.scoutService.getSymptoms().subscribe({
      next: 
      (symptoms) => {
        this.symptoms = symptoms;
        this.updateFilteredSymptoms();
      }, error: (error) =>
      {
        console.log(error);
      }
    }
    );
  }

  updateFilteredSymptoms(): void {
    this.filteredSymptoms = this.symptoms.filter(s => s.name.substring(0,this.symptomInput.length).toLowerCase() == this.symptomInput.toLowerCase());
  }

  symptomSelected(event: MatAutocompleteSelectedEvent )
  {
    const symptom: Symptom = event.option.value;

    if (symptom)
      this.symptomInput = symptom.name;
  }

  onSymptomInputChange(event: Event)
  {
    this.updateFilteredSymptoms();
  }
}
