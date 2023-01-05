import React from 'react';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import appBodyStyles from './appBody.module.css';

class AppBody extends React.Component {
    render() {
        return (
            <main className={`${appBodyStyles.appBody} pr-5 pl-5`}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        )
    }
}

export default AppBody;
