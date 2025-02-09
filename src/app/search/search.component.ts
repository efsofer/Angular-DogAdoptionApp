import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DogService } from '../services/dog.service';
import { Subscription } from 'rxjs';
import { count, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  breeds: string[] = [];
  dogImages: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private dogService: DogService) {}

  ngOnInit() {
    // Initialize form
    this.searchForm = this.fb.group({
      breed: ['', Validators.required],
      count: [10, [Validators.required, Validators.min(1), Validators.max(50)]]
    });

    // Subscribe to breeds
    this.subscriptions.push(
      this.dogService.getBreeds().subscribe(breeds => this.breeds = breeds)
    );

    // Subscribe to dog images
    this.subscriptions.push(
      this.dogService.getDogImages().subscribe(images => this.dogImages = images)
    );

    // Handle form changes
    const breedControl = this.searchForm.get('breed');
if (breedControl) {
  breedControl.valueChanges
    .pipe(filter(breed => !!breed))
    .subscribe(breed => this.dogService.setSelectedBreed(breed));
}
    
const countControl = this.searchForm.get('count');
if (countControl) {
    countControl.valueChanges
    .pipe(filter(count => !! count  && count >= 1 && count <= 50))
    .subscribe(count => this.dogService.setCount(count));
}
}

  validateNumberInput(event: KeyboardEvent) {
    const inputChar = event.key;
    if (!/^[0-9]$/.test(inputChar)) {
      event.preventDefault(); 
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
