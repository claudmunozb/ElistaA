import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

/**
 * Servicio para manejar las bbdd relacionadas con usuarios
 */

@Injectable({
  providedIn: 'root'
})
export class Servicio1Service {
  private db!: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.createDB();
  }

  async createDB() {
    try {
      this.db = await this.sqlite.create({
        name: 'users.db',
        location: 'default'
      });
      await this.createTable();
      this.isDBReady.next(true);
    } catch (e) {
      this.presentToast('Error al iniciar la base de datos: ' + e);
    }
  }

  async createTable() {
    try {
      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          lastname TEXT,
          email TEXT,
          password TEXT
        )`, []);
      this.presentToast('Tabla creada ok.');
    } catch (e) {
      this.presentToast('Error al crear la tabla: ' + e);
    }
  }

  async addUser(name: string, lastname: string, email: string, password: string) {
    try {
      const res = await this.db.executeSql(`
        INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)`,
        [name, lastname, email, password]
      );
      this.presentToast('Usuario agregado exitosamentee.');
      return res;
    } catch (e) {
      this.presentToast('Error al agregar usuario: ' + e);
    }
  }

  // se agrega un meotodo para poder autentificar al usuario en la pantalla de login

async authenticateUser(email: string, password: string): Promise<boolean> {
  try {
    const res = await this.db.executeSql(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password]);
    if (res.rows.length > 0) {
      return true;
    } else {
      this.presentToast('Usuario o contraseña incorrectos.');
      return false;
    }
  } catch (e) {
    this.presentToast('Error al autenticar usuario: ' + e);
    return false;
  }
}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  // se agrega un meotodo para poder autentificar al usuario en la pantalla de login
  dbState() {
    return this.isDBReady.asObservable();
  }
}
