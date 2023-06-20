import { Component, OnInit } from '@angular/core';
import { api } from '../api';
import { HttpClient } from '@angular/common/http';

const crypt= api.crypto;
@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {
  loading = true;
  crypto: any[]=[]; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(crypt).subscribe(
      (response) => {
        this.loading = false;
        this.crypto = response;
        console.log(this.crypto);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
