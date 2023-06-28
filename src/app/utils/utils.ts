import { CarsType, CarType } from 'src/app/utils/utils.spec'

export type UserType = {
  name: string
  age: number
  isWorking: boolean
  children: string[]
}

export type UsersType = UserType[]

export const myFn = (arr1: UsersType, arr2: CarsType, followers: number) => {
  const newArr1 = arr1.filter(({ children }) => children.length >= 2)
  followers += 5
  const newArr2 = arr2.map(car => (car.topSpeed < 200 ? { ...car, topSpeed: 900 } : car))
  followers -= 1
  return { arr1: newArr1, arr2: newArr2, followers }
}
