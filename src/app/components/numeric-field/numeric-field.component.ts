import { Component, OnInit } from '@angular/core';
import { NumericFieldService } from '../../services/numeric-field.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-numeric-field',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, top: '-5px' }),
        animate('100ms', style({ opacity: 1, top: 0 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0, top: '-5px' })),
      ]),
    ]),
  ],
  templateUrl: './numeric-field.component.html',
  styleUrls: ['./numeric-field.component.scss'],
})
export class NumericFieldComponent implements OnInit {
  randomNumber: number | null = null;

  constructor(private numericFieldService: NumericFieldService) {}

  ngOnInit(): void {
    this.numericFieldService.getRandomNumber(1, 10).subscribe((num) => {
      this.randomNumber = num;
    });
  }
}
