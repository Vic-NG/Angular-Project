import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(
    private service: ReminderService,
  ) { }

  ngOnInit(): void {

    this.service.getReminders();
  }




  handleClick(event: Event) { 
    console.log('Click!', event) 
  } 

}
