import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { StartAGameComponent } from './start-agame/start-agame.component';
import { GameContainerComponent } from './game-container/game-container.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SinglePlayerComponent } from './single-player/single-player.component';


@NgModule({
  declarations: [
    AppComponent,
    StartAGameComponent,
    GameContainerComponent,
    UserFormComponent,
    SinglePlayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SinglePlayerComponent,  
  ],
})
export class AppModule { }
