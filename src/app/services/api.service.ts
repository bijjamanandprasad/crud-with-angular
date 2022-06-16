import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


let apiUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postStudent(urlPath:any,data:any){
    return this.http.post<any>(apiUrl+urlPath,data);
  }
  getStudent(urlPath:any){
    return this.http.get<any>(apiUrl+urlPath);
  }
  updateStudent(urlPath:any,data:any){
    return this.http.patch<any>(apiUrl+urlPath, data);
  }
  deleteStudent(urlPath:any){
    return this.http.delete<any>(apiUrl+urlPath);
  }

}
