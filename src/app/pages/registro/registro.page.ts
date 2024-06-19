import { Component, OnInit } from '@angular/core';

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
  confirmPassword: string = '';  // para la confirmación de la contraseña

  isComplete = false;
  focusedInput : string | null = null;

  constructor() { }

  ngOnInit() {}

  setFocus(inputName: string | null) {
    this.focusedInput = inputName;
  }

  checkFormComplete(formulario: any) {
    this.isComplete = formulario.valid;
  }

  onSubmit(formulario: any) {
    this.checkFormComplete(formulario);

    if (this.isComplete) {
      console.log("Formulario enviado");
      // Aquí puedes añadir lógica adicional para manejar el envío del formulario
    } else {
      console.log("Formulario Incompleto");
    }
  }
}
