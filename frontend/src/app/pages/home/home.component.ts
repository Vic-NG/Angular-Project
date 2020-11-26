import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ReminderService } from '../../services/reminder.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public reminderList: any[];  

  constructor(
    private toastr: ToastrService,
    private service: ReminderService
  ) { }

  ngOnInit(): void {
    this.service.getReminders().subscribe((x:any) => {
      this.reminderList = x;
      console.log(this.reminderList);
    }, 
    (err: any) => {
      this.toastr.warning(err.error.message)
    });  
  }


  handleClick(event: Event) { 
    console.log('Click!', event) 
  } 

}
