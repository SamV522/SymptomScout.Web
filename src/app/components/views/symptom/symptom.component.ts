import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ScoutService, Symptom } from 'src/app/services/scout.service';

@Component({
  selector: 'app-symptom',
  templateUrl: './symptom.component.html',
  styleUrls: ['./symptom.component.scss'],
  host: { 'style': 'display: flex; flex-direction: column; width:100%; height: 100%;'}
})
export class SymptomComponent implements OnInit {
  
  id$ = this.route.params.pipe(map((params) => params['id']));

  symptom$!: Observable<Symptom>;

  constructor (
    private scoutService: ScoutService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.id$.subscribe((id) => 
      this.symptom$ = this.scoutService.getSymptom(id)
    );
  }
}
