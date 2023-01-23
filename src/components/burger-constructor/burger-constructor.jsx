import { useContext, useState } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IgredientsContext } from '../../context/igredients-сontext';
import { nanoid } from 'nanoid';

const BurgerConstructor = ({ api }) => {
    const ingredients = useContext(IgredientsContext);
    const [state, setState] = useState({
        isOrderNeedsBeShown: false,
        orderId: null,
    });
    // КОСТЫЛИ ЧИСТО ДЛЯ ВЕРСТКИ, ПОКА НЕТ РЕАЛЬНЫХ ДАННЫХ
    const bun = ingredients.find((ingredient) => {
        return ingredient.type === 'bun';
    });
    const selectedIngredients = ingredients.filter((ingredient) => {
        return ingredient.type !== 'bun';
    });
    const totalPrice =
        bun &&
        bun.price +
            ingredients.reduce((price, ingredient) => {
                if (ingredient.type !== 'bun') {
                    price += ingredient.price;
                }
                return price;
            }, 0);

    const sendOrderHandler = () => {
        const ingredients = [bun._id].concat(
            selectedIngredients.map((ingredient) => {
                return ingredient._id;
            }),
        );
        api.setOrder({ ingredients })
            .then((data) => {
                console.log(data);
                setState({ ...state, orderId: data.order.number, isOrderNeedsBeShown: true });
            })
            .catch((error) => {
                console.log(error);
            });

    };
    const closeOrderDetails = () => {
        setState({ ...state, isOrderNeedsBeShown: false });
    };

    return (
        <section className={`${burgerConstructorStyles['burger-constructor']} pt-25 pb-10 pl-10`}>
            <section className={`${burgerConstructorStyles['burger-constructor__list']} pb-10`}>
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
                <ul className={`${burgerConstructorStyles['burger-constructor__fillings']}`}>
                    {selectedIngredients.map((ingredient, index) => {
                        return (
                            <li
                                className={`${burgerConstructorStyles['burger-constructor__filling']} ${
                                    index === 0 ? '' : 'pt-4'
                                } pr-2`}
                                key={ingredient._id}
                            >
                                <DragIcon />
                                <ConstructorElement
                                    key={ingredient._id}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    extraClass="ml-2"
                                />
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
            <section className={`${burgerConstructorStyles['burger-constructor__total']} pr-4`}>
                <div className={`${burgerConstructorStyles['burger-constructor__amount-container']} pr-10`}>
                    <p className={`text text_type_digits-medium pr-2`}>{totalPrice}</p>
                    <CurrencyIcon />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={sendOrderHandler}>
                    Оформить заказ
                </Button>
            </section>
            {state.isOrderNeedsBeShown && (
                <Modal onClose={closeOrderDetails}>
                    <OrderDetails orderId={state.orderId} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;
