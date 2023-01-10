import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import { ingredients } from '../../utils/data';
import appBodyStyles from './app-body.module.css';

const AppBody = () => {
    const selectedIngredient = ingredients[0];
    return (
        <main className={`${appBodyStyles.appBody} pr-5 pl-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
            <Modal header="Детали ингредиента">
                <BurgerIngredientCard ingredient={selectedIngredient}/>
            </Modal>
        </main>
    );
};

export default AppBody;
