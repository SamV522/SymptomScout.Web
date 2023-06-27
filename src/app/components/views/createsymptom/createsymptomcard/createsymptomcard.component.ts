import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { Observable } from 'rxjs';
import { CreateSymptomEntry, Symptom } from 'src/app/services/scout.service';

@Component({
  selector: 'app-createsymptomcard',
  templateUrl: './createsymptomcard.component.html',
  styleUrls: ['./createsymptomcard.component.css']
})
export class CreateSymptomCardComponent implements OnInit {
  @ViewChild(MatRipple) ripple!: MatRipple;
  
  @Input() expanded: boolean = false;
  @Input() id!: number;
  @Input() symptoms$!: Observable<Symptom[]>;

  @Output() requestUpdatedEvent = new EventEmitter<CreateSymptomEntry>();
  @Output() afterExpanded = new EventEmitter<HTMLElement>();

  filteredSymptoms!: Symptom[]
  selectedSymptoms: Symptom[] = [];

  unfinished = (): boolean => {
    return this.symptomForm.dirty || !this.symptomForm.valid;
  };

  symptomForm!: FormGroup;
  descriptionPreviewLength = 45;

  ngOnInit(): void {
    this.symptomForm = new FormGroup({
      nameInput: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descriptionInput: new FormControl('')
      });

      this.symptomForm.statusChanges.subscribe(
        (status) => {
          status
        }
      )
  }

  onAfterExpand(element: HTMLElement)
  {
    this.afterExpanded.emit(element);
    this.ripple.launch(0,0);
  }

  getDescriptionSample(): string {
    let sample = this.symptomForm.value.descriptionInput.substring(0,this.descriptionPreviewLength).trimEnd();

    return sample.trim();
  }

  submitUpdate() {
    const request: CreateSymptomEntry =  {
      entryId: this.id,
      name: this.symptomForm.value.nameInput,
      description: this.symptomForm.value.descriptionInput,
      valid: true
    }

    this.requestUpdatedEvent.emit(request);

    this.symptomForm.markAsPristine();

    this.expanded = false;
  }
}
