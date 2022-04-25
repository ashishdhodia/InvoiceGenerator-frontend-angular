import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(private getJson: DataStorageService, private fB: FormBuilder) { }

  myPutForm: any
  recData: any
  modalTitle: any
  modalId: any
  cartData: any

  fieldsForTable = [
    "Client Name",
    "Client Address",
    "Client City",
    "Client State",
    "Client Phone",
    "Edit"
  ]

  fields = [
    "Client Name",
    "Client Address",
    "Client City",
    "Client State",
    "Client Phone",
    "Edit"
  ]

  fieldsOrigin = [
    "clientName",
    "clientAddress",
    "clientCity",
    "clientState",
    "clientPhoneNumber"
  ]

  fieldsOriginPost = [
    "clientName",
    "clientAddress",
    "clientCity",
    "clientState",
    "clientPhoneNumber"
  ]

  formPutData: any = `{
    "clientName":"",
    "clientAddress":"",
    "clientCity":"",
    "clientState":"",
    "clientPhoneNumber":""
  }`

  forModal(id: any, item: any) {
    this.modalTitle = item.clientName
    this.modalId = item.id
    this.myPutForm.setValue({
      "clientName": item.clientName,
      "clientAddress": item.clientAddress,
      "clientCity": item.clientCity,
      "clientState": item.clientState,
      "clientPhoneNumber": item.clientPhoneNumber
    })
  }

  clearForm() {
    this.myPutForm.reset()
  }

  onPost(recPostData: any) {
    let data = recPostData.value    
    this.getJson.postDataClient(data).subscribe((data) => {
      window.location.reload()
    });
  }

  onPut(recDataPut: any) {
    let id = this.modalId
    let data = recDataPut.value
    data = { ...data, "id": this.modalId }
    this.getJson.putDataClient(data, id).subscribe((data) => {
      window.location.reload()
    });
  }

  ngOnInit(): void {
    this.getJson.getDataClient().subscribe((data) => {
      this.recData = data;
    });
    this.myPutForm = this.fB.group({
      "clientName": ["", [Validators.required]],
      "clientAddress": ["", [Validators.required]],
      "clientCity": ["", [Validators.required]],
      "clientState": ["", [Validators.required]],
      "clientPhoneNumber": [0, [Validators.required]]
    });
  }
}
