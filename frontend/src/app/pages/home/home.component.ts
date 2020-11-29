import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ReminderService } from '../../services/reminder.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  reminderList: any[] = [];  
  reminder: FormGroup;

  constructor(
    private router: Router,
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
        console.log(dados);
        this.toastr.success(dados.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000)
        //this.router.navigateByUrl('/home');
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
    this.service.getReminders().subscribe((dados: any) => { 
     /*  if(!dados?.token) return console.log(dados);
      localStorage.getItem("token"); */
      this.reminderList = dados;
      console.log(this.reminderList);
    }, 
    (err: any) => {
      this.toastr.warning(err.error.message)
    });  
  }

  delReminder(event: Event) { 
  this.service.deleteReminder(this.reminder.value).subscribe(() => {
      console.log(`Lembrete deletado com id = ${this.reminder.value}`)
  }),
     // this.toastr.info(del.message);
    (err: any) => {
       this.toastr.warning(err.error.message)
    }
  } 


  logoutApplication(event: Event) {
    event.preventDefault(); // Prevents browser following the link
    localStorage.clear();
    this.toastr.info('Saindo da aplicação');
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 3000)
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
