import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentAreaPage } from './payment-area.page';

describe('PaymentAreaPage', () => {
  let component: PaymentAreaPage;
  let fixture: ComponentFixture<PaymentAreaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
