import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../movies/layout/layout.component";

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {}
