import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataStorageService } from '../data-storage.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  // @ViewChild('pdfContent', {static : false}) el!: ElementRef;

  constructor(private getData: DataStorageService, private fB: FormBuilder) { }
  invoiceData: any
  itemForm: any
  recCompanyData: any
  recClientData: any
  recTempData: any
  tempId: any
  items = [
    {
      "ProductName": "",
      "ProductPrice": "",
      "Quantity": "",
      "Amount": ""
    }
  ]

  selectedCompany(event: any) {
    this.recCompanyData.forEach((element: any) => {
      if (element.businessName == event.target.value) {
        this.invoiceData.patchValue({
          "BusinessId": element.id,
          "BusinessName": element.businessName,
          "BusinessAddress": element.businessAddress,
          "BusinessCity": element.businessCity,
          "BusinessState": element.businessState,
          "BusinessPhoneNumber": element.businessPhoneNumber
        })
      }
    })
  }

  selectedClient(event: any) {
    this.recClientData.forEach((element: any) => {
      if (element.clientName == event.target.value) {
        this.invoiceData.patchValue({
          "ClientId": element.id,
          "ClientName": element.clientName,
          "ClientAddress": element.clientAddress,
          "ClientCity": element.clientCity,
          "ClientState": element.clientState,
          "ClientPhoneNumber": element.clientPhoneNumber
        })
      }
    })
  }

  onPost(recPostData: any) {
    recPostData.value.DateCreated = recPostData.value.DateCreated + "T" + this.getCurrentTime()
    let valueToMatch = recPostData.value.DateCreated
    let invoicePostData = {
      "BusinessId": recPostData.value.BusinessId,
      "ClientId": recPostData.value.ClientId,
      "DateCreated": recPostData.value.DateCreated,
      "DueDate": recPostData.value.DueDate,
      "Tax": recPostData.value.Tax,
    }

    this.getData.postInvoiceData(invoicePostData).subscribe((data) => {
      this.getData.getInvoiceData().subscribe((data) => {
        this.recTempData = data
        this.recTempData.forEach((element: any) => {
          if (element.dateCreated == valueToMatch) {
            this.tempId = element.id
          }
        })

        let feeData = {
          "InvoiceId": this.tempId,
          "FinalAmount": recPostData.value.FinalAmount
        }
        this.getData.postFeeData(feeData).subscribe((data) => {
        })

        let itemData: any
        for (let i = 0; i < this.items.length; i++) {
          if (i + 1 != this.items.length) {
            itemData = {
              "invoiceId": this.tempId,
              "productName": this.items[i + 1].ProductName,
              "productPrice": this.items[i + 1].ProductPrice,
              "quantity": this.items[i + 1].Quantity,
              "amount": this.items[i + 1].Amount
            }
            this.getData.postItemData(itemData).subscribe((data) => {
            })
          }
        }
      })
      window.location.reload()
    })
  }



  addToItemList(itemForm: any) {
    itemForm.value.Amount = itemForm.value.ProductPrice * itemForm.value.Quantity
    this.items.push(itemForm.value)
    this.itemForm.reset()
    let total = 0
    this.items.forEach((element: any) => {
      if (element.ProductName != "") {
        total = total + element.ProductPrice * element.Quantity
      }
    })
    this.invoiceData.patchValue({
      "FinalAmount": total
    })
  }

  updateFinalAmount(event: any) {
    let taxCalcValue = this.invoiceData.value.FinalAmount + ((this.invoiceData.value.FinalAmount * event.target.value) / 100)
    this.invoiceData.patchValue({
      "FinalAmount": taxCalcValue
    })

  }
  // makepdf(){
  //   let pdf = new jsPDF('p', 'px', 'a0');
  //   pdf.html(this.el.nativeElement,{
  //     callback:(pdf) =>{
  //       pdf.save("demo.pdf");
  //     }
  //   });
  // }

  getCurrentTime() {
    let today = new Date();
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
  }


  ngOnInit(): void {
    this.getData.getDataCompany().subscribe((data) => {
      this.recCompanyData = data;
    })

    this.getData.getDataClient().subscribe((data) => {
      this.recClientData = data;
    })


    this.invoiceData = this.fB.group({
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

      "FinalAmount": [0, [Validators.required]]
    });

    this.itemForm = this.fB.group({
      "ProductName": ["", [Validators.required]],
      "ProductPrice": [0, [Validators.required]],
      "Quantity": [0, [Validators.required]],
      "Amount": ["", [Validators.required]]
    })
  }



}


