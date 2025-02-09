import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-adoption-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.scss']
})
export class AdoptionFormComponent implements OnInit, OnDestroy {
  adoptionForm!: FormGroup;
  subscriptions: Subscription[] = [];
  submitting = false; // For showing loader when submitting
  colors = ['White', 'Black', 'Brown', 'Golden', 'Gray', 'Mixed'];
  selectedColor: string | null = null;
  dropdownOpen = false;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    // Initialize the form
    this.adoptionForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      color: ['', Validators.required],
      firstAdoption: [false],
      age: ['', [Validators.required, Validators.min(0), Validators.max(20)]]
    });

    //  Handle conditional validation: age should be max 8 if first adoption is checked
    this.subscriptions.push(
      this.adoptionForm.get('firstAdoption')!.valueChanges.subscribe(firstTime => {
        const ageControl = this.adoptionForm.get('age');
        if (firstTime) {
          ageControl!.setValidators([Validators.required, Validators.min(0), Validators.max(8)]);
        } else {
          ageControl!.setValidators([Validators.required, Validators.min(0), Validators.max(20)]);
        }
        ageControl!.updateValueAndValidity();
      })
    );
  }

  //  Handle form submission
  submitForm() {
    if (this.adoptionForm.invalid) return;

    this.submitting = true; // Show loader
    setTimeout(() => {
      alert('Your adoption request has been registered in the system!');
      this.submitting = false; // Hide loader
      this.adoptionForm.reset(); // Reset the form after submission
    }, 2000);
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); 
    this.dropdownOpen = !this.dropdownOpen;
  
    if (this.dropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdown);
      }, 0);
    }
  }
  
  closeDropdown = () => {
    this.dropdownOpen = false;
    document.removeEventListener('click', this.closeDropdown);
  }

  colorsMap: { [key: string]: string } = {
    White: '#FFFFFF',
    Black: '#000000',
    Brown: '#8B4513',
    Golden: '#FFD700', 
    Gray: '#808080',
    Mixed: 'linear-gradient(to right, #FFD700, #8B4513, #808080)'
  }
  

  selectColor(color: string) {
    this.selectedColor = color;
    this.adoptionForm.controls['color'].setValue(color);
    
    setTimeout(() => {
      this.dropdownOpen = false;
      this.cdRef.detectChanges(); // ✅ Forces UI to update the selected color box
    }, 100);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
