import { Injectable, signal } from '@angular/core';
import { Cat } from '../interfaces/cat';

export type CatBehavior = 'tranquilo' | 'activo' | 'cariñoso' | 'independiente' | 'sociable';

export interface CatFilters {
  ageCategories: string[];
  gender: string | null;
  behaviors: CatBehavior[];
}

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private mockCats: Cat[] = [
    {
      id: '1', name: 'Milo', age: '2 años', ageCategory: 'adulto',
      gender: 'macho', behavior: ['tranquilo'], breed: 'Común Europeo',
      size: 'mediano', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW6oQ_DGrO82wbcAagwyLn-qI3xPhhXQGYwX6211WWeptINv-RJX5meys_CqrxC4i__xB63RXfbU0KndON-WnJRp3xY6d4GrcdHChkoa23dthpEUvKSgEaK-tT23Ad8DZ-T8T_d3DF-Upsrdvr7ovVHCtlyEKJmke5eoWIIsmFyEl7OBgPD41CAOIzIpXZJ21sAV9ZZdtejwEdT9Jf-RSZNOK2BL21-qhjDU_hYnJetUgOyQdUZkMEffMpjT2L0i_YUlGeOoZ5ucA',
      story: 'Un gato dulce y contemplativo que disfruta de las tardes soleadas cerca de la ventana.',
      isVaccinated: true, isSterilized: true, status: 'disponible', createdAt: new Date('2024-10-01'),
    },
    {
      id: '2', name: 'Luna', age: '6 meses', ageCategory: 'cachorro',
      gender: 'hembra', behavior: ['activo'], breed: 'Siamés mix',
      size: 'pequeño', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKFot5Z3E-YFzwXT54YrJcpHqS3E0E1cHLr26wOcSa-_Cg3Xtzd_M0gkPZlpEBSyFZsW2nrj7UTgVFFS0oZraeeJgX2rkNIJ1Umh0uQKiyJSSxczfhTteLZWRR495TUa_AWqSHeem-YcWUZJJPp5_jT3VkNzJ-FBgHX0KSA7wFRsiHArtBCuTkCubi4VTnl15937h7jsV0R-s9n17E8Gz1w9K1LG7WbYVbzumbdWMDPkTlwJfzEYv1hQM_v8VKcnqi3uUP8TawAA',
      story: 'Energía pura y curiosidad infinita. Luna necesita una familia que ame jugar tanto como ella.',
      isVaccinated: true, isSterilized: false, status: 'disponible', createdAt: new Date('2024-10-05'),
    },
    {
      id: '3', name: 'Simba', age: '5 años', ageCategory: 'adulto',
      gender: 'macho', behavior: ['independiente', 'tranquilo'], breed: 'Persa mix',
      size: 'mediano', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAERPYP4xqdK4Pawuo79nUr1QBdxCXxxvpXrW85Uv2Zol-EiJ-RmIOjjtGA8p-Q5fMm3OIO7fsazXIMabeSfJVBWiAoXW7jf9ZJa-GvJ2HIV2rHGBDql_lFey1plScMP_YKAAhW5mYluWmxN9ZsGGdgyLhT7LzP-GUGj_eGR4emw0OVWE_IyKfo3413VzAWZ78KKsBMX38ufwHLhVigBuzuv40vZFr6mF47FyYivWr1sRl1Mjh23D8k6Jgfkc2e7AUbfdhPKMc_Yq0',
      story: 'Majestuoso y calmado. Busca un hogar tranquilo donde pueda ser el rey del sofá.',
      isVaccinated: true, isSterilized: true, status: 'disponible', createdAt: new Date('2024-09-20'),
    },
    {
      id: '4', name: 'Salt & Pepper', age: '3 años', ageCategory: 'adulto',
      gender: 'macho', behavior: ['cariñoso'], breed: 'Común Europeo',
      size: 'mediano', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW75Sn2PUxbPum7eOmJ0O_PMnw57m90URSxiTmSM8SFeEOpC5kfrXG8aeqlhDd6nwEhEppAn_E860tHOUC6fRHtzR9F0NOkr0WOoSx5YbMuC9bcG_DgAUW-vEn9vJlp8ZbcH38Z95VZKOp1FQYeROJPuQWLfGaT-qGMBHyPn_--MUkwOO_yQSY2bMEZLvOiURzpcJD_nvZo_c-KfxzdW3PExkZiiHHGGl44aPg3I3kHe0NVQEXA-1-H3ek2NH-TxrPMEX8AcIu49w',
      story: 'Un vínculo inquebrantable. Estos dos hermanos buscan un hogar que los adopte juntos.',
      isVaccinated: true, isSterilized: true, status: 'disponible', createdAt: new Date('2024-10-10'),
    },
  ];

  
  getAll(filters?: CatFilters): Cat[] {
    let cats = [...this.mockCats];
    if (!filters) return cats;

    if (filters.ageCategories.length > 0) {
      cats = cats.filter(c => filters.ageCategories.includes(c.ageCategory));
    }
    if (filters.gender) {
      cats = cats.filter(c => c.gender === filters.gender);
    }
    if (filters.behaviors.length > 0) {
      cats = cats.filter(c => c.behavior.some(b => filters.behaviors.includes(b)));
    }
    return cats;
  }

  getById(id: string): Cat | undefined {
    return this.mockCats.find(c => c.id === id);
  }

  getFeatured(): Cat[] {
    return this.mockCats.filter(c => c.status === 'disponible').slice(0, 3);
  }

  add(data: Omit<Cat, 'id' | 'createdAt'>): Cat {
    const newCat: Cat = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    this.mockCats = [newCat, ...this.mockCats];
    return newCat;
  }
}
