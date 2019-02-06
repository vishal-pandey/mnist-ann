import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:8000/"

  predict(arr){
  	return this.http.get(this.apiUrl+"predict?img="+arr);
  }
}
