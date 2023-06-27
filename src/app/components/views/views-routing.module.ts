import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymptomMatchComponent } from './symptom-match/symptom-match.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { DiagnosesComponent } from './diagnoses/diagnoses.component';
import { SymptomComponent } from './symptom/symptom.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { CreateDiagnosisComponent } from './creatediagnosis/creatediagnosis.component';
import { CreateSymptomComponent } from './createsymptom/createsymptom.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/symptom/match'
  },
  {
    path: 'symptom/match',
    component: SymptomMatchComponent
  },
  {
    path: 'symptom/:id',
    component: SymptomComponent
  },
  {
    path: 'symptoms',
    children: [
      {
        path:'',
        component: SymptomsComponent,
      },
      {
        path: "create",
        component: CreateSymptomComponent
      },
      {
        path: ":id",
        component: SymptomComponent
      }
    ]
  },
  {
    path: 'diagnoses',
    children: [
      {
        path: '',
        component: DiagnosesComponent,
      },
      {
        path: "create",
        component: CreateDiagnosisComponent
      },
      {
        path: ":id",
        component: DiagnosisComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
