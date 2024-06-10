import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  isComplete = false;
  focusedInput : string | null = null;

  constructor() { }

  ngOnInit() {
    // Intentionally empty
  }


  setFocus(inputName: string | null){
    this.focusedInput = inputName;
  }

checkFormComplete(formulario: any){
  this.isComplete = formulario.valid;

}

onSubmit(formulario: any){
 this.checkFormComplete(formulario);

 if(this.isComplete){
  console.log("Formulario enviado");
 }else{
  console.log("Formulario Incompleto");
 }
}

}
