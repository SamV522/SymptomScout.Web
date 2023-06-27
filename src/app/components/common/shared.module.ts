import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SymptomCardComponent } from './symptomcard/symptomcard.component';
import { DiagnosisCardComponent } from './diagnosiscard/diagnosiscard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { TipComponent } from './tip/tip.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { SymptomPickerComponent } from './symptom-picker/symptom-picker.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
  MatButtonModule,
  MatSidenavModule,
  MatExpansionModule,
  MatStepperModule,
  ReactiveFormsModule,
  MatTooltipModule,
  MatRippleModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    SymptomCardComponent,
    DiagnosisCardComponent,
    TipComponent,
    SymptomPickerComponent
  ],
  imports: modules,
  exports: [
    ...modules,
    SymptomCardComponent,
    DiagnosisCardComponent,
    TipComponent,
    SymptomPickerComponent
  ]
})
export class SharedModule { }
