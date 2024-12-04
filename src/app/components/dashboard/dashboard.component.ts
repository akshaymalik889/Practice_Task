import { Component, OnInit } from '@angular/core';
import { Movie } from '../../entities/movie';
import { FetchDataService } from '../../services/fetch-data.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { _MatInternalFormField } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],


  
templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

movieData:Movie[] = [];
filteredData: Movie[] = [];
searchCountry: string = '';
states: string[] = []; 
selectedStates: string = '';
emptyInputField: boolean = this.searchCountry ==''?true:false;


constructor( private dataService:FetchDataService)
{}


ngOnInit(): void {
  
  this.dataService.fetchData().subscribe({
    next: (res) => {
      console.log(res);
      this.movieData = res;
    },
    error: (err) => {
      console.log(err);
    }
  });
}

getStates(): void 
{
  const stateSet = new Set<string>();
  this.filteredData.forEach((data) => {
    stateSet.add(data.alpha_two_code);
  });
  this.states = Array.from(stateSet);
  console.log(this.states);
}

filterByCountry(): void 
{
  this.emptyInputField = false;
  this.filteredData = this.movieData.filter((data) =>
    data.country.toLowerCase().includes(this.searchCountry.toLowerCase())
  );
  this.getStates(); 
  
}


filterByState(): void 
{
  if (this.selectedStates) 
    {
      this.filteredData = this.movieData.filter(
      (data) =>
        data.country.toLowerCase().includes(this.searchCountry.toLowerCase()) &&
        data.alpha_two_code === this.selectedStates
    );
  } else {
    this.filterByCountry(); 
  }
}

downloadImage()
{
  
}

}
