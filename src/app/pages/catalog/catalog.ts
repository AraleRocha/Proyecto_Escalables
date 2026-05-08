import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from "../../components/filters-component/filters-component";
import { CatFilters, CatService } from '../../services/cat-service';
import { CatCardComponent } from '../../components/cat-card-component/cat-card-component';
import { Cat } from '../../interfaces/cat';
@Component({
  selector: 'app-catalog',
  imports: [FiltersComponent, CatCardComponent, CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  private catsService = inject(CatService);

  sortOrder = signal<'recientes' | 'edad_asc' | 'edad_desc'>('recientes');

  private activeFilters = signal<CatFilters>({
    ageCategories: [],
    gender: null,
    behaviors: [],
  });

  allCats = signal<Cat[]>([]);
cats    = signal<Cat[]>([]);

ngOnInit() {
  this.catsService.getAll().subscribe(data => {
    const sinAdoptados = data.filter(c => c.status !== 'adoptado');
    this.allCats.set(sinAdoptados);
    this.cats.set(sinAdoptados);
  });
}

onFiltersChanged(filters: CatFilters) {
  this.activeFilters.set(filters);
  let filtered = this.allCats();
  if (filters.ageCategories.length > 0)
    filtered = filtered.filter(c => filters.ageCategories.includes(c.ageCategory));
  if (filters.gender)
    filtered = filtered.filter(c => c.gender === filters.gender);
  if (filters.behaviors.length > 0)
    filtered = filtered.filter(c => c.behavior.some(b => filters.behaviors.includes(b)));
  this.cats.set(this.sort(filtered, this.sortOrder()));
}

  onSortChanged(event: Event) {
    const val = (event.target as HTMLSelectElement).value as any;
    this.sortOrder.set(val);
  }

  private sort(cats: Cat[], order: string): Cat[] {
    if (order === 'recientes') return cats;
    return [...cats].sort((a, b) => {
      const parse = (s: string) => parseInt(s) || 0;
      const diff = parse(a.age) - parse(b.age);
      return order === 'edad_asc' ? diff : -diff;
    });
  }
}
