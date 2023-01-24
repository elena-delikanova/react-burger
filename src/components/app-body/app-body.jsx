
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appBodyStyles from './app-body.module.css';


const AppBody = ({ api }) => {

    return (
        <main className={`${appBodyStyles.appBody} pr-5 pl-5`}>
            <BurgerIngredients />
            <BurgerConstructor api={api} />
        </main>
    );
};

export default AppBody;
