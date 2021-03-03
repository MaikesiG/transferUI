import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransferPanelComponent } from './demos/components/transfer/transfer-panel/transfer-panel.component';
import { FormsModule } from '@angular/forms';
import { TransferComponent } from './demos/components/transfer/transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    TransferPanelComponent,
    TransferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
