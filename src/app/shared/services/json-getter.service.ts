import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const defaultJSONPath = '';
@Injectable({
  providedIn: 'root'
})
export class JsonGetterService {

  constructor(private http: HttpClient) { }

  getResource(jsonPath: string) {
    return this.http.get<{ constantes: string[]; variables: string[] }>(jsonPath);
  }
}
