import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio1Service } from 'src/app/servicios/servicio1.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private servicio1Service: Servicio1Service, private router: Router) { }

  ngOnInit() {
  }

  async onLogin() {
    const isAuthenticated = await this.servicio1Service.authenticateUser(this.email, this.password);
    if (isAuthenticated) {
      this.router.navigate(['/home']); // Cambia a /home
    } else {
      // Logica del toast en Servicio1Service
    }
  }
}