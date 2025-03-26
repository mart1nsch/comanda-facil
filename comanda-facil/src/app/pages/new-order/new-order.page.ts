import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput  } from '@ionic/angular/standalone';
import { ComandaService } from '../../services/comanda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
  standalone: true,
  imports: [IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule, FormsModule]
})
export class NewOrderPage implements OnInit {
  mesa!: number;
  comanda!: number;

  constructor(private router: Router, private comandaService: ComandaService) { }

  ngOnInit() {
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  createOrder() {
    if (!this.comanda) {
      alert('Comanda deve ser informada!');
      return;
    }
    this.comandaService.newOrder(this.mesa, this.comanda).subscribe(() => {
      alert('Comanda criada com sucesso!');
      this.router.navigate(['/orders']);
    }, (err) => {
      alert('Erro ao criar comanda: ' + err);
    })
  }

}
