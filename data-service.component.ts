import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-data-service',
  templateUrl: './data-service.component.html',
  styleUrls: ['./data-service.component.css']
})
export class DataServiceComponent implements OnInit {


  @Input() weather_content: any;
  @Input() city: any;
  @Input() state: any;
  @Input() seal_link:any;
  @Input() displaycurrent:any;
  @Input() clickFavourite:any;


  public modal_data:any;
  public displayhourly:any;
  public displayweekly:any;
  public modal_label:any;
  public icon_link:any;
  public twitterTemp:any;
  public twitterSummary:any;
  public pop_up:any;
  favouriteStorage = window.localStorage;

  public allChartColors = [
    { backgroundColor: '#76CCF0' },
  ];

  public weeklyChartColors = [
    { backgroundColor: '#76CCF0' },
  ];

 
  public allChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  public allChartType = 'bar';
  public allChartLegend = true;
  public allChartData = null;
  public allChartOptions = null;

  public weeklyChartLabels = null;
  public weeklyChartType = 'horizontalBar';
  public weeklyChartLegend = true;
  public weeklyChartData = null;
  public weeklyUnixLabels = []

  public weeklyChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    yAxes: [{
    ticks: {
        beginAtZero: true,
     },
     stacked: true
    }],
    xAxes: [{
    ticks: {
        beginAtZero: true,
     }
    }],
    scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Days'
      },
     gridLines: {
                drawOnChartArea: false
            }
    }], 
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Temperature in Fahrenheit'
      },
     gridLines: {
                drawOnChartArea: false
            }
    }]
   },
   plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end'
    }
   }
  };

  public tempChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    yAxes: [{
    ticks: {
        beginAtZero: true,
     }
    }],
    scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Fahrenheit'
      }
    }], 
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Time difference from current hour'
      }
    }]
   }
  };

    public pressureChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    yAxes: [{
    ticks: {
        beginAtZero: true,
     }
    }],
    scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Millibars'
      }
    }], 
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Time difference from current hour'
      }
    }]
   }
  };

    public humidityChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    yAxes: [{
    ticks: {
        beginAtZero: true,
     }
    }],
    scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: '% Humidity'
      }
    }], 
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Time difference from current hour'
      }
    }]
   }
  };

    public visibilityChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    yAxes: [{
    ticks: {
        beginAtZero: true,
     }
    }],
    scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Miles (Maximum 10)'
      }
    }], 
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Time difference from current hour'
      }
    }]
   }
  };

    public ozoneChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    yAxes: [{
    ticks: {
        beginAtZero: true,
     }
    }],
    scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Dobson Units'
      }
    }], 
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Time difference from current hour'
      }
    }]
   }
  };

    public windspeedChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    yAxes: [{
    ticks: {
        beginAtZero: true,
     }
    }],
    scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Miles per hour'
      }
    }], 
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Time difference from current hour'
      }
    }]
   }
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
 
  }

  public displayTempChart(e)
  {
    var jsonData = []
    this.displayhourly = true
    this.displaycurrent = false
    this.displayweekly = false
    this.clickFavourite = false
    console.log(e)
    if(e == "Temperature" || typeof e === "undefined" )
    {
        console.log(this.weather_content.hourly.data.length)
        for (var i = 0; i < this.weather_content.hourly.data.length; i++) {
            console.log(this.weather_content.hourly.data[i].temperature)
            jsonData.push(this.weather_content.hourly.data[i].temperature)
        }
        console.log(jsonData) 

        this.allChartData = [
          {data: jsonData, label: 'Temperature'},
      ];
       
      this.allChartOptions = this.tempChartOptions;
    }
    else if(e == "Pressure")
    {
        console.log(this.weather_content.hourly.data.length)
        for (var i = 0; i < this.weather_content.hourly.data.length; i++) {
            console.log(this.weather_content.hourly.data[i].pressure)
            jsonData.push(this.weather_content.hourly.data[i].pressure)
        }
        console.log(jsonData)

        this.allChartData = [
          {data: jsonData, label: 'Pressure'},
      ];
      this.allChartOptions = this.pressureChartOptions;
    }

    else if(e == "Humidity")
    {
        console.log(this.weather_content.hourly.data.length)
        for (var i = 0; i < this.weather_content.hourly.data.length; i++) {
            console.log(this.weather_content.hourly.data[i].humidity)
            jsonData.push(this.weather_content.hourly.data[i].humidity*100)
        }
        console.log(jsonData)

        this.allChartData = [
          {data: jsonData, label: 'Humidity'},
      ];
      this.allChartOptions = this.humidityChartOptions;
    }

    else if(e == "Ozone")
    {
        console.log(this.weather_content.hourly.data.length)
        for (var i = 0; i < this.weather_content.hourly.data.length; i++) {
            console.log(this.weather_content.hourly.data[i].ozone)
            jsonData.push(this.weather_content.hourly.data[i].ozone)
        }
        console.log(jsonData)

        this.allChartData = [
          {data: jsonData, label: 'Ozone'},
      ];
      this.allChartOptions = this.ozoneChartOptions;
    }

    else if(e == "Visibility")
    {

      console.log(this.weather_content.hourly.data.length)
        for (var i = 0; i < this.weather_content.hourly.data.length; i++) {
            console.log(this.weather_content.hourly.data[i].visibility)
            jsonData.push(this.weather_content.hourly.data[i].visibility)
        }
        console.log(jsonData)
        this.allChartData = [
          {data: jsonData, label: 'Visibility'},
      ];
      this.allChartOptions = this.visibilityChartOptions;
    }
     else if(e == "Wind Speed")
    {
        console.log(this.weather_content.hourly.data.length)
        for (var i = 0; i < this.weather_content.hourly.data.length; i++) {
            console.log(this.weather_content.hourly.data[i].windSpeed)
            jsonData.push(this.weather_content.hourly.data[i].windSpeed)
        }
        console.log(jsonData)

        this.allChartData = [
          {data: jsonData, label: 'Wind Speed'},
      ];
      this.allChartOptions = this.windspeedChartOptions;
    } 
  }

  public displayWeeklyChart()
  {
     this.displayweekly = true
     this.displaycurrent = false
     this.displayhourly = false
     this.clickFavourite = false
      var jsonData = []
      var weekly_labels = []
      var appendWeekly = false
      if ( this.weeklyUnixLabels.length == 0)
        appendWeekly = true
      console.log(this.weather_content.daily.data.length)
        for (var i = 0; i < this.weather_content.daily.data.length; i++) {
           console.log(typeof(this.weather_content.daily.data[i].time))
            if(appendWeekly) {
            this.weeklyUnixLabels.push(this.weather_content.daily.data[i].time)
            }
            var date = new Date(this.weather_content.daily.data[i].time*1000)
            var month = date.getMonth()+1
            var date_value = date.getDate()+"/"+month+"/"+date.getFullYear()
            console.log(date_value);
            weekly_labels.push(date_value)
            console.log([Math.round(this.weather_content.daily.data[i].temperatureLow),Math.round(this.weather_content.daily.data[i].temperatureHigh)])
            jsonData.push([Math.round(this.weather_content.daily.data[i].temperatureLow),Math.round(this.weather_content.daily.data[i].temperatureHigh)])
        }
        console.log(jsonData)
        this.weeklyChartLabels = weekly_labels
        this.weeklyChartData = [
          {data: jsonData, label: 'Day wise temperature range', 
          showInLegend: true,
           borderColor: "#000000",
           click: function(e){
             console.log(e)
            alert(  e.dataSeries.type+ ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " }" );
          },  
        }
       ];
        console.log(weekly_labels)
  }

  public chartClicked(e)
  { 
    
    console.log(this.weeklyUnixLabels)
    if (e.active.length > 0) {
    const chart = e.active[0]._chart;
    const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        const clickedElementIndex = activePoints[0]._index;
        this.modal_label = chart.data.labels[clickedElementIndex];
        console.log(this.weeklyUnixLabels[clickedElementIndex])
        this.modalEvent(this.weeklyUnixLabels[clickedElementIndex], this.weather_content.latitude, this.weather_content.longitude)
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(clickedElementIndex, this.modal_label, value)
   }
  }
  this.checkWeatherImage();
 }

 public checkWeatherImage()
 {
   var icon = this.modal_data.currently.icon

   if( icon == "clear-day" || icon =="clear-night")
    this.icon_link ='https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-12-512.png'
   else if(icon == "rain")
   this.icon_link='https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-04-512.png'
   else if(icon == "snow")
      this.icon_link='https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-19-512.png'
   else if(icon == "sleet")
       this.icon_link='https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-07-512.png'
   else if(icon == "wind")
       this.icon_link='https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png'
   else if(icon == "fog")
       this.icon_link='https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png'
   else if( icon == "cloudy")
       this.icon_link='https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-01-512.png'
   else if(icon == "partly-cloudy-day" || icon == "partly-cloudy-night" )
       this.icon_link='https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-02-512.png'
 }

 public modalEvent(time, lat, lon)
 {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});

    const params = new HttpParams()
          .set('time', time)
          .set('lat', lat)
          .set('lon', lon)

    this.http.get("http://localhost:3000/displaymodal", {
          headers: headers,
          params: params
        }).subscribe((data: any[]) => {
          console.log(data)
          this.modal_data = data
          console.log("Response received from Modal data");
   })
 }

 public roundFunction(s)
 {
   return Math.round(s);
 }

 public roundTwoDecimals(i)
 {
   if(i==0)
    return i;
   else
    return i.toFixed(2);
 }

 public displayCurrent()
 {
    this.displaycurrent = true
    this.displayhourly = false
    this.displayweekly = false
    this.clickFavourite = false
 }

 public displayFavourites()
 {

 }

 public deleteFavorites()
 {

 }
 public displayTwitter()
 {  
  this.twitterTemp = this.weather_content.currently.temperature;
  this.twitterSummary = this.weather_content.currently.summary; 
  this.pop_up = "https://twitter.com/intent/tweet?text=The current temperature at "+this.city+" is "+ this.twitterTemp+"\xB0F. The weather conditions are "+this.twitterSummary+" %23CSCI571WeatherSearch.";
  window.open(this.pop_up, '_blank');
 }

}
