import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { AdoptionFormComponent } from '../adoption-form/adoption-form.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, SearchComponent, AdoptionFormComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  activeTab: 'search' | 'adoption' = 'search';
}
