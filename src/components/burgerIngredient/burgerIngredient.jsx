import React from 'react';
import burgerIngredientStyles from './burgerIngredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredient extends React.Component {
  constructor(props) {
    super(props);
    this.image = props.data.image;
    this.name = props.data.name;
    this.type = props.data.type;
    this.price = props.data.price;
  }
  render() {
    return (
      <li className={`${burgerIngredientStyles['burger-ingredient__card']}`}>
        <figure className={`${burgerIngredientStyles['burger-ingredient__item']}`}>
          <img
            alt={`Изображение ингредиента ${this.name}`}
            src={this.image}
            className={`${burgerIngredientStyles['burger-ingredient__image']} pr-4 pl-4`}
          ></img>
          <div className={`${burgerIngredientStyles['burger-ingredient__price-container']} pt-1 pb-1`}>
            <p className={`${burgerIngredientStyles['burger-ingredient__price']} text text_type_digits-default pr-2`}>{this.price}</p>
            <CurrencyIcon />
          </div>
          <figcaption className={`${burgerIngredientStyles['burger-ingredient__name']} text text_type_main-default`}>
            {this.name}
          </figcaption>
          <Counter count={1} />
        </figure>
      </li>
    );
  }
}

export default BurgerIngredient;
