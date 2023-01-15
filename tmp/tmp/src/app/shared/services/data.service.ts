import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  plan = {
    goal: [
      "Organik o‘g‘it va meva-sabzavotlarni po‘chog‘idan tabiy gaz olish",
      "Har bir aholini gaz bilan taminlash oladigan qurilma yasash",
      "Atrof muhitni obodligini taminlash"
    ],
    projPass: [],
    tasks: [],
    kafed: [],
    conDep: [],
    spinOf: [],
  }
}
