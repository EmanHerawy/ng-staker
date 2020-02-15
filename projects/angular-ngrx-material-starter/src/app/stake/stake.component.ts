import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AgreementComponent } from '../agreement/agreement.component';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../core/core.module';

@Component({
  selector: 'anms-stake',
  templateUrl: './stake.component.html',
  styleUrls: ['./stake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StakeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  myForm: FormGroup;
  isEditing: boolean;
  @Input() isMetamaskConnected ;
  @Input() balance;
  @Input() account;
  @Output() onSave = new EventEmitter<any>();
  constructor(private fb: FormBuilder,private dialog: MatDialog) {
    this.myForm = this.createForm();
  }

  ngOnInit() {}
  createForm() {
    return this.fb.group({
      amount: [
        null,
        [Validators.required, Validators.min(15000)]
      ],
      duration: [null, [Validators.required, Validators.min(30)]]
    });
  }

  cancelEditing() {
    this.isEditing = false;
  }




  openDialog(): void {
    const dialogRef = this.dialog.open(AgreementComponent, {
      id: 'agreement-popup',
      data: {
        account: this.account,
        amount: this.myForm.value.amount,
        duration: this.myForm.value.duration,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'The dialog was closed');
      if(result==true){
        this.onSave.emit(this.myForm.value);
      }
    });
  }
}
