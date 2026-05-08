import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat-service';
import { AdoptionsService } from '../../services/adoptions-service';
import { Cat } from '../../interfaces/cat';
import { AuthService } from '../../services/auth-service';
 
@Component({
  selector: 'app-cat-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './cat-detail.html',
  styleUrl: './cat-detail.css',
})
export class CatDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private catsService = inject(CatService);
  private adoptionsService = inject(AdoptionsService);
  authService = inject(AuthService);
 
  isShelter = computed(() => this.authService.user()?.role === 'refugio');
  catRequests = signal<any[]>([]);

  modalOpen = signal(false);
  modalMessage = signal('');
  modalError = signal(false);

  cat = signal<Cat | null>(null);
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.catsService.getById(id).subscribe(cat => {
      this.cat.set(cat);

      if (this.isShelter()) {
        this.adoptionsService.getAll().subscribe(all => {
          this.catRequests.set(all.filter(r => r.catId === cat._id));
        });
      }
    });
  }
 
  applyForAdoption() {
  const c = this.cat();
  if (!c) return;

  const user = this.authService.user();
  if (!user) {
    this.modalMessage.set('Debes iniciar sesión para solicitar la adopción');
    this.modalError.set(true);
    this.modalOpen.set(true);
    return;
  }

  this.adoptionsService.create({
      catId: c._id!,      
      catName: c.name,
      catPhoto: c.photo,
      applicantId: user._id!,
      applicantName: user.name,
      applicantEmail: user.email,
      status:         'pendiente',
    }).subscribe({             
    next: () => {
      this.modalMessage.set(`¡Solicitud enviada para adoptar a ${c.name}!`);
      this.modalError.set(false);
      this.modalOpen.set(true);
    },
    error: (err) => {
      const msg = err.error?.error || 'Error al enviar la solicitud';
      this.modalMessage.set(msg);
      this.modalError.set(true);
      this.modalOpen.set(true);
      console.error(err);
      }
    });
  }
}
