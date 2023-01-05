import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import appBodyStyles from './appBody.module.css';

const AppBody = () => {
    return (
        <main className={`${appBodyStyles.appBody} pr-5 pl-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    );
};

export default AppBody;
