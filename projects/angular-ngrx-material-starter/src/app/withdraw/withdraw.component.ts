import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'anms-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawComponent implements OnInit {
  myForm:FormGroup;
  @Output()onWithdraw= new EventEmitter<any>();
  @Input()TokenToWithdraw=0;

@Input()data;
  constructor(private fb: FormBuilder ) {
    this.myForm = this.createForm();
  }

  ngOnInit() {}
  createForm() {
    return this.fb.group({
      amount: [
        null,
        [Validators.required]
      ]
    });
  }
  withdraw(){
    this.onWithdraw.emit(this.myForm.value * 10e+17);

  }
}
