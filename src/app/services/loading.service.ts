import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingMap = new Map<Observable<any>, BehaviorSubject<boolean>>

  constructor() { }

  getLoadingSubject(key: Observable<any>): BehaviorSubject<boolean> {
    if (!this.loadingMap.has(key)) {
      this.loadingMap.set(key, new BehaviorSubject<boolean>(false));
    }

    return this.loadingMap.get(key)!;
  }
  
  show(key: Observable<any>) {
    this.getLoadingSubject(key).next(true);
  }

  hide(key: Observable<any>) {
    this.getLoadingSubject(key).next(false);
  }

  withLoadingTracking<T>(observable$: Observable<T>): Observable<T>{
    this.show(observable$);

    return observable$.pipe(
      finalize(() => {
        this.hide(observable$);
      }));
  }
}
