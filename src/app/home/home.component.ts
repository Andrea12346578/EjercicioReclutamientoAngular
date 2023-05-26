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

  constructor(
    private quoteService: QuoteService,
    private formBuilder: FormBuilder,
    private DBsERVICE: DataBaseService
  ) {}

  form = this.formBuilder.group({
    numero: [1],
    resultado: [''],
    color: [''],
  });
  ngOnInit() {}

  calculate() {
    let n = Number(this.form.value.numero),
      multiplo = 0;
    function comparar(a: any, b: any) {
      return Number(a) - Number(b);
    }
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

    if (multiplo == 0) {
    } else {
      this.form.controls['resultado'].setValue(
        '[' + [multiplo, Math.round(n / multiplo)].toString().split(',').sort(comparar).join(' y ') + ']'
      );
    }

    const transaccion = {
      multiplo: multiplo,
      resultado: this.form.value.resultado,
      solicitud: this.form.value.numero,
    };
    console.log('dataa -->', this.DBsERVICE.setTransaction(transaccion));
  }
}
