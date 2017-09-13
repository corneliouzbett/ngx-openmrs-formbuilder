import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import {Observable} from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import {Constants} from '../Services/constants';
import 'rxjs/add/operator/map';

@Injectable()
export class ConceptService {
  
 private data:any = {};
 private headers = new Headers();
 private baseUrl = '';

 constructor(private http:Http, private sessionStorageService:SessionStorageService){
     
    let credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    this.baseUrl = sessionStorageService.getItem(Constants.BASE_URL);
    this.headers.append("Authorization", "Basic " + credentials);
    this.headers.append("Content-Type", "application/json");
 }
 
 
 searchConcept(conceptID:string):Observable<any>{

    if(conceptID.length==36&&conceptID.indexOf(' ')==-1){ //searching with concept uuid
        return this.http.get(`${this.baseUrl}/ws/rest/v1/concept/${conceptID}?v=custom:(uuid,name,conceptClass,setMembers,answers)`, {headers:this.headers}).map(
            data => this.data = data.json()
        )
        .catch((error) => {alert(error.message);
        return error});
 }
    else{ //searching with concept display
        return this.http.get(`https://test2.ampath.or.ke:8443/amrs/ws/rest/v1/concept?q=${conceptID}&v=custom:(uuid,name,conceptClass,setMembers,answers)`,{headers:this.headers}).map(
            data => this.data = data.json()
        )
        .catch((error) => {alert(error.message);
            return error});;
    }
  
 }
}
