import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard'
import { CreateSymptomEntry, CreateSymptomRequest, ScoutService, Symptom } from '../../../services/scout.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createsymptom',
  templateUrl: './createsymptom.component.html',
  styleUrls: ['./createsymptom.component.css'],
  host: { style: 'max-width: 100%;'}
})
export class CreateSymptomComponent implements OnInit {

  loading = false;

  allExpanded = true;
  createSymptomRequests: CreateSymptomEntry[] = [];
  symptoms$!: Observable<Symptom[]>

  constructor(
    private scoutService: ScoutService,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.addSymptomRequest();
    this.symptoms$ = this.scoutService.getSymptoms();
  }  

  addSymptomRequest()
  {
    const symptom: CreateSymptomEntry = {
      entryId: this.createSymptomRequests.length,
      name: '',
      description: '',
      valid: false
    };
    this.createSymptomRequests.push(symptom);
  }

  removeLastSymptomRequest()
  {
    if (this.createSymptomRequests.length > 1)
      this.createSymptomRequests.pop();
  }

  updateSymptomRequest(id: number, update: CreateSymptomEntry) {
    this.createSymptomRequests[id].name = update.name;
    this.createSymptomRequests[id].description = update.description;
    this.createSymptomRequests[id].valid = update.valid;
  }

  anyInvalidRequests(): boolean {
    return this.createSymptomRequests.some(req => !req.valid);
  }

  countValidRequests(): number {
    return this.createSymptomRequests.filter(req => req.valid).length;
  }
  
  scrollIntoView(element: HTMLElement)
  {
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  createSymptoms() {
    let requests = this.createSymptomRequests.map(entry => {
      let request: CreateSymptomRequest = {
        name: entry.name,
        description: entry.description,
      }
      return request;
    });
    
    this.scoutService.createSymptoms(requests).subscribe({
      next: () => {
        this.createSymptomRequests = [];
        this.addSymptomRequest();
        this.snackbar.open('Created Succesfully!')
      },
      error: () => {
        this.snackbar.open('Something went wrong! :(');
      }}
    )
  }

  copySymptomRequests() {
    this.clipboard.copy(JSON.stringify(this.createSymptomRequests));
  }

  pasteSymptomRequests() {
    navigator.clipboard.readText().then((clip) => console.log(clip));
    //this.createDiagnosisRequests = JSON.parse(this.clipboard.)
  }
}
