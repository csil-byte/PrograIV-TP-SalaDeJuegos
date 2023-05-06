import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class getFotos {
  constructor(private http: HttpClient) {}

  traerFoto(buscar: string) {
    let input = buscar;
    const key = '23526716-6552667da117c4ee18df94961';
    var URL = 'https://pixabay.com/api/?key=' + key + '&q= ' + input;
    return this.http.get(URL);
  }
}
