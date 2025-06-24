import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  // private apiUrl = 'http://localhost:3000/users';
  private apiUrl =`${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  register(signupRequest: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, signupRequest).pipe(
      map((response: any) => ({
        message: "User registered successfully",
        user: response 
      }))
    );
  }

}


