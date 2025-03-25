import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ComandaService } from '../services/comanda.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle],
})
export class HomePage {
  orders = [{ COMANDA: 1, MESA: 3 }];

  constructor(private router: Router, private comandaService: ComandaService) {}

  goToNewOrder() {
    this.router.navigate(['/new-order']);
  }

  ngOnInit() {
    console.log('entraaaa');
    this.getOrders();
  }

  getOrders() {
    this.comandaService.getOrders().subscribe(data => {
      this.orders = data;
      console.log(data);
    }, err => {
      console.error(err);
    });
  }
}
