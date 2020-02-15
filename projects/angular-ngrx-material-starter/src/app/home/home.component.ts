import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../core/core.module';
import { Web3Service } from '../util/web3.service';
import { MatDialog } from '@angular/material';
import { WalletPopupComponent } from '../wallet-popup/wallet-popup.component';
import { actionSettingsChangeTheme } from '../core/settings/settings.actions';
import { SettingsState, State } from '../core/settings/settings.model';

@Component({
  selector: 'anms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  accImag = require('../../assets/img/diagrama.svg');
  balance: any;
  stakeList: { worker: any; staker: string; value: number; period: any; };
  subStakeIndex;
  subStakeList: any[];
  isReStakeLocked: any;
  isReStakeDisabled: any;

  TokenToWithdraw: number;

  checked = true;

  constructor(private web3 : Web3Service, private dialog: MatDialog, private store: Store<State>) {}
  isMetamaskConnected: boolean;
  account: string = "0x0000000000000000000000";


  openDialog(): void {
    const dialogRef = this.dialog.open(WalletPopupComponent, {
      id: 'wallet-popup',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result, 'The dialog was closed');

      if (result == 1){
 const metamsk =      await  this.web3.connect();
 if (!metamsk){
  // alert that metamsk no installed
  alert("Web3 locked. Please unlock Metamask ")
 }else{
   const sign = await this.web3.requestSignature();
   console.log(sign, 'sign');

   if (sign){
    this.isMetamaskConnected = true;
    this.account = await this.web3.refreshAccounts();
    console.log(  this.account, '  this.account');
   this.balance = await this.web3.getBlance(this.account);
   this.balance = this.balance.toFixed(2);
   this.fechSmartcontract();
   }

  // this.balance=parseFloat (amount.toLocaleString())/10^18;
 }
      }
    });
  }


   // onselectTab(tabNum) {
 //   this.tabNumber=tabNum;
 //   console.log(tabNum,'tab number');

 // }
 async fechSmartcontract() {
  console.log('fechSmartcontract');

const stakes =    await this.web3.getStakerInfo(this.account);
this.isReStakeLocked = stakes['isReStakeLocked']
this.isReStakeDisabled = stakes['reStakeDisabled']
this.stakeList = {
worker: stakes['worker'],
staker: this.account,
value: stakes['value'], //parseFloat (stakes['value'])/10^18,
period: stakes['worker']
}

const lock1 = await this.web3.getLockedTokens(this.account, 0)
const lock2 = await this.web3.getLockedTokens(this.account, 1)
this.TokenToWithdraw = stakes['value'] - Math.max(parseFloat(lock1.toString()),  parseFloat(lock2.toString()))
this.TokenToWithdraw = +Number(this.TokenToWithdraw/10e+17).toFixed(2);
console.log(this.TokenToWithdraw, 'TokenToWithdraw');

await this.getIndex()
 await this.getReStakeLockedStatus()
}
  ngOnInit() {}

  async saveStake(value){
const tx = await this.web3.handleStake(value.amount.toLocaleString('fullwide', {useGrouping: false}) , value.duration);
  }
  async setWorker(value){
const tx = await this.web3.setWorker(value.worker);
  }

  //stakerInfo.workerStartPeriod + minWorkerPeriods
  async detachWorker(){
const tx = await this.web3.setWorker("0x0000000000000000000000000000000000000000");
  }
  async winddown(status){
    // staker can enble it by setting it to true or disable by false
const tx = await this.web3.setWindDown(status);
  }
  async getReStakeLockedStatus(){
    this.isReStakeLocked = await this.web3.isReStakeLocked(this.account);
    console.warn(this.isReStakeLocked, ' restake status');
  }
  async getIndex(){
    this.subStakeList = [];
this.subStakeIndex = await this.web3.getSubStakesLength(this.account);
for (let index = 0; index < this.subStakeIndex; index++) {
const substake = await this.web3.getSubStakeInfo(this.account, index);
substake['value'] = parseInt(substake['lockedValue'], 10) / (10 ** 18)
substake['worker'] = this.stakeList.worker;
substake['staker'] = this.account;
this.subStakeList.push(substake)
}
console.log(this.subStakeList, 'this.subStakeList');

  }
  async withdraw(value){
const tx = await this.web3.withdraw(value.amount);
  }
  async setReStake(value){
    console.warn('home', value)
    // const tx = await this.web3.setReStake(!this.isReStakeLocked);
    const tx = await this.web3.setReStake(value);
  }
  async lockReStake(value){
    console.warn('home', value.lockPeriod)
    const tx = await this.web3.lockReStake(value.lockPeriod);
  }

  async prolongStake(value){
const tx = await this.web3.prolongStake(value.index, value.periods);
  }
  async divideStake(value){
const tx = await this.web3.divideStake(value.index, value.amount.toLocaleString('fullwide', {useGrouping: false}) , value.periods);
  }

  async changeTheme() {
    const theme = this.checked ? 'BLACK-THEME' : 'LIGHT-THEME';
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }
}
