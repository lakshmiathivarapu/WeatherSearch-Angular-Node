import { Component, ViewChild, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'weather-search-app';
  latitude = null
  longitude = null
  weather_data = null
  city = null
  state = null
  seal_link = null
  displaycurrent = false
  all_cities = []
  isLoading = false
  clickFavourite = null
  favouriteStorage = window.localStorage;
  invalid_address = false

  weathersearch = new FormGroup({
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required)
  });

  ngOnInit() {

    let params;
    let headers;
    this.weathersearch.controls["city"].valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.all_cities = [];
          this.isLoading = true;
          params = new HttpParams()
          .set('term', (this.weathersearch.controls["city"].value))
          console.log(params)
          headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
        }),
        switchMap(value => this.http.get("http://localhost:3000/autocomplete", {
          headers: headers,
          params: params
        }).pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data['predictions'] == undefined) {
          this.all_cities = [];
        } else {
          this.all_cities = data['predictions'];
        }
        console.log(this.all_cities);
      });
  }

  constructor(private http: HttpClient) { }

  AddressSubmitFunction(e:any) {
    this.displaycurrent = true;
    this.invalid_address = false;
    this.clickFavourite = false;
    console.log(this.weathersearch.value);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});

    const params = new HttpParams()
          .set('street', (this.weathersearch.controls['street'].value))
          .set('city', (this.weathersearch.controls['city'].value))
          .set('state', (this.weathersearch.controls['state'].value))

   this.state = this.weathersearch.controls['state'].value;

    this.http.get("http://localhost:3000/weathersearchform", {
          headers: headers,
          params: params
        }).subscribe((data: any[]) => {
          let check = data
          console.log(data)
          if(check['status'] == "Invalid")
          { this.invalid_address = true;
              this.weather_data = null; }
          else 
          {
          this.weather_data = data
          this.city = this.weathersearch.controls['city'].value;
          this.getStateLogoFunction();
          }
          console.log("RESPONSE RECEiVED from Darksky get call");
   })
 }

   getStateLogoFunction() {

    this.displaycurrent = true;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});

    const params = new HttpParams()
          .set('state', this.state)
    console.log("Called function Logo")
    this.http.get("http://localhost:3000/displaystatelogo", {
          headers: headers,
          params: params
        }).subscribe((data: any[]) => {
          console.log(data)
          this.seal_link = data
   })
 }


  CurrentLocation(event) {
     this.displaycurrent = true;
      if(event.target.checked) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
        this.http.get("http://ip-api.com/json").subscribe((data: any[]) => {
              console.log("RESPONSE RECEiVED from get call");
              console.log(typeof(data))
              this.latitude = data['lat'];
              this.longitude = data['lon'];    
              this.city = data['city']; 
              this.state = data['state'];
              console.log(this.latitude + " " + this.longitude)    
              const request_params = new HttpParams()
              .set('lat', this.latitude)
              .set('lon', this.longitude)
              this.http.get("http://localhost:3000/currentlocation", {
                headers: headers,
                params: request_params
              }).subscribe((data: any[]) => {
            console.log(data)
            this.weather_data = data
            if(data)
            this.getStateLogoFunction()
            console.log("RESPONSE RECEiVED from Current Location get call");
         })
      })
    }
  }

 clearFunction()
  {
        this.weather_data = null
  }

  displayFavourites()
  {
    var tom = {"data":[
    {"city":"John",
    "state":"Anna",
    "id":"Peter", 
    "imgsrc":"Jones"}
    ]};
   this.storage.setItem(data['city'],JSON.stringify(tom));
   this.pointer =JSON.parse(this.storage.getItem('mycat'));
  }

  public handleCityChange(city: any) {

  }
}
