import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ReminderService } from '../../services/reminder.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';
import { faCalendarDay, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class HomeComponent implements OnInit {
  reminderList: any[] = [];
  reminder: FormGroup;
  modal: boolean = false;
  faCalendarDay = faCalendarDay;
  faSignOutAlt = faSignOutAlt;


  // model: NgbDateStruct;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private service: ReminderService,
    private formBuilder: FormBuilder,
  ) { }

  // Função de submit do form com validações
  onSubmit() {
    console.log(this.reminder);

    if (!this.reminder.valid) {
      this.toastr.error('Preencha todos os campos.')
      Object.keys(this.reminder.controls).forEach((campo) => {
        console.log(campo);
        const controle = this.reminder.get(campo);
        controle.markAsDirty();
      });
      return;
    }

    // Chama a rota de criação de um lembrete
    let body = { ...this.reminder.value };
    delete body["atividade"];
    this.service.newReminder(body).subscribe(
      (dados: any) => {
        console.log(dados);
        this.toastr.success(dados.message);
        this.getListReminder();
        this.reminder.reset(this.reminder = this.formBuilder.group({
          locations: ['', [Validators.required]],
          day: ['', [Validators.required]],
          start: ['', [Validators.required]],
          end: ['', [Validators.required]],
          atv_name: [[], Validators.required],
          atividade: ['', []]
        }));
      },
      (err: any) => this.toastr.error(err.error.message)
    );
  }

  // Chama a rota de lista de lembretes criados pelo usuário
  getListReminder() {
    this.service.getReminders().subscribe(
      (dados: any) => {
        console.log(dados);
        this.reminderList = dados.map(x => {
          x.day = new Date(x.day);
          return x;
        });
        console.log(dados);
      },
      (err: any) => {
        this.toastr.warning(err.message);
      }
    );
  }

  // Chama a rota de remover um lembrete
  delReminder(event: Event, _id) {
    this.service.deleteReminder(_id).subscribe((x: any) => {
      //console.log(`Lembrete deletado com id = ${this.reminder.value}`);
      console.log(_id);
      this.toastr.success(x.message);
      this.getListReminder();
    }),
      // this.toastr.info(del.message);
      (err: any) => {
        this.toastr.warning(err.error.message);
      };
  }

  // Funçoes auxiliares
  logoutApplication(event: Event) {
    event.preventDefault(); // Prevents browser following the link
    localStorage.clear();
    this.toastr.info('Saindo da aplicação');
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 3000);
  }

  ngOnInit(): void {
    this.getListReminder();
    //localStorage.clear();
    this.reminder = this.formBuilder.group({
      locations: ['', [Validators.required]],
      day: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      atv_name: [[], Validators.required],
      atividade: ['', []]
    });
    /* this.reminder = this.formBuilder.group({
      locations: [null, [Validators.required]],
      day: [null, [Validators.required]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
      atv_name: new FormArray([])
    });

    this.arrayControls =  (this.reminder.get('atv_name') as FormArray)  .controls; */
  }

  addOrRemoveAtv(e, index = "false") {
    e.preventDefault();

    let atividade = this.reminder.controls.atividade.value;
    let lista = this.reminder.controls.atv_name.value;

    console.log(lista)
    if (index != "false") {
      lista.splice(index, 1);
      this.reminder.patchValue({ atv_name: lista });
    } else {
      if (!atividade) return;
      lista.push(atividade);
      this.reminder.patchValue({ atv_name: lista, atividade: '' });
    }

  }

    openModal(){
     this.modal = true; 
    }
}
