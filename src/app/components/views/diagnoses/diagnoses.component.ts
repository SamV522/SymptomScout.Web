import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Diagnosis, ScoutService, Symptom } from '../../../services/scout.service';

@Component({
  selector: 'app-diagnoses',
  templateUrl: './diagnoses.component.html',
  styleUrls: ['./diagnoses.component.scss']
})
export class DiagnosesComponent {

  diagnosesInput: string = '';
  diagnoses: Diagnosis[] = [];
  filteredDiagnoses: Diagnosis[] = [];

  constructor(
    private scoutService: ScoutService
  )
  { }

  ngOnInit(): void {
    this.updateDiagnoses();
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
