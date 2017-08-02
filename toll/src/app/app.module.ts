import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TollComponent } from './toll/toll.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http'; // <-- Import HttpModule
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { RegisterComponent } from './register/register.component';
import { AddDecimalPipe } from './add-decimal.pipe';
import { EqualValidator } from './equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    TollComponent,
    LoginComponent,
    RegisterComponent,
    EqualValidator,
    AddDecimalPipe
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- Include module in our AppModules
		HttpModule, // <-- Include module in our AppModules
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
