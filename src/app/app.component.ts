import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent } from "./tabs/tabs.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [TabsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dog-adoption-app';
}
