import { Component, inject, signal, computed } from '@angular/core';
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
export class Catalog {
  private catsService = inject(CatService);

  sortOrder = signal<'recientes' | 'edad_asc' | 'edad_desc'>('recientes');

  private activeFilters = signal<CatFilters>({
    ageCategories: [],
    gender: null,
    behaviors: [],
  });

  cats = computed<Cat[]>(() => {
    const filtered = this.catsService.getAll(this.activeFilters());
    return this.sort(filtered, this.sortOrder());
  });

  onFiltersChanged(filters: CatFilters) {
    this.activeFilters.set(filters);
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
