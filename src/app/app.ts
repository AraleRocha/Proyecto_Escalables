import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer-component/footer-component";
import { NavbarComponent } from "./components/navbar-component/navbar-component";
import { Donations } from "./pages/donations/donations";
import { Volunteer } from "./pages/volunteer/volunteer";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { AdminPanel } from "./pages/admin-panel/admin-panel";
import { Catalog } from "./pages/catalog/catalog";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, Donations, Volunteer, Home, Login, AdminPanel, Catalog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Patitas_Conectadas');
}
