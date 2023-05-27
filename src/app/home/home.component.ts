import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { QuoteService } from './quote.service';
import { DataBaseService } from '@app/services/data-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private DBsERVICE: DataBaseService) {}

  /* Se crea un form builder para guardar el numero ingresado por el usuario,
   el resultado de la operación  y el color asignado dependiendo del resultado*/

  form = this.formBuilder.group({
    numero: [1],
    resultado: [''],
    color: [''],
  });

  ngOnInit() {}

  /* Funion donde se calculan los multiplos de 3,5 o 7 */
  calculate() {
    /* Se declaran las variables para referenciar al numero ingresado por el usuario (n) y
    otra para guardar el multiplo obtenido (multiplo)  */
    let n = Number(this.form.value.numero),
      multiplo = 0;

    /* La función comparar ayuda a ordenar mejor un arreglo  */
    function comparar(a: any, b: any) {
      return Number(a) - Number(b);
    }

    /* Conjunto de condicionales donde se obtiene el modulo del numero ingresado por el usuario y se
    verifica que sea 0 para obtener el multiplo correspondiente */

    if (n % 3 == 0) {
      this.form.controls['color'].setValue('#70AD47');
      multiplo = 3;
    } else if (n % 5 == 0) {
      this.form.controls['color'].setValue('#D71702');
      multiplo = 5;
    } else if (n % 7 == 0) {
      this.form.controls['color'].setValue('#7079C4');
      multiplo = 7;
    } else {
      this.form.controls['color'].setValue('#000');
      multiplo = 0;
    }

    /* Dependiendo del multiplo se asigna un valor al formControl resultado, si es 0 no se encontró multiplo y si es 3,5 o 7 se asigna el formato [3 y 15] */

    if (multiplo == 0) {
      this.form.controls['resultado'].setValue('notFound');
    } else {
      this.form.controls['resultado'].setValue(
        '[' + [multiplo, Math.round(n / multiplo)].toString().split(',').sort(comparar).join(' y ') + ']'
      );
    }

    /* Se genera el json apartir del formulario reactivo */
    const transaccion = {
      multiplo: multiplo,
      resultado: this.form.value.resultado,
      solicitud: this.form.value.numero,
    };

    /* Se envía el json al servicio  DataBaseService para ser guardado un nuevo registro en la BD */
    this.DBsERVICE.setTransaction(transaccion);
  }
}
