import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataStorageService } from '../data-storage.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-invoice-format',
  templateUrl: './invoice-format.component.html',
  styleUrls: ['./invoice-format.component.css']
})
export class InvoiceFormatComponent implements OnInit {
  @ViewChild('PDF', { static: false }) el!: ElementRef;

  constructor(private getData: DataStorageService, private fB: FormBuilder) { }
  recInvoiceData: any
  recFeesData: any
  recItemListData: any
  recCompanyData: any
  recClientData: any
  currentId: any
  pdfData: any
  items:any = []

  makePDF() {
    let pdf = new jsPDF('l', 'pt', 'a3');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("demo.pdf");
      }
    })
  }

  changeView(id: any) {
    this.items = []
    this.pdfData.patchValue({
      "FinalAmountWithoutTax": 0
    })  
    this.currentId = id
    this.recInvoiceData.forEach((element: any) => {
      if (element.id == id) {
        this.pdfData.patchValue({
          "InvoiceId": element.id,
          "BusinessId": element.businessId,
          "ClientId": element.clientId,
          "DateCreated": element.dateCreated,
          "DueDate": element.dueDate,
          "Tax": element.tax
        })

        this.recCompanyData.forEach((elementCompany: any) => {
          if (elementCompany.id == element.businessId) {
            this.pdfData.patchValue({
              "BusinessName": elementCompany.businessName,
              "BusinessAddress": elementCompany.businessAddress,
              "BusinessCity": elementCompany.businessCity,
              "BusinessState": elementCompany.businessState,
              "BusinessPhoneNumber": elementCompany.businessPhoneNumber
            })            
          }
        })

        this.recClientData.forEach((elementClient: any) => {
          if (elementClient.id == element.clientId) {
            this.pdfData.patchValue({
              "ClientName": elementClient.clientName,
              "ClientAddress": elementClient.clientAddress,
              "ClientCity": elementClient.clientCity,
              "ClientState": elementClient.clientState,
              "ClientPhoneNumber": elementClient.clientPhoneNumber
            })            
          }
        })

        this.recFeesData.forEach((elementFee: any) => {
          if (elementFee.invoiceId == id) {
            this.pdfData.patchValue({
              "FinalAmount": elementFee.finalAmount
            })            
          }
        })

        this.recItemListData.forEach((elementItem: any) => {
          if (elementItem.invoiceId == id) {
            this.items.push(elementItem)  
            let temp =  elementItem.amount
            temp = this.pdfData.value.FinalAmountWithoutTax + temp
            this.pdfData.patchValue({
              "FinalAmountWithoutTax": temp
            })       
          }
        })

      }
    })
    // console.log(this.pdfData.value)
    // console.log(this.items);
    

  }

  ngOnInit(): void {
    this.getData.getInvoiceData().subscribe((data) => {
      this.recInvoiceData = data
    })

    this.getData.getFeeData().subscribe((data) => {
      this.recFeesData = data
    })

    this.getData.getItemData().subscribe((data) => {
      this.recItemListData = data
    })

    this.getData.getDataCompany().subscribe((data) => {
      this.recCompanyData = data
    })

    this.getData.getDataClient().subscribe((data) => {
      this.recClientData = data
    })

    this.pdfData = this.fB.group({
      "InvoiceId": [0, [Validators.required]],

      "BusinessName": ["", [Validators.required]],
      "BusinessAddress": [, [Validators.required]],
      "BusinessCity": ["", [Validators.required]],
      "BusinessState": ["", [Validators.required]],
      "BusinessPhoneNumber": ["", [Validators.required]],

      "ClientName": ["", [Validators.required]],
      "ClientAddress": ["", [Validators.required]],
      "ClientCity": ["", [Validators.required]],
      "ClientState": ["", [Validators.required]],
      "ClientPhoneNumber": ["", [Validators.required]],

      "BusinessId": [0, [Validators.required]],
      "ClientId": [0, [Validators.required]],
      "DateCreated": ["", [Validators.required]],
      "DueDate": ["", [Validators.required]],
      "Tax": [0, [Validators.required]],

      "FinalAmount": [0, [Validators.required]],
      "FinalAmountWithoutTax": [0, [Validators.required]]
    });
  }


}
