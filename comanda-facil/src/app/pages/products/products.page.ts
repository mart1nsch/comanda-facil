import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ComandaService } from '../../services/comanda.service';
import { Products } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, CommonModule, FormsModule]
})
export class ProductsPage implements OnInit {
  products: Products[] = [];

  constructor(private router: Router, private comandaService: ComandaService) { }

  ionViewWillEnter() {
    this.getProducts();
  }

  ngOnInit() {
    //this.getProducts();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToNewProduct() {
    this.router.navigate(['/new-product']);
  }

  getProducts() {
    this.comandaService.getOrders('products').subscribe(data => {
      this.products = data;
    }, err => {
      console.error(err);
    });
  }

}
