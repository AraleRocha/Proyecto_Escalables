import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cat } from '../../interfaces/cat';

@Component({
  selector: 'app-cat-card-component',
  imports: [ RouterLink, CommonModule ],
  templateUrl: './cat-card-component.html',
  styleUrl: './cat-card-component.css',
})

export class CatCardComponent {
  @Input({ required: true }) cat!: Cat;
}
