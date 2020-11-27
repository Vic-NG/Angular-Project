import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ReminderService } from '../../services/reminder.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  public reminderList: any[] = [];  
  reminder: FormGroup;

  constructor(
    private toastr: ToastrService,
    private service: ReminderService,
    private formBuilder: FormBuilder
  ) { }


  onSubmit() {
    console.log(this.reminder);

    if(!this.reminder.valid){
      console.log('Lembrete inválido');
      Object.keys(this.reminder.controls).forEach((campo) => {
        console.log(campo);
        const controle = this.reminder.get(campo);
        controle.markAsDirty();
      })
      return;
    }

    this.service.newReminder(this.reminder.value).subscribe(
      (dados:any) => {
        if (!dados?.token) return;
        localStorage.setItem('token', dados.token);
        console.log(dados);
      },
      (err: any) =>  this.toastr.error(err.error.message)
    );
  }

   aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  verificaValidTouched(campo: string) {
    return (
      !this.reminder.get(campo).valid &&
      (this.reminder.get(campo).touched || this.reminder.get(campo).dirty)
    );
  }

  getListReminder(){
    this.service.getReminders().subscribe((dados:any) => {
      if(!dados.token) return;
      localStorage.setItem('token', dados.token);
      this.reminderList = dados;
      console.log(this.reminderList);
    }, 
    (err: any) => {
      this.toastr.warning(err.error.message)
    });  
  }

  handleClick(event: Event) { 
    console.log('Click!', event) 
  } 

  ngOnInit(): void {
    this.getListReminder();
    //localStorage.clear();
    this.reminder = this.formBuilder.group({
      locations: [null, [Validators.required]],
      day: [null, [Validators.required]],
      atv_name: [null, [Validators.required]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required]]
    });
  }
}
