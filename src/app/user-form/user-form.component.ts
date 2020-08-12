import { Component, OnInit, Input, SimpleChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  names:FormArray;
  playersNamesForm: FormGroup;
  players : Player[];
  submitted = false;
  constructor(private formBuilder: FormBuilder) { 
    this.playersNamesForm = this.formBuilder.group({
      names: this.formBuilder.array([])
    });
  }
 
  @Input() formNumber:number;
  @Output() namesEvent = new EventEmitter<FormArray>();
  ngOnInit() {
    for(let i=0; i<this.formNumber; i++){
      this.addField();
    }
  }
  get formData() { return <FormArray>this.playersNamesForm.get('names');}

  createPlayerFields(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentNumber: SimpleChange = changes.formNumber;
    if(currentNumber.previousValue<currentNumber.currentValue){
      this.addField()
    }
    else{
      this.removeField()
    }
  }

  addField(){
    this.names = this.playersNamesForm.get('names') as FormArray;
    this.names.push(this.createPlayerFields());
  }

  removeField(){
    this.names = this.playersNamesForm.get('names') as FormArray;
    this.names.removeAt(this.names.length-1);
  }

  onSubmit(){
    this.submitted = true;
    if (this.playersNamesForm.dirty && this.playersNamesForm.valid) {
    this.namesEvent.emit(this.names);
    }
  }
}
