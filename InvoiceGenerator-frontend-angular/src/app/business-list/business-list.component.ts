import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  constructor(private getJson: DataStorageService, private fB: FormBuilder) { }

  myPutForm: any
  recData: any
  modalTitle: any
  modalId: any
  cartData: any

  fieldsForTable = [
    "Business Name",
    "Business Address",
    "Business City",
    "Business State",
    "Business Phone",
    "Edit"
  ]

  fields = [
    "Business Name",
    "Business Address",
    "Business City",
    "Business State",
    "Business Phone",
    "Edit"
  ]

  fieldsOrigin = [
    "businessName",
    "businessAddress",
    "businessCity",
    "businessState",
    "businessPhoneNumber"
  ]

  fieldsOriginPost = [
    "businessName",
    "businessAddress",
    "businessCity",
    "businessState",
    "businessPhoneNumber"
  ]

  formPutData: any = `{
    "businessName":"",
    "businessAddress":"",
    "businessCity":"",
    "businessState":"",
    "businessPhoneNumber":""
  }`

  forModal(id: any, item: any) {
    this.modalTitle = item.businessName
    this.modalId = item.id
    this.myPutForm.setValue({
      "businessName": item.businessName,
      "businessAddress": item.businessAddress,
      "businessCity": item.businessCity,
      "businessState": item.businessState,
      "businessPhoneNumber": item.businessPhoneNumber
    })
  }
  
  clearForm(){
    this.myPutForm.reset()
  }

  onPost(recPostData: any) {
    let data = recPostData.value
    this.getJson.postDataCompany(data).subscribe((data) => {
      window.location.reload()
    });
  }

  onPut(recDataPut: any) {
    let id = this.modalId
    let data = recDataPut.value
    data = { ...data, "id": this.modalId }
    this.getJson.putDataCompany(data, id).subscribe((data) => {
      window.location.reload()
    });
  }

  ngOnInit(): void {
    this.getJson.getDataCompany().subscribe((data) => {
      this.recData = data;
    });
    this.myPutForm = this.fB.group({
      "businessName": ["", [Validators.required]],
      "businessAddress": ["", [Validators.required]],
      "businessCity": [, [Validators.required]],
      "businessState": ["", [Validators.required]],
      "businessPhoneNumber": ["", [Validators.required]]
    });
  }
}
