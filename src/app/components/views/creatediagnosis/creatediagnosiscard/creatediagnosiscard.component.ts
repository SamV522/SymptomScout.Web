import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CreateDiagnosisEntry, ScoutService, Symptom } from 'src/app/services/scout.service';

@Component({
  selector: 'app-creatediagnosiscard',
  templateUrl: './creatediagnosiscard.component.html',
  styleUrls: ['./creatediagnosiscard.component.css'],
  host: { style: 'display:flex; max-width: 100%;'}
})
export class CreateDiagnosisCardComponent implements OnInit {
  @ViewChild(MatRipple) ripple!: MatRipple;
  
  @Input() expanded: boolean = false;
  @Input() id!: number;
  @Input() symptoms!: Symptom[];

  @Output() requestUpdatedEvent = new EventEmitter<CreateDiagnosisEntry>();
  @Output() afterExpanded = new EventEmitter<HTMLElement>();

  private unsubscribe = new Subject<void>();

  filteredSymptoms!: Symptom[]
  selectedSymptoms: Symptom[] = [];

  unfinished = (): boolean => {
    return this.diagnosisForm.dirty || !this.diagnosisForm.valid;
  };

  diagnosisForm!: FormGroup;
  descriptionPreviewLength = 45;

  constructor(
    public scoutService: ScoutService
  ) {}

  ngOnInit(): void {
    this.diagnosisForm = new FormGroup({
      nameInput: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descriptionInput: new FormControl('')
      });

    this.scoutService.onSymptomsUpdated$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(symptoms => {
      this.symptoms = symptoms
    }
    )
  }

  onAfterExpand(element: HTMLElement)
  {
    this.afterExpanded.emit(element);
    this.ripple.launch(0,0);
  }

  getDescriptionSample(): string {
    let sample = this.diagnosisForm.value.descriptionInput.substring(0,this.descriptionPreviewLength).trimEnd();

    return sample.trim();
  }

  submitUpdate() {
    const request: CreateDiagnosisEntry =  {
      entryId: this.id,
      name: this.diagnosisForm.value.nameInput,
      description: this.diagnosisForm.value.descriptionInput,
      symptoms: this.selectedSymptoms,
      valid: true
    }

    this.requestUpdatedEvent.emit(request);

    this.diagnosisForm.markAsPristine();

    this.expanded = false;
  }

  toggleSymptom(symptom: Symptom)
  {
    if (!symptom)
      return;

    if (this.selectedSymptoms.includes(symptom))
      this.removeSymptom(symptom);
    else
      this.selectedSymptoms.push(symptom);

    return;
  }

  removeSymptom(symptom: Symptom) {
    this.selectedSymptoms.splice(this.selectedSymptoms.indexOf(symptom), 1);
  }
}
