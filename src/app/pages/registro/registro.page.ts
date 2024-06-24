import { Component, OnInit } from '@angular/core';
import { Servicio1Service } from 'src/app/servicios/servicio1.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';  // para la confirmación de la password

  isComplete = false;
  focusedInput : string | null = null;

  constructor(private servicio1: Servicio1Service) { }

  ngOnInit() {
    this.servicio1.dbState().subscribe((isReady) => {
      if (isReady) {
        console.log('La base de datos esta ok');
      }
    });
  }

  setFocus(inputName: string | null) {
    this.focusedInput = inputName;
  }

  checkFormComplete(formulario: any) {
    this.isComplete = formulario.valid;
  }

  async onSubmit(formulario: any) {
    this.checkFormComplete(formulario);

    if (this.isComplete) {
      if (this.password === this.confirmPassword) {
        await this.servicio1.addUser(this.name, this.lastname, this.email, this.password);
        console.log("Formulario enviado");
      } else {
        console.log("Las contraseñas no coinciden");
      }
    } else {
      console.log("Formulario Incompleto");
    }
  }
}
