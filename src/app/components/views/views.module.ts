import { NgModule } from '@angular/core';
import { ViewsRoutingModule } from './views-routing.module';
import { SharedModule } from '../common/shared.module';
import { SymptomMatchComponent } from './symptom-match/symptom-match.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { DiagnosesComponent } from './diagnoses/diagnoses.component';


@NgModule({
  declarations: [
    SymptomMatchComponent,
    SymptomsComponent,
    DiagnosesComponent
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
