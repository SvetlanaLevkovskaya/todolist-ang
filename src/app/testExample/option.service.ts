import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  constructor() {}

  returnString() {
    return 'Hi'
  }
}
