import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app/app.component';
import { StakeComponent } from './stake/stake.component';
import { WalletPopupComponent } from './wallet-popup/wallet-popup.component';
import { UtilModule } from './util/util.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AgreementComponent } from './agreement/agreement.component';
import { ManageComponent } from './manage/manage.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,
// matrial
MatDialogModule,
    // app
    AppRoutingModule,
    // web3
    UtilModule
  ],  entryComponents: [
    AgreementComponent,WalletPopupComponent
  ],
  declarations: [AppComponent,HomeComponent, StakeComponent, WalletPopupComponent,  AgreementComponent, ManageComponent, WithdrawComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
