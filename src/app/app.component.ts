import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Components
import { WatchlistComponent } from './watchlist/watchlist.component';
import { DetailComponent } from './movies/detail/detail.component';
import { AddComponent } from './movies/add/add.component';
import { HomeComponent } from './movies/home/home.component';

// Services
import { WatchlistService } from './core/services/watchlist.service';
import { MovieService } from './core/services/movie.service';

@NgModule({
  declarations: [
    AppComponent,
    WatchlistComponent,
    DetailComponent,
    AddComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'add', component: AddComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'watchlist', component: WatchlistComponent }
    ])
  ],
  providers: [WatchlistService, MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
