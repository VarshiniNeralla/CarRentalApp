import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../admin/services/car.model';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000/cars'; // JSON Server URL

  constructor(private http: HttpClient) {}

  // Fetch all cars
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  // Add a new car
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  // Fetch a single car by ID
  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }



  updateCar(id: string, carData: Car | FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, carData);
}


  // Delete a car
  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  searchCars(filters: { [key: string]: any }): Observable<Car[]> {
    let params = new HttpParams();
    
    // Append only the selected filters to the query params
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });
  
    return this.http.get<Car[]>(this.apiUrl, { params });
  }
  
}