import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ComandaService } from '../../services/comanda.service';
import { Orders } from '../../models/orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {
  orders: Orders[] = [];

  constructor(private router: Router, private comandaService: ComandaService) { }

  ionViewWillEnter() {
    this.getOrders();
  }

  ngOnInit() {
    //this.getOrders();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToNewOrder() {
    this.router.navigate(['/new-order']);
  }

  goToOrder(order: Object) {
    this.router.navigate(['/order'], { queryParams: order });
  }

  getOrders() {
    this.comandaService.getOrders('orders').subscribe(data => {
      this.orders = data;
    }, err => {
      console.error(err);
    });
  }

}
