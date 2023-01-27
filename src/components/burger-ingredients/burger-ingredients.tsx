import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientType from '../burger-ingredient-type/burger-ingredient-type';

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun');
    return (
        <section className={`${burgerIngredientsStyles['burger-ingredients']} pt-10 pb-10`}>
            <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
            <nav className={`${burgerIngredientsStyles['burger-ingredients__menu']} pt-5 pb-10`}>
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
                <BurgerIngredientType type="bun" typeName="Булки" />
                <BurgerIngredientType type="sauce" typeName="Соусы" />
                <BurgerIngredientType type="main" typeName="Начинки" />
            </ul>
        </section>
    );
};

export default BurgerIngredients;
