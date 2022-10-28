import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patients } from '../interfaces/Patients';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }
  getPatients(): Observable<any> {
    return this.servicio.get(`${this.servidor}/pacientes`);
  }
  get(pacientes: Patients[]) {
    return this.servicio.post<Patients>(`${this.servidor}`, pacientes);
  }


  create(pacientes: Patients) {
    return this.servicio.post<Patients>(`${this.servidor}/pacientes`, pacientes);
  }
  editar(pacientes: Patients) {
    return this.servicio.put<Patients>(`${this.servidor}/pacientes/`, pacientes.nmid);
  }

  update(pacientes: Patients) {
    return this.servicio.put<Patients>(this.servidor + "/pacientes", pacientes)
  }


  delete(nmid: number): Observable<any> {
    return this.servicio.delete(`${this.servidor}/pacientes/${nmid}`);
  }
}
