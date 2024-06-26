interface IIngrediente {
  id: number
  tipo: string
}

export type BurgerDados = {
  paes: IIngrediente[]
  carnes: IIngrediente[]
  opcionais: IIngrediente[]
  opcionaisdata: IIngrediente[]
  nome: string
  carne: string
  pao: string
  status: string
  msg: string
}

export interface IBurger {
  id: string
  nome: string
  carne: string
  pao: string
  opcionais: IIngrediente[]
  status: string
}
