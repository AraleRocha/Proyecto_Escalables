import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatService } from '../../services/cat-service';
import { Cat } from '../../interfaces/cat';

export type CatBehavior = 'tranquilo' | 'activo' | 'cariñoso' | 'independiente' | 'sociable';

@Component({
  selector: 'app-panel-gatos',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './panel-gatos.html',
  styleUrl: './panel-gatos.css',
})
export class PanelGatos {
  private catsService = inject(CatService);
  private fb = inject(FormBuilder);
 
  showForm = signal(false);
  isSubmitting = signal(false);
 
  get cats(): Cat[] {
    return this.catsService.getAll();
  }
 
 
  behaviorOptions: CatBehavior[] = ['tranquilo', 'activo', 'cariñoso', 'independiente', 'sociable'];
  selectedBehaviors = signal<CatBehavior[]>([]);
 
  form: FormGroup = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2)]],
    age:         ['', Validators.required],
    ageCategory: ['adulto', Validators.required],
    gender:      ['macho', Validators.required],
    breed:       ['', Validators.required],
    size:        ['mediano', Validators.required],
    story:       ['', [Validators.required, Validators.minLength(20)]],
    photoUrl:    ['', Validators.required],
    isVaccinated:  [false],
    isSterilized:  [false],
    isDewormed:    [false],
  });
 
  toggleBehavior(b: CatBehavior) {
    const curr = this.selectedBehaviors();
    this.selectedBehaviors.set(
      curr.includes(b) ? curr.filter(x => x !== b) : [...curr, b]
    );
  }
 
  async onSubmit() {
    if (this.form.invalid || this.selectedBehaviors().length === 0) return;
    this.isSubmitting.set(true);
 
    await new Promise(r => setTimeout(r, 800));
 
    const v = this.form.value;
    this.catsService.add({
      name:          v.name,
      age:           v.age,
      ageCategory:   v.ageCategory,
      gender:        v.gender,
      breed:         v.breed,
      size:          v.size,
      story:         v.story,
      photo:        v.photoUrl,
      behavior:      this.selectedBehaviors(),
      isVaccinated:  v.isVaccinated,
      isSterilized:  v.isSterilized,
      status:        'disponible',
    });
 
    this.form.reset({ ageCategory: 'adulto', gender: 'macho', size: 'mediano', breed: 'Común Europeo' });
    this.selectedBehaviors.set([]);
    this.isSubmitting.set(false);
    this.showForm.set(false);
  }
}
