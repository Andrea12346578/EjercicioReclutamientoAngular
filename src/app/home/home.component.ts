import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private quoteService: QuoteService, private formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    numero: [1],
    resultado: [''],
    color: [''],
  });
  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  calculate() {
    let n = Number(this.form.value.numero);
    if (n % 3 == 0) {
      this.form.controls['color'].setValue('#70AD47');
      this.form.controls['resultado'].setValue(
        '[' + [3, Math.round(n / 3)].toString().split(',').sort().reverse().join(' y ') + ']'
      );
    } else if (n % 5 == 0) {
      this.form.controls['color'].setValue('#D71702');
      this.form.controls['resultado'].setValue(
        '[' + [5, Math.round(n / 5)].toString().split(',').sort().reverse().join(' y ') + ']'
      );
    } else if (n % 7 == 0) {
      this.form.controls['color'].setValue('#7079C4');
      this.form.controls['resultado'].setValue(
        '[' + [7, Math.round(n / 7)].toString().split(',').sort().reverse().join(' y ') + ']'
      );
    } else {
      this.form.controls['color'].setValue('#000');
      this.form.controls['resultado'].setValue('No se encontraron resultados');
    }
  }
}
