import React from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../burgerIngredient/burgerIngredient';
import BurgerIngredientType from '../burgerIngredientType/burgerIngredientType';
import { ingredients } from '../../utils/data';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');
  return (
    <section className={`${burgerIngredientsStyles['burger-ingredients']} pt-10 pb-10`}>
      <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
      <nav className={`${burgerIngredientsStyles['burger-ingredients__menu']} pt-10 pb-5`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <ul className={`${burgerIngredientsStyles['burger-ingredients__types-list']}`}>
        <BurgerIngredientType type='bun' typeName='Булки'/>
        <BurgerIngredientType type='sauce' typeName='Соусы'/>
        <BurgerIngredientType type='main' typeName='Начинки'/>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
