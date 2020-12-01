import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ReminderService } from '../../services/reminder.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


declare const M: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
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

  // Função de submit do form com validações
  onSubmit() {
    console.log(this.reminder);

    if (!this.reminder.valid) {
      console.log('Lembrete inválido');
      Object.keys(this.reminder.controls).forEach((campo) => {
        console.log(campo);
        const controle = this.reminder.get(campo);
        controle.markAsDirty();
      });
      return;
    }

    // Chama a rota de criação de um lembrete
    this.service.newReminder(this.reminder.value).subscribe(
      (dados: any) => {
        console.log(dados);
        this.toastr.success(dados.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        //this.router.navigateByUrl('/home');
      },
      (err: any) => this.toastr.error(err.error.message)
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

  // Chama a rota de lista de lembretes criados pelo usuário
  getListReminder() {
    this.service.getReminders().subscribe(
      (dados: any) => {
        /*  if(!dados?.token) return console.log(dados);
       localStorage.getItem("token"); */
        this.reminderList = dados;
        console.log(this.reminderList);
      },
      (err: any) => {
        this.toastr.warning(err.error.message);
      }
    );
  }

  // Chama a rota de remover um lembrete
  delReminder(event: Event) {
    this.service.deleteReminder(this.reminder.value).subscribe(() => {
      console.log(`Lembrete deletado com id = ${this.reminder.value}`);
    }),
      // this.toastr.info(del.message);
      (err: any) => {
        this.toastr.warning(err.error.message);
      };
  }

  // Funçoes auxiliares
  datapickerInitialize(id: string) {
    let elems = document.getElementById(id);
    M.Datepicker.init(elems, {
      format: 'dd/mm/yyyy',
      autoclose: false,
      showClearBtn: true,
      minDate: new Date(),
      i18n: {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Hoje',
        clear: 'Limpar',
        cancel: 'Sair',
        done: 'Confirmar',
        labelMonthNext: 'Próximo mês',
        labelMonthPrev: 'Mês anterior',
        labelMonthSelect: 'Selecione um mês',
        labelYearSelect: 'Selecione um ano',
        selectMonths: true,
        selectYears: 15,
      },
      onSelect: (dateText: any) => {
        this.reminder.controls[id].setValue(dateText);
      },
    });
  }

  timepickerInitialize(id: string) {
    let elems = document.getElementById(id);

    M.Timepicker.init(elems, {
      autoclose: false,
      twelveHour: false,
      showClearBtn: true,
      i18n: {
        clear: "Limpar",
        done: "Confirmar",
        cancel: "Cancelar"
      },
      onSelect: (dateText: any) => {
        dateText = new Date(dateText * 1000)
        this.reminder.controls[id].setValue(dateText);
      }
    });
  }

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
      locations: [null, [Validators.required]],
      day: [null, [Validators.required]],
      atv_name: [null, [Validators.required]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
    });

    console.log(this.reminder.controls['day'].value);
  }
}
