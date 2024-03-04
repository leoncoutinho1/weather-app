import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherDataView } from './models/weatherDataView.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {
    
  }

  weatherData?: WeatherData
  weatherDataView?: WeatherDataView

  ngOnInit(): void {
    this.weatherService.getWeatherData('campos dos goytacazes')
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          if (this.weatherData) {
            this.weatherDataView = {
              name: this.weatherData?.name,
              temp: (this.weatherData?.main.temp - 32) * 5 / 9,
              min_temp: (this.weatherData?.main.temp_min - 32) * 5 / 9,
              max_temp: (this.weatherData?.main.temp_max - 32) * 5 / 9,
              humidity_percent: this.weatherData.main.humidity,
              wind_speed: this.weatherData.wind.speed
            }
          }
          console.log(response);
        }
      });
  }
}
