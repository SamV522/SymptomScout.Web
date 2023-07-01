import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject, takeUntil } from 'rxjs';
import { Diagnosis, ScoutService, Symptom } from 'src/app/services/scout.service';

@Component({
  selector: 'app-symptom-match',
  templateUrl: './symptom-match.component.html',
  styleUrls: ['./symptom-match.component.scss'],
  host: { 'style': 'display: flex; flex-direction: column; width:100%; height: 100%;'}
})
export class SymptomMatchComponent implements AfterViewInit {
  unsubscribe = new Subject<void>();

  filteredSymptoms: Symptom[] = [];
  symptoms: Symptom[] = [];
  symptomInput: string = '';
  diagnoses: Diagnosis[] = [];

  symptomsToSearch: Symptom[] = [];

  constructor(
    private scoutService: ScoutService
  )
  { }
  ngAfterViewInit(): void {
    this.updateSymptoms();
    this.scoutService.onSymptomsUpdated$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(symptoms => {
      this.symptoms = symptoms;
    })
  }

  updateSymptoms()
  {
    this.scoutService.getSymptoms().subscribe({
      next: 
      (symptoms) => {
        this.symptoms = symptoms;
      }, error: (error) =>
      {
        console.log(error);
      }
    }
    );
  }

  updateFilteredSymptoms(): void {
    if (this.symptomInput.length < 3)
      this.filteredSymptoms = [];
    else
      this.filteredSymptoms = this.symptoms.filter(s => s.name.toLowerCase().includes(this.symptomInput.toLowerCase()));
      
    this.updateDiagnoses();
  }

  addSymptomByInput(): void {
    let symptom = this.filteredSymptoms.find(s => s.name.toLowerCase().includes(this.symptomInput.toLowerCase()));

    if (!symptom)
      return;

    this.toggleSymptom(symptom);
  }

  updateDiagnoses(): void{
    if (this.symptomsToSearch.length < 1)
      this.diagnoses = [];
    else
      this.scoutService.symptomMatch(this.symptomsToSearch.map(symptom => symptom.symptomId)).subscribe(
        {
          next: (diagnoses) => {
            this.diagnoses = diagnoses;
          }, error: (error) => {
            this.diagnoses = [];
          }
        }
      );
  }

  removeSymptom(symptom: Symptom) {
    this.symptomsToSearch.splice(this.symptomsToSearch.indexOf(symptom), 1);
    this.updateDiagnoses();
  }

  symptomSelected(event: MatAutocompleteSelectedEvent )
  {
    const symptom: Symptom = event.option.value;

    if (symptom)
      this.toggleSymptom(symptom);
      
    event.option.deselect();
  }

  toggleSymptom(symptom: Symptom | undefined)
  {
    if (!symptom)
      return;

    if (this.symptomsToSearch.includes(symptom))
      this.removeSymptom(symptom);
    else
      this.symptomsToSearch.push(symptom);

    this.symptomInput = '';
    this.updateFilteredSymptoms();
  }

  onSymptomInputChange(event: Event)
  {
    if (this.symptomInput.length < 3)
    {
      this.filteredSymptoms = [];
      return;
    } else {
      this.updateFilteredSymptoms();
    }
  }
  
}
