import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'ng-config-service';
import { Observable, Subject, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoutService {
  private baseUrl!: string | undefined;

  private symptoms: Symptom[] = [];
  private symptomsSubject = new Subject<Symptom[]>();
  public onSymptomsUpdated$ = this.symptomsSubject.asObservable();

  private diagnoses: Diagnosis[] = [];
  private diagnosesSubject = new Subject<Diagnosis[]>();
  public onDiagnosesUpdated$ = this.diagnosesSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.baseUrl = this.configService.get('baseUrl');
  }

  cacheSymptoms(symptoms: Symptom[]) {
    symptoms.forEach(symptom => {
      if (!this.symptoms.includes(symptom))
      {
        this.symptoms = this.symptoms.concat(symptom);
        this.symptomsSubject.next(this.symptoms);
      }
    });
  }

  flushSymptoms() {
    this.symptoms = [];
    this.symptomsSubject.next(this.symptoms);
  }

  getSymptoms(): Observable<Symptom[]> {
    if (this.symptoms.length > 0) return of(this.symptoms);

    return this.httpClient.get<Symptom[]>(`${this.baseUrl}/symptoms`).pipe(
      map((data) => {
        this.cacheSymptoms(data);
        return data;
      })
    );
  }

  getSymptom(id: number): Observable<Symptom> {
    return this.httpClient.get<Symptom>(`${this.baseUrl}/symptoms/${id}`);
  }

  createSymptom(symptom: CreateSymptomRequest[]) {
    return this.httpClient.post<Symptom[]>(`${this.baseUrl}/symptoms/`, symptom).pipe(
      (map((data: Symptom[]) => {
        this.cacheSymptoms(data.concat(this.symptoms));
        return data;
      }))
    );
  }

  createSymptoms(symptoms: CreateSymptomRequest[]) {
    return this.httpClient.post<Symptom[]>(`${this.baseUrl}/symptoms/bulk/`, symptoms).pipe(
      (map((data: Symptom[]) => {
        this.cacheSymptoms(data.concat(this.symptoms));
        return data;
      }))
    );
  }

  cacheDiagnoses(diagnoses: Diagnosis[]) {
    diagnoses.forEach(diagnosis => {
      if (!this.diagnoses.includes(diagnosis))
      {
        this.diagnoses = this.diagnoses.concat(diagnosis);
        this.diagnosesSubject.next(this.diagnoses);
      }
    });
  }

  flushDiagnoses() {
    this.diagnoses = []
    this.diagnosesSubject.next(this.diagnoses);
  }

  getDiagnoses(): Observable<Diagnosis[]> {
    if (this.diagnoses.length > 0) return of(this.diagnoses);

    return this.httpClient.get<Diagnosis[]>(`${this.baseUrl}/diagnoses`).pipe(
      (map((data) => {
        this.cacheDiagnoses(data);
        return data;
      }))
    );
  }

  getDiagnosis(id: number): Observable<Diagnosis> {
    return this.httpClient.get<Diagnosis>(`${this.baseUrl}/diagnoses/${id}`);
  }

  createDiagnosis(diagnosis: CreateDiagnosisRequest) {
    return this.httpClient.post(`${this.baseUrl}/diagnosis/`, diagnosis);
  }

  createDiagnoses(diagnoses: CreateDiagnosisRequest[]) {
    return this.httpClient.post<Diagnosis[]>(`${this.baseUrl}/diagnoses/bulk/`, diagnoses).pipe(
      (map((data: Diagnosis[]) => {
        this.cacheDiagnoses(data.concat(this.diagnoses));
        return data;
      }))
    );
  }

  searchSymptoms(search: string): Observable<Symptom> {
    return this.httpClient.get<Symptom>(
      `${this.baseUrl}/search/symptoms/${search}`,
      {}
    );
  }

  symptomMatch(symptoms: number[]): Observable<Diagnosis[]> {
    return this.httpClient.post<Diagnosis[]>(
      `${this.baseUrl}/search/symptoms/match`,
      symptoms
    );
  }
}

export class CreateDiagnosisRequest {
  name!: string;
  description!: string;
  symptoms!: Symptom[];
}

export class CreateDiagnosisEntry {
  entryId!: number;
  name!: string;
  description!: string;
  symptoms!: Symptom[];
  valid!: boolean;
}

export class CreateSymptomRequest {
  name!: string;
  description!: string;
}

export class CreateSymptomEntry {
  entryId!: number;
  name!: string;
  description!: string;
  valid!: boolean;
}

export class Symptom {
  symptomId!: number;
  name!: string;
  description!: string;
  diagnoses?: Diagnosis[];
}

export class Diagnosis {
  diagnosisId!: number;
  name!: string;
  description!: string;
  symptoms!: Symptom[];
}
