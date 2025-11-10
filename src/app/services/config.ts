import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {

  apiAllBaseUrl: string;
  apiInfoUrl : string;
  apiDataUrl: string;

  constructor() {
    const env = (globalThis as any).__env || {};
    this.apiAllBaseUrl = env.apiAllBaseUrl || 'http://localhost:3000/all/pokemon';
    this.apiInfoUrl  = env.apiInfoUrl  || 'http://localhost:3000/info/pokemon';
    this.apiDataUrl = env.apiDataUrl || 'http://localhost:3000/pokemon/';
  }
  
}