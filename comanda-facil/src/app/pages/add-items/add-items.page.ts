import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ComandaService } from '../../services/comanda.service';
import { Products } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.page.html',
  styleUrls: ['./add-items.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, CommonModule, FormsModule]
})
export class AddItemsPage implements OnInit {
  comandaId: number = -1;
  products: Products[] = [];

  constructor(private router: Router, private comandaService: ComandaService, private route: ActivatedRoute) { }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.comandaId = params['id'];
    });
    this.getProducts();
  }

  ngOnInit() {
  }

  goToOrder() {
    this.router.navigate(['/order']);
  }

  getProducts() {
    this.comandaService.getOrders('products').subscribe(data => {
      this.products = data;
    }, err => {
      console.error(err);
    });
  }

  addItemOrder(id: number, vlrUnitario: number) {
    this.comandaService.insertProductInOrder('add-item', this.comandaId, id, vlrUnitario).subscribe(() => {
      this.router.navigate(['/order'], { queryParams: { ID: this.comandaId } });
    }, (err) => {
      alert('Erro ao adicionar produto na comanda: ' + err);
    })
  }

}
