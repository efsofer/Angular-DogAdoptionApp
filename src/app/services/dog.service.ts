import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private breedsSubject = new BehaviorSubject<string[]>([]);
  private selectedBreedSubject = new BehaviorSubject<string | null>(null);
  private countSubject = new BehaviorSubject<number>(10);
  private dogImagesSubject = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    this.loadBreeds();
  }

  // Load list of breeds (only breeds with sub-breeds)
  private loadBreeds(): void {
    this.http.get<any>('https://dog.ceo/api/breeds/list/all')
      .pipe(
        map(response => {
          const breeds = response.message;
          return Object.keys(breeds).filter(breed => breeds[breed].length > 0);
        }),
        tap(breeds => this.breedsSubject.next(breeds))
      )
      .subscribe();
  }

  // Public Observable to get breeds list
  getBreeds(): Observable<string[]> {
    return this.breedsSubject.asObservable();
  }

  // Set selected breed and trigger API call for images
  setSelectedBreed(breed: string): void {
    this.selectedBreedSubject.next(breed);
    this.fetchDogs();
  }

  // Get selected breed as Observable
  getSelectedBreed(): Observable<string | null> {
    return this.selectedBreedSubject.asObservable();
  }

  // Set the number of images to show
  setCount(count: number): void {
    this.countSubject.next(count);
    this.fetchDogs();
  }

  // Get count as Observable
  getCount(): Observable<number> {
    return this.countSubject.asObservable();
  }

  // Fetch dog images based on breed and count
  private fetchDogs(): void {
    const breed = this.selectedBreedSubject.value;
    const count = this.countSubject.value;
    if (!breed) return;

    this.http.get<any>(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
      .pipe(
        map(response => response.message),
        tap(images => this.dogImagesSubject.next(images))
      )
      .subscribe();
  }

  // Public Observable for dog images
  getDogImages(): Observable<string[]> {
    return this.dogImagesSubject.asObservable();
  }
}

