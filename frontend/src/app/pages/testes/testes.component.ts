import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

declare const M: any;

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent implements OnInit, AfterViewInit{
  
  @ViewChild('startinput', {static: true}) startInput: ElementRef;
  @ViewChild('metricinput', {static: true}) metricInput: ElementRef;
  
  readonly title = "test";

  metricArray: string[];
  formDOM: FormGroup;

  constructor(private _formBuilder: FormBuilder) { 
    this.metricArray = ["op1", "op2", "op3"];
  }

  ngOnInit() {
    this.formDOM = this._formBuilder.group({ start: [null], metric: [null] });
    this.formDOM.valueChanges.forEach( (value) => console.log(JSON.stringify(value)) );
 
  }
 
  ngAfterViewInit() {
    let pickerProperty = {
      autoClose: true, format: "yyyy-mm-dd", container: "body"
    };

    M.Datepicker.init(this.startInput.nativeElement, pickerProperty);
    M.FormSelect.init(this.metricInput.nativeElement, {});
  }
}
