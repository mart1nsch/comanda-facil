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
];
