import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public weatherData: any;
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private apiKey: string = '47dd1cb6922846f4b6804218242406';
  private apiUrl: string = 'http://api.weatherapi.com/v1/current.json';

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getWeather();
  }

  getWeather() {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=Santiago, Chile&aqi=no`;
    this.http.get(url).subscribe(
      (data) => {
        this.weatherData = data;
        console.log(this.weatherData);
      },
      (error) => {
        console.error('Error al buscar los datos', error);
      }
    );
  }
}
