import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  public myForm!: FormGroup;


  constructor(private fb: FormBuilder, private Loginaut: LoginService) { }
  login() {

  }
  ngOnInit(): void {
    this.myForm = this.crear();
  }
  private crear(): FormGroup {
    return this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    });
  }
  public submit() {

    if (!this.Loginaut.pacientes(this.myForm.value)) {
      alert("Usuario o Contraseña invalida")
    }
    console.log(this.myForm.value)
  }
  public get f(): any {
    return this.myForm.controls;
  }
}
