import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etudiant } from '../models/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http:HttpClient) { }
  apiUrl="http://localhost:5000/etudiants";

  fibdAll(){
  return this.http.get<Etudiant[]>(this.apiUrl)
  }
  delete(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
  persist(etudiant: any){
    return this.http.post<Etudiant>(this.apiUrl,etudiant);
  }

  licence(id: any,licence: any){
    return this.http.patch(`${this.apiUrl}/${id}`,{licence: !licence})
  }

  update(etudiant: Etudiant){
    return this.http.put(`${this.apiUrl}/${etudiant.id}`,etudiant)
  }


}
