import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private fB: FormBuilder) { }
  recPostData: any
  myForm:any;
  itemList = [{
    "ProductName": "apple",
    "ProductPrice": 10,
    "Quantity": 1,
    "Amount": 100
  }]

  onPost(recPostData: any){
    console.log(recPostData.value);
    // recPostData.value.Items = this.itemList;
    // console.log(recPostData.value.Items);
    // this.itemList.push({
    //   "ProductName": "apple",
    //   "ProductPrice": 10,
    //   "Quantity": 1,
    //   "Amount": 100
    // })
    // recPostData.value.Items = this.itemList;
    // console.log(recPostData.value.Items);
  }


  ngOnInit(): void {
    this.recPostData = this.fB.group({
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

      "BusinessId": ["", [Validators.required]],
      "ClientId": ["", [Validators.required]],
      "DateCreated": ["", [Validators.required]],
      "DueDate": ["", [Validators.required]],
      "Tax": ["", [Validators.required]],

      "Items": [{}],
      "FinalAmount": ["", [Validators.required]]
    });
  }

}
