import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DalleService {

  private http = inject(HttpClient);

  constructor() { }

  generateImage(prompt: string) {
    return this.http.post<{
      created: string;
      data: Array<{
        url: string
      }>
    }>('https://api.openai.com/v1/images/generations', {
      n: 1,
      size: '1024x1024',
      prompt,
    }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${environment.OPEN_AI_KEY}`
      }
    });
  }
}
