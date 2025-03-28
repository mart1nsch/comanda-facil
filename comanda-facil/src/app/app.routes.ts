import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'new-order',
    loadComponent: () => import('./pages/new-order/new-order.page').then( m => m.NewOrderPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.page').then( m => m.OrdersPage)
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.page').then( m => m.ProductsPage)
  },
  {
    path: 'new-product',
    loadComponent: () => import('./pages/new-product/new-product.page').then( m => m.NewProductPage)
  },
  {
    path: 'order',
    loadComponent: () => import('./pages/order/order.page').then( m => m.OrderPage)
  },
  {
    path: 'payment-area',
    loadComponent: () => import('./pages/payment-area/payment-area.page').then( m => m.PaymentAreaPage)
  },
];
