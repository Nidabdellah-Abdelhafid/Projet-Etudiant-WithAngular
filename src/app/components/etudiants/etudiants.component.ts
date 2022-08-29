import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {

  showForm=false;
  editForm=false;
  myEtudiant:Etudiant={
    nom:'',
    prenom:'',
    licence:false
  }
  etudiants: Etudiant[]= [];


  constructor(private etudiantService:EtudiantService ) { }

  ngOnInit(): void {
    this.getEtudiants();

  }

  getEtudiants(){
    this.etudiantService.fibdAll()
        .subscribe(etudiants=>this.etudiants=etudiants)
  }
  deleteEtudiant(id: number | undefined){
    this.etudiantService.delete(id)
    .subscribe(()=>{
      this.etudiants=this.etudiants.filter(etudiant=>etudiant.id!=id)
    })
  }
  persistEtudiant(){
    this.etudiantService.persist(this.myEtudiant)
        .subscribe((etudiant)=>{
          this.etudiants=[etudiant, ...this.etudiants];
          this.resetEtudiant();
          this.showForm=false;
        })
  }
  resetEtudiant(){
    this.myEtudiant={
      nom:'',
      prenom:'',
      licence:false
    }
  }
   toggelLicence(id: any,licence: boolean){
    this.etudiantService.licence(id,licence)
        .subscribe(()=>{
          licence=!licence
        })
   }

   editEtudiant(etudiant: Etudiant){
    this.myEtudiant=etudiant;
    this.editForm=true;
    this.showForm=true;
   }

   updateEtudiant(){
    this.etudiantService.update(this.myEtudiant)
      .subscribe(etudiant=>{
        this.resetEtudiant();
        this.editForm=false;
        this.showForm=false;
      })
   }

}
