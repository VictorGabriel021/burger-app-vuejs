import type { BurgerDados, IBurger } from '@/shared/interfaces/burger'

const BurgerService = () => {
  const getBugers = (): IBurger[] => {
    const burgerData = localStorage.getItem('BurgerDados')

    if (burgerData) {
      return JSON.parse(burgerData)
    }

    return []
  }

  const createBurger = ({ nome, carne, pao, opcionais, status }: BurgerDados): void => {
    const burgerData = localStorage.getItem('BurgerDados')

    if (burgerData) {
      const burgerArray: IBurger[] = JSON.parse(burgerData)

      burgerArray.push({
        nome,
        pao,
        carne,
        opcionais,
        status,
        id: `${burgerArray.length + 1}`
      })

      localStorage.setItem('BurgerDados', JSON.stringify(burgerArray))
    } else {
      localStorage.setItem(
        'BurgerDados',
        JSON.stringify([
          {
            nome,
            pao,
            carne,
            opcionais,
            status,
            id: `1`
          }
        ])
      )
    }
  }

  const updateBurger = (data: IBurger, status: string): void => {
    const burgers = localStorage.getItem('BurgerDados')

    if (burgers) {
      const burgersArray: IBurger[] = JSON.parse(burgers)

      burgersArray.splice(
        burgersArray.findIndex((burger) => burger.id === data.id),
        1,
        { ...data, status }
      )
      localStorage.setItem('BurgerDados', JSON.stringify(burgersArray))
    }
  }

  const deleteBurger = (id: string): void => {
    const burgers = localStorage.getItem('BurgerDados')

    if (burgers) {
      const burgersArray: IBurger[] = JSON.parse(burgers)

      burgersArray.splice(
        burgersArray.findIndex(({ id: itemId }) => itemId === id),
        1
      )

      localStorage.setItem('BurgerDados', JSON.stringify(burgersArray))
    }
  }

  return {
    getBugers,
    createBurger,
    updateBurger,
    deleteBurger
  }
}

export default BurgerService
