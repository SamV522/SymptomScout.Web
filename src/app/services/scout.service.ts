import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'ng-config-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoutService {

  private baseUrl!: string | undefined;
  
  constructor(private httpClient: HttpClient, private configService: ConfigService) { 
    this.baseUrl = this.configService.get('baseUrl');
  }

  getSymptoms(): Observable<Symptom[]> {
    return this.httpClient.get<Symptom[]>(`${this.baseUrl}/symptoms`);
  }

  getDiagnoses(): Observable<Diagnosis[]> {
    return this.httpClient.get<Diagnosis[]>(`${this.baseUrl}/diagnoses`);
  }

  searchSymptoms(search: string): Observable<Symptom> {
    return this.httpClient.get<Symptom>(`${this.baseUrl}/search/symptoms/${search}`, {});
  }

  symptomMatch(symptoms: number[]): Observable<Diagnosis[]>{
    return this.httpClient.post<Diagnosis[]>(`${this.baseUrl}/search/symptoms/match`, symptoms);
  }
}

export class Symptom {
  symptomId!: number;
  name!: string;
  description!: string;
}

export class Diagnosis{
  diagnosisId!: number;
  name!: string;
  description!: string;
  symptoms!: Symptom[];
}