import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard'
import { CreateDiagnosisEntry, CreateDiagnosisRequest, ScoutService, Symptom } from '../../../services/scout.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creatediagnosis',
  templateUrl: './creatediagnosis.component.html',
  styleUrls: ['./creatediagnosis.component.css'],
  host: { style: 'max-width: 100%;'}
})
export class CreateDiagnosisComponent implements OnInit {

  loading = false;

  allExpanded = true;
  createDiagnosisRequests: CreateDiagnosisEntry[] = [];

  constructor(
    private scoutService: ScoutService,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.addDiagnosisRequest();
  }  

  addDiagnosisRequest()
  {
    const diagnosis: CreateDiagnosisEntry = {
      entryId: this.createDiagnosisRequests.length,
      name: '',
      description: '',
      symptoms: [],
      valid: false
    };
    this.createDiagnosisRequests.push(diagnosis);
  }

  removeLastDiagnosisRequest()
  {
    if (this.createDiagnosisRequests.length > 1)
      this.createDiagnosisRequests.pop();
  }

  updateDiagnosisRequest(id: number, update: CreateDiagnosisEntry) {
    this.createDiagnosisRequests[id].name = update.name;
    this.createDiagnosisRequests[id].description = update.description;
    this.createDiagnosisRequests[id].symptoms = update.symptoms;
    this.createDiagnosisRequests[id].valid = update.valid;
  }

  anyInvalidRequests(): boolean {
    return this.createDiagnosisRequests.some(req => !req.valid);
  }

  countValidRequests(): number {
    return this.createDiagnosisRequests.filter(req => req.valid).length;
  }
  
  scrollIntoView(element: HTMLElement)
  {
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  createDiagnoses() {
    let requests = this.createDiagnosisRequests.map(entry => {
      let request: CreateDiagnosisRequest = {
        name: entry.name,
        description: entry.description,
        symptoms: entry.symptoms
      }
      return request;
    })
    this.scoutService.createDiagnoses(requests).subscribe({
      next: () => {
        this.createDiagnosisRequests = [];
        this.addDiagnosisRequest();
        this.snackbar.open('Created Succesfully!')
      },
      error: () => {
        this.snackbar.open('Something went wrong! :(');
      }}
    )
  }

  copyDiagnosisRequests() {
    this.clipboard.copy(JSON.stringify(this.createDiagnosisRequests));
  }

  pasteDiagnosisRequests() {
    navigator.clipboard.readText().then((clip) => console.log(clip));
    //this.createDiagnosisRequests = JSON.parse(this.clipboard.)
  }
}
