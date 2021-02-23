import React from 'react'
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = props => {

  let passedIngredients = props.ingredients;
  let burger = [];
  for (let ingredient in passedIngredients) {
    let numOfItems = passedIngredients[ingredient];
    while (numOfItems > 0) {
      burger.push(<BurgerIngredient type={ingredient} key={ingredient + numOfItems} />)
      numOfItems--
    }
  }
  if (burger.length === 0) burger = <p>Please start adding ingredients</p>

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {burger}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )

}

export default burger