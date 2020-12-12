import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NumericFieldService {
  private readonly apiHost = 'https://www.random.org/integers';

  constructor(private http: HttpClient) {}

  getRandomNumber(min: number, max: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiHost}/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
    );
  }
}
