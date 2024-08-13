import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';

const base_url = BASE_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(private http:HttpClient) { }

  getTipoDocumento(){
    const endpoint = `${base_url}/tipo-documento`;
    return this.http.get(endpoint);
  }
  searchTipoDocumento (term:any){
    const endpoint = `${base_url}/tipo-documento/search/${term}`;
    return this.http.get(endpoint);
  }

  saveTipoDocumento(body:any){
    const endpoint = `${base_url}/tipo-documento`;
    return this.http.post(endpoint,body);
  }
  updateTipoDocumento(body:any,id:any){
    const endpoint = `${base_url}/tipo-documento/${id}`;
    return this.http.put(endpoint,body);
  }

  deleteTipoDocumento(id:any){
    const endpoint = `${base_url}/tipo-documento/${id}`;
    return this.http.delete(endpoint);
  }
}
