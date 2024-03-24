import { Component, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-req-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-req-base.component.html'
})

export class HttpReqBaseComponent {

  private http = inject(HttpClient);
  requests: Subscription[] = [];
  message$ = new BehaviorSubject<string | null>(null);

  cancelAllRequests() {
    if (!this.requests) {
      this.message$.next('No request found!');
      return;
    }
    this.requests.forEach(s => s.unsubscribe());
    this.requests = [];
    this.message$.next('All requests were canceled');
  }

  getData(path: string) {
    const url = `http://localhost:3000/${path}`;
    console.log('http.get', url);
    const request = this.http.get<{ message: string }>(url)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          console.error('ERR', errorResponse);
          this.message$.next(errorResponse.message);
          return EMPTY;
        })
      ).subscribe((response) => {
        console.log(response.message);
        this.message$.next(response.message);
      });
    this.requests.push(request);
  }
}
