import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  plan:any = {
    goal: ['12 goal'],
    projPass: ['projPass'],
    tasks: ['tasks'],
    kafed: ['kafed'],
    conDep: ['conDep'],
    spinOf: ['spinOf'],
    mainData: {
      title: 'Loyiha nomini kirgizing?',
      owner: '"Kimyo texnologiya" fakulteti 72-21 elita guruh talabasi Jo‘rayev Javohir',
      cost: 'cost',
      workplace: 'workplace'
    }
  }
}
