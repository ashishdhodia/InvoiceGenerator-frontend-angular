import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private ht: HttpClient) { }

  getDataCompany() { return this.ht.get("https://localhost:7297/api/Businesses") }
  postDataCompany(data: any) { return this.ht.post("https://localhost:7297/api/Businesses", data) }
  putDataCompany(data: any, id: any) { return this.ht.put(`https://localhost:7297/api/Businesses/${id}`, data) }

  getDataClient() { return this.ht.get("https://localhost:7297/api/Clients") }
  postDataClient(data: any) { return this.ht.post("https://localhost:7297/api/Clients", data) }
  putDataClient(data: any, id: any) { return this.ht.put(`https://localhost:7297/api/Clients/${id}`, data) }

  getInvoiceData() {return this.ht.get("https://localhost:7297/api/invoices")}
  postInvoiceData(data: any) {return this.ht.post("https://localhost:7297/api/invoices", data)}

  getFeeData() {return this.ht.get("https://localhost:7297/api/fees")}
  postFeeData(data: any) {return this.ht.post("https://localhost:7297/api/fees", data)}

  getItemData() {return this.ht.get("https://localhost:7297/api/ItemLists")}
  postItemData(data: any) {return this.ht.post("https://localhost:7297/api/ItemLists", data)}

  getAuthJWT(data: any) {return this.ht.post("https://localhost:7297/api/users/authenticate", data);}

}
