import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'anms-wallet-popup',
  templateUrl: './wallet-popup.component.html',
  styleUrls: ['./wallet-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPopupComponent implements OnInit {
  keystore= require('../../assets/img/keystore.svg');
  ledger= require('../../assets/img/ledger.svg');
  metamask= require('../../assets/img/metamask-fox.svg');


  ngOnInit() {
  }
  constructor(
    public dialogRef: MatDialogRef<WalletPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onWalletSelect(item): void {
    console.log(item,'item');

    this.dialogRef.close(item);
  }

}





