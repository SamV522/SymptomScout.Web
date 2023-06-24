import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Diagnosis, ScoutService } from 'src/app/services/scout.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss'],
  host: { 'style': 'display: flex; flex-direction: column; width:100%; height: 100%;'}
})
export class DiagnosisComponent implements OnInit {
  
  id$ = this.route.params.pipe(map((params) => params['id']));

  diagnosis$!: Observable<Diagnosis>;

  constructor (
    private scoutService: ScoutService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id$.subscribe((id) => 
      this.diagnosis$ = this.scoutService.getDiagnosis(id)
    );
  }
}
