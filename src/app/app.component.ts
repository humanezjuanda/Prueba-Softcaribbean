import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'semmillero';
  constructor(private Loginaut: LoginService) { } public pacientes(): boolean {
    return this.Loginaut.habilitado()
  }
}
