import { useAppDispatch } from '../../services/store';
import { useAppSelector } from '../../services/store';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../total-price/total-price';
import { addIngredient, setOrder } from '../../services/reducers/burger';
import { resetOrderDetails } from '../../services/reducers/burger';
import { BUN_TYPE } from '../../utils/constants';
import { useDrop } from 'react-dnd';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import { useCallback } from 'react';

const BurgerConstructor = () => {
    const dispatch = useAppDispatch();
    const {
        currentOrder,
        orderFailed,
        addedIngredients,
    }: {
        ingredients: ingredient[];
        currentOrder: null | orderSuccessServiceResponse;
        orderFailed: boolean;
        addedIngredients: ingredient[];
    } = useAppSelector((state) => state.burger);

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(ingredient: ingredient) {
            dispatch(addIngredient(ingredient));
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

    const bun = addedIngredients.find((ingredient) => {
        return ingredient.type === BUN_TYPE;
    });
    const otherIngredients = addedIngredients.filter((ingredient) => {
        return ingredient.type !== BUN_TYPE;
    });

    const sendOrderHandler = () => {
        const ingredientIdentifiers = addedIngredients.map((ingredient) => {
            return ingredient._id;
        });
        dispatch(setOrder({ ingredientIdentifiers }));
    };
    const closeOrderDetails = () => {
        dispatch(resetOrderDetails());
    };
    return (
        <section className={`${styles['burger-constructor']} pt-25 pb-10 pl-10`}>
            <section className={`${styles['burger-constructor__list']} pb-10`} ref={dropTarget}>
                {bun && (
                    <div>
                        <ConstructorElement
                            text={`${bun.name} (верх)`}
                            isLocked
                            price={bun.price}
                            thumbnail={bun.image}
                            type="top"
                            extraClass="ml-8 mb-4"
                        />
                    </div>
                )}
                <ul className={`${styles['burger-constructor__fillings']}`}>
                    {otherIngredients.map((ingredient, index) => {
                        return (
                            <li
                                className={`${styles['burger-constructor__filling']} ${index === 0 ? '' : 'pt-4'} pr-2`}
                                key={ingredient.uniqueId}
                            >
                                <BurgerConstructorElement ingredient={ingredient}/>
                            </li>
                        );
                    })}
                </ul>

                {bun && (
                    <div>
                        <ConstructorElement
                            text={`${bun.name} (низ)`}
                            isLocked
                            price={bun.price}
                            thumbnail={bun.image}
                            type="bottom"
                            extraClass="ml-8 mt-4"
                        />
                    </div>
                )}
            </section>
            <section className={`${styles['burger-constructor__total']} pr-4`}>
                <TotalPrice />
                <Button htmlType="button" type="primary" size="large" onClick={sendOrderHandler}>
                    Оформить заказ
                </Button>
            </section>
            {!orderFailed && currentOrder && (
                <Modal onClose={closeOrderDetails}>
                    <OrderDetails orderId={currentOrder.order.number} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;
