import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

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


