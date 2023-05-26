import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {
  // Iniciamos el servicio 'AngularFireDatabase' de Angular Fire
  constructor(private db: AngularFireDatabase) {}
  // En nuestra función setTransaction() especificamos la colección de datos de Firebase Database Realtime que
  // queremos usar, la colección que usaremos se llama 'calculos'
  setTransaction(data: any) {
    var ref = this.db.list('calculos').push(data);
  }
}
