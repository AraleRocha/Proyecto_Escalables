import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat-service';
import { CatCardComponent } from "../../components/cat-card-component/cat-card-component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, CatCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private catsService = inject(CatService);
  featuredCats = this.catsService.getFeatured();
}
