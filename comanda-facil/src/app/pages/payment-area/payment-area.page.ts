import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ComandaService } from '../../services/comanda.service';

@Component({
  selector: 'app-payment-area',
  templateUrl: './payment-area.page.html',
  styleUrls: ['./payment-area.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, CommonModule, FormsModule]
})
export class PaymentAreaPage implements OnInit {
  valorTotal: number = 0;
  receivedValue!: number;
  change: number = 0;
  id: number = -1;

  constructor(private router: Router, private route: ActivatedRoute, private comandaService: ComandaService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.valorTotal = params['valorTotal'];
      this.id = params['id'];
    });
  }

  cancelPayment() {
    this.router.navigate(['/orders']);
  }

  calculateChange() {
    if (this.receivedValue === null) {
      this.change = 0;
      return;
    }
    this.change = this.receivedValue - this.valorTotal;
  }

  confirmPayment() {
    this.comandaService.finishOrder('orders/finish', this.id).subscribe(() => {
      alert('Comanda finalizada com sucesso!');
      this.router.navigate(['/orders']);
    }, (err) => {
      alert('Erro ao finalizar comanda: ' + err);
    })
  }

}
