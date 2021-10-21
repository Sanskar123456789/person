import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
//api = "http://localhost:3000/person";
api ="https://person12.herokuapp.com/person";
// production one ^
constructor(private http : HttpClient) { }

postperson(notes:Person):Observable<any> {
 return this.http.post(`${this.api}`,notes)
}

getperson():Observable<any>{
  
 return this.http.get<any>(`${this.api}`);
}

updateperson(data:Person):Observable<any>{
 return this.http.put<any>(`${this.api}/${data._id}`,data);
}

deleteperson(id: string):Observable<any>{
 return this.http.delete<any>(`${this.api}/${id}`);
}

findperson(id: string):Observable<Person>{
  return this.http.get<Person>(`${this.api}/${id}`);
}
}
