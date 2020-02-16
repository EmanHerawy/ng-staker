import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'anms-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss'],
})

export class AgreementComponent {
  agreement1 = require('../../assets/agreement1.png');
  agreement2 = require('../../assets/agreement2.png');
  constructor(
    public dialogRef: MatDialogRef<AgreementComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  checked = false;

  onNoClick(): void {
    this.dialogRef.close();
  }

}

