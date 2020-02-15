import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'anms-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ManageComponent implements OnInit {
  myForm: FormGroup;
  restakeForm: FormGroup;
  prolongForm: FormGroup;
  dividForm: FormGroup;
@Output()onSetWorker= new EventEmitter<any>();
@Output()onReStake= new EventEmitter<any>();
@Output()onReStakeLock= new EventEmitter<any>();
@Output()onDetachWorker= new EventEmitter<any>();
@Output()onWinddown= new EventEmitter<any>();
@Output()onDivide= new EventEmitter<any>();
@Output()onProlong= new EventEmitter<any>();
@Input()data=[];
@Input()isReStakeLocked;
public detachStatus: any;
public restakeStatus: any;
public winddownStatus: boolean;
  constructor(private fb: FormBuilder ) {
    this.myForm = this.createWorkerForm();
    this.restakeForm = this.createRestakeForm();
    this.prolongForm = this.createProlongForm();
    this.dividForm = this.createDividForm();
  }

  ngOnInit() {
    this.detachStatus = 'detach';
    this.restakeStatus = false;
    this.winddownStatus = false;
  }
  createWorkerForm() {
    return this.fb.group({
      worker: [
        "",
        [Validators.required]
      ],
    });
  }
  createRestakeForm() {
    return this.fb.group({
      lockPeriod: [
        "",
        [Validators.required]
      ],
    });
  }
  createProlongForm() {
    return this.fb.group({
      index: [
        null,
        [Validators.required]
      ],
      periods: [
        null,
        [Validators.required]
      ],
    });
  }
  createDividForm() {
    return this.fb.group({
      index: [
        null,
        [Validators.required]
      ],
      periods: [
        null,
        [Validators.required]
      ],
      amount: [
        null,
        [Validators.required]
      ],
    });
  }

  winddownStatusChanged(status) {
    this.winddownStatus = status.value;
  }

setWorker(){
  this.onSetWorker.emit(this.myForm.value);

}
detachWorker(){
  if(this.detachStatus === 'replace') {
    this.onSetWorker.emit(this.myForm.value);
  } else {
    this.onDetachWorker.emit();
  }
}
winddown(){
  this.onWinddown.emit(this.winddownStatus);

}
restake(){
  if(this.restakeStatus === 'lock') {
    console.warn('manage', this.restakeForm.value)
    const now = new Date();
    const fullDaysSinceEpoch = Math.floor(now/8.64e7);
    console.warn(this.restakeForm.value.lockPeriod >= fullDaysSinceEpoch)
    if(this.restakeForm.value.lockPeriod >= fullDaysSinceEpoch) {
      this.onReStakeLock.emit(this.restakeForm.value);
    } else {
      return
    }
  } else {
    console.warn('manage', this.restakeStatus)
    this.onReStake.emit(this.restakeStatus);
  }
}
prolong(){
  this.onProlong.emit(this.prolongForm.value);

}
divide(){
  this.onDivide.emit(this.dividForm.value);

}
}
