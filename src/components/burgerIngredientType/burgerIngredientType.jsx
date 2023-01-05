import React from 'react';
import burgerIngredientTypeStyles from './burgerIngredientType.module.css';
import BurgerIngredient from '../burgerIngredient/burgerIngredient';
import { ingredients } from '../../utils/data';

class BurgerIngredientType extends React.Component {
  constructor(props) {
    super(props);
    this.type = props.type;
    this.typeName = props.typeName;
  }
  render() {
    return (
      <li>
        <h3 className="text text_type_main-medium">{this.typeName}</h3>
        <ul className={`${burgerIngredientTypeStyles['burger-ingredient-type__list']} pt-6 pb-10 pr-4 pl-4`}>
          {ingredients
            .filter((ingredient) => {
              return ingredient.type === this.type;
            })
            .map((ingredient) => {
              return <BurgerIngredient key={ingredient._id} data={ingredient}></BurgerIngredient>;
            })}
        </ul>
      </li>
    );
  }
}

export default BurgerIngredientType;
