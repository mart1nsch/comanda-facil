import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ComandaService } from '../../services/comanda.service';
import { Items } from '../../models/items.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    CommonModule,
    FormsModule
  ]
})
export class OrderPage implements OnInit {
  items: Items[] = [];
  id: number = -1;
  comanda = null;
  mesa = null;
  valorTotal = null;

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController, private comandaService: ComandaService) { }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.id = params['ID'];
    });
    this.getOrder();
    this.getItems();
  }

  ngOnInit() {
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToAddItem() {
    this.router.navigate(['/add-items'], { queryParams: { id: this.id } });
  }

  getOrder() {
    this.comandaService.getOrders('order/' + this.id).subscribe(data => {
      this.comanda = data[0].COMANDA;
      this.mesa = data[0].MESA;
      this.valorTotal = data[0].VALOR_TOTAL;
    }, err => {
      console.error(err);
    });
  }

  getItems() {
    this.comandaService.getItems('order/items/' + this.id).subscribe(data => {
      this.items = data;
    }, err => {
      console.error(err);
    });
  }

  async showMessageDeleteItem() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Excluir Comanda?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.deleteItem();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteItem() {
    this.comandaService.deleteOrder('orders/delete', this.id).subscribe(() => {
      alert('Comanda excluída com sucesso!');
      this.router.navigate(['/orders']);
    }, (err) => {
      alert('Erro ao deletar comanda: ' + err);
    });
  }

  goToPaymentArea() {
    this.router.navigate(['/payment-area'], { queryParams: { id: this.id, valorTotal: this.valorTotal } });
  }

}
