import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  plan:any = {
    goal: [],
    projPass: [],
    tasks: [],
    kafed: [],
    conDep: [],
    spinOf: [],
    title: 'Loyiha nomini kirgizing?',
    owner: 'Namuna: "Kimyo texnologiya" fakulteti 72-21 elita guruh talabasi Jo‘rayev Javohir',
    cost: '',
    workplace: ''
  }
}
