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
  prolongForm: FormGroup;
  dividForm: FormGroup;
@Output()onSetWorker= new EventEmitter<any>();
@Output()onReStake= new EventEmitter<any>();
@Output()onDetachWorker= new EventEmitter<any>();
@Output()onWinddown= new EventEmitter<any>();
@Output()onDivide= new EventEmitter<any>();
@Output()onProlong= new EventEmitter<any>();
@Input()data=[];
@Input()isReStakeLocked;
public winddownStatus: boolean;
  constructor(private fb: FormBuilder ) {
    this.myForm = this.createWorkerForm();
    this.prolongForm = this.createProlongForm();
    this.dividForm = this.createDividForm();
  }

  ngOnInit() {
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
  this.onDetachWorker.emit();

}
winddown(){
  this.onWinddown.emit(this.winddownStatus);

}
restake(){
  this.onReStake.emit();

}
prolong(){
  this.onProlong.emit(this.prolongForm.value);

}
divide(){
  this.onDivide.emit(this.dividForm.value);

}
}
