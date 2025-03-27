import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput  } from '@ionic/angular/standalone';
import { ComandaService } from '../../services/comanda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
  standalone: true,
  imports: [IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule, FormsModule]
})
export class NewProductPage implements OnInit {
  descricao!: string;
  vlrUnitario!: number;

  constructor(private router: Router, private comandaService: ComandaService) { }

  ngOnInit() {
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  createProduct() {
    if (!this.descricao) {
      alert('Descrição deve ser informada!');
      return;
    }
    this.comandaService.newProduct('products', this.descricao, this.vlrUnitario).subscribe(() => {
      alert('Produto criado com sucesso!');
      this.router.navigate(['/products']);
    }, (err) => {
      alert('Erro ao criar produto: ' + err);
    })
  }

}
