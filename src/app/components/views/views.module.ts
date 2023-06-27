import { NgModule } from '@angular/core';
import { ViewsRoutingModule } from './views-routing.module';
import { SharedModule } from '../common/shared.module';
import { SymptomMatchComponent } from './symptom-match/symptom-match.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { DiagnosesComponent } from './diagnoses/diagnoses.component';
import { SymptomComponent } from './symptom/symptom.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { CreateDiagnosisComponent } from './creatediagnosis/creatediagnosis.component';
import { CreateDiagnosisCardComponent } from './creatediagnosis/creatediagnosiscard/creatediagnosiscard.component';
import { CreateSymptomComponent } from './createsymptom/createsymptom.component';
import { CreateSymptomCardComponent } from './createsymptom/createsymptomcard/createsymptomcard.component';


@NgModule({
  declarations: [
    SymptomMatchComponent,
    SymptomsComponent,
    DiagnosesComponent,
    SymptomComponent,
    DiagnosisComponent,
    CreateDiagnosisComponent,
    CreateDiagnosisCardComponent,
    CreateSymptomComponent,
    CreateSymptomCardComponent,
  ],
  imports: [
    SharedModule,
    ViewsRoutingModule
  ],
  exports: [
    SharedModule
  ]
})
export class ViewsModule { }
