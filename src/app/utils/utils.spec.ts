import { myFn, UsersType } from 'src/app/utils/utils'

const users: UsersType = [
  { name: 'Bob', age: 50, isWorking: true, children: ['Sam', 'ALice'] },
  { name: 'Jack', age: 36, isWorking: false, children: ['Ben'] },
  { name: 'Kate', age: 41, isWorking: true, children: ['Mike', 'Jesika'] },
  { name: 'Dustin', age: 54, isWorking: true, children: ['Steven', 'Naomi', 'Raul'] },
  { name: 'Conor', age: 34, isWorking: false, children: ['Kevin'] },
  { name: 'Irji', age: 50, isWorking: true, children: ['Richard'] },
  { name: 'Usman', age: 23, isWorking: false, children: [] },
]

export type CarType = {
  brand: string
  topSpeed: number
  price: number
}

export type CarsType = CarType[]

const cars: CarsType = [
  { brand: 'Audi', topSpeed: 300, price: 40000 },
  { brand: 'Bmw', topSpeed: 350, price: 45000 },
  { brand: 'Toyota', topSpeed: 250, price: 30000 },
  { brand: 'Honda', topSpeed: 280, price: 25000 },
  { brand: 'Mazda', topSpeed: 120, price: 15000 },
]

describe('cool utils', () => {
  it('correct work', () => {
    const result = myFn(users, cars, 150)
    expect(result.arr1.length).toBe(3)
  })
  /*
  it('correct 2', () => {
    const result = myFn(users, cars, 150)
    expect(result.followers).toBe(154)
  })*/
})
