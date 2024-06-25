import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Ingreso', url: '/pages/login', icon: 'key-outline' },
    { title: 'Registro', url: '/pages/registro', icon: 'list-outline'},
    { title: 'Agregar foto', url: '/pages/photo', icon: 'camera-outline'},
    { title: 'Acerca de', url: '/pages/acercade', icon: 'desktop-outline' },
    { title: 'Opciones', url: '/pages/opciones', icon: 'settings-outline' },
  ];
  public labels = ['Casa', 'Trabajo', 'Ocio', 'Miscelaneo'];
  constructor() {}
}
