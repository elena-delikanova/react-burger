import { useContext } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import OrderDetails from '../order-details/order-details';
import { Context } from '../../context/context';
import appBodyStyles from './app-body.module.css';

const AppBody = () => {
    const ingredients = useContext(Context);
    const selectedIngredient = ingredients[0];
    // const selectedIngredient = null;
    // const orderId = '034536';
    let orderId;
    return (
        <main className={`${appBodyStyles.appBody} pr-5 pl-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
            {selectedIngredient && (
                <Modal header="Детали ингредиента">
                    <BurgerIngredientCard ingredient={selectedIngredient} />
                </Modal>
            )}
            {orderId && (
                <Modal>
                    <OrderDetails orderId={orderId} />
                </Modal>
            )}
        </main>
    );
};

export default AppBody;
