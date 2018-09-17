import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';



import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { MainBodyComponent } from './main-body/main-body.component';

// Routes to be controlled by the router. Either the home page for the user, or the website home page. 
// Info on routing and configuring the router: https://angular.io/guide/router
const appRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: '',      component: MainBodyComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataComponent,
    MainBodyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
