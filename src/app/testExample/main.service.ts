import { Injectable } from '@angular/core'
import { OptionService } from 'src/app/testExample/option.service'

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private optionService: OptionService) {}

  returnValue(value: number) {
    return value
  }

  newMethod() {
    return this.optionService.returnString()
  }
}
