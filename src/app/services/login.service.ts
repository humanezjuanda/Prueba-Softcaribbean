
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private ingresar: boolean = false;
  constructor() { }
  public pacientes(obj: any): boolean {
    this.ingresar = obj.usuario == 'Juan' && obj.password == 'softcaribeean'
    return this.ingresar
  }
  public habilitado() {
    return this.ingresar
  }
}
