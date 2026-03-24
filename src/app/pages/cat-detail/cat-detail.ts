import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat-service';
import { AdoptionsService } from '../../services/adoptions-service';
import { Cat } from '../../interfaces/cat';
 
@Component({
  selector: 'app-cat-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './cat-detail.html',
  styleUrl: './cat-detail.css',
})
export class CatDetail implements OnInit {
  private route            = inject(ActivatedRoute);
  private catsService      = inject(CatService);
  private adoptionsService = inject(AdoptionsService);
 
  cat        = signal<Cat | null>(null);
 
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const found = this.catsService.getById(id);
    if (found) this.cat.set(found);
  }
 
  applyForAdoption() {
    const c = this.cat();
    if (!c) return;
    this.adoptionsService.create({
      catId:          c.id,
      catName:        c.name,
      catPhoto:       c.photo,
      applicantId:    'usuario',
      applicantName:  'Usuario',
      applicantEmail: '',
      status:         'pendiente',
    });
    alert(`¡Solicitud enviada para adoptar a ${c.name}!`);
  }
}
