import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat-service';
import { CatCardComponent } from "../../components/cat-card-component/cat-card-component";
import { Cat } from '../../interfaces/cat';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, CatCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private catsService = inject(CatService);
  
  featuredCats = signal<Cat[]>([]);

  ngOnInit() {
    this.catsService.getFeatured().subscribe(cats => {
      this.featuredCats.set(cats.filter(c => c.status === 'disponible').slice(0, 3));
    });
  }
}
