import { Component, OnInit } from '@angular/core';
import { faUser, faMoneyBill, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor() { }
  f_A = {faUser, faMoneyBill, faPeopleGroup}
  ngOnInit(): void {
  }

}
