import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatFilters } from '../../services/cat-service';
export type CatBehavior = 'tranquilo' | 'activo' | 'cariñoso' | 'independiente';
@Component({
  selector: 'app-filters-component',
  imports: [CommonModule],
  templateUrl: './filters-component.html',
  styleUrl: './filters-component.css',
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<CatFilters>();

  ageCategories = signal<string[]>([]);
  selectedGender = signal<string | null>(null);
  selectedBehaviors = signal<CatBehavior[]>([]);
  //solo se puede seleccionar entre estas opciones
  ageOptions = [
    { value: 'cachorro', label: 'Cachorro', range: '0-1 año' },
    { value: 'adulto',   label: 'Adulto',   range: '1-7 años' },
    { value: 'senior',   label: 'Senior',   range: '+7 años' },
  ];
  
  behaviorOptions: CatBehavior[] = ['tranquilo', 'activo', 'cariñoso', 'independiente'];

  toggleAge(value: string) {
    const current = this.ageCategories();
    this.ageCategories.set(
      current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    );
    this.emit();
  }

  setGender(value: string) {
    this.selectedGender.set(this.selectedGender() === value ? null : value);
    this.emit();
  }

  toggleBehavior(value: CatBehavior) {
    const current = this.selectedBehaviors();
    this.selectedBehaviors.set(
      current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    );
    this.emit();
  }

  private emit() {
    this.filtersChanged.emit({
      ageCategories: this.ageCategories(),
      gender: this.selectedGender(),
      behaviors: this.selectedBehaviors(),
    });
  }
}
