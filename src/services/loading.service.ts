import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private requestCount = 0;  // Counter for active requests
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) { // Show loader only if it's the first request
      this.loadingSubject.next(true);
    }
  }

  hide(): void {
    if (this.requestCount === 0) return;

    this.requestCount--;  // Decrement the counter
    if (this.requestCount === 0) {  // Hide loader only when all requests are finished
      this.loadingSubject.next(false);
    }
  }

}
