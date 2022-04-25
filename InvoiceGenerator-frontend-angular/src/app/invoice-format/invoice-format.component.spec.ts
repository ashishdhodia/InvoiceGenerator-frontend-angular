import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFormatComponent } from './invoice-format.component';

describe('InvoiceFormatComponent', () => {
  let component: InvoiceFormatComponent;
  let fixture: ComponentFixture<InvoiceFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
