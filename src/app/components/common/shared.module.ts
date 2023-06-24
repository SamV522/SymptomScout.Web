import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SymptomCardComponent as SymptomCardComponent } from './symptomcard/symptomcard.component';
import { DiagnosisCardComponent } from './diagnosiscard/diagnosiscard.component';

const modules = [
  CommonModule,
  MatFormFieldModule,
  MatListModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatCardModule,  
  FormsModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    SymptomCardComponent,
    DiagnosisCardComponent
  ],
  imports: modules,
  exports: [
    ...modules,
    SymptomCardComponent,
    DiagnosisCardComponent
  ]
})
export class SharedModule { }
