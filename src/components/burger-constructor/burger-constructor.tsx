import { useState, useReducer } from 'react';
import { useAppSelector } from '../../services/store';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { api } from '../api';
import TotalPrice from '../total-price/total-price';
import { TotalPriceContext } from '../../context/total-price-context';

const totalPriceReducer = (state: { totalPrice: number }, action: { type: string; changedAmount: number }) => {
    switch (action.type) {
        case 'add':
            return { totalPrice: state.totalPrice + action.changedAmount };
        case 'remove':
            return { totalPrice: state.totalPrice - action.changedAmount };
        default:
            return state;
    }
};

const selectedIngredientsReducer = (
    state: { ingredients: ingredient[] },
    action: { type: string; ingredient: ingredient },
) => {
    switch (action.type) {
        case 'add':
            return { ingredients: state.ingredients.concat([action.ingredient]) };
        case 'delete':
            return {
                ingredients: state.ingredients.filter((ingredient) => {
                    return ingredient._id !== action.ingredient._id;
                }),
            };
        default:
            return state;
    }
};
const BurgerConstructor = () => {
    const { ingredients } : { ingredients: ingredient[]} = useAppSelector(state => state.burger);
    const initialState: { isOrderNeedsBeShown: boolean; orderId: null | number } = {
        isOrderNeedsBeShown: false,
        orderId: null,
    };
    const [state, setState] = useState(initialState);
    // КОСТЫЛИ ЧИСТО ДЛЯ ВЕРСТКИ, ПОКА НЕТ РЕАЛЬНЫХ ДАННЫХ
    const bun = ingredients.find((ingredient) => {
        return ingredient.type === 'bun';
    });
    const selectedIngredients = ingredients.filter((ingredient) => {
        return ingredient.type !== 'bun';
    });
    const allIngredients = (bun ? [bun] : []).concat(selectedIngredients);
    const [selectedIngredientsState, selectedIngredientsDispatcher] = useReducer(
        selectedIngredientsReducer,
        { ingredients: allIngredients },
    );
    const initialTotalPrice =
        (bun ? bun.price * 2 : 0) +
        ingredients.reduce((price, ingredient) => {
            if (ingredient.type !== 'bun') {
                price += ingredient.price;
            }
            return price;
        }, 0);
    const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, { totalPrice: initialTotalPrice });

    const sendOrderHandler = () => {
        const ingredients = (bun ? [bun._id] : []).concat(
            selectedIngredients.map((ingredient) => {
                return ingredient._id;
            }),
        );
        api.setOrder({ ingredientIdentifiers: ingredients })
            .then((data: orderSuccessServiceResponse) => {
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
    const deleteIngredient = (id: string) => {
        const ingredientToDelete = ingredients.find((ingredient) => {
            return ingredient._id === id;
        });
        if (ingredientToDelete) {
            selectedIngredientsDispatcher({ type: 'delete', ingredient: ingredientToDelete });
            totalPriceDispatcher({ changedAmount: ingredientToDelete.price, type: 'remove' });
        }
    };

    return (
        <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
            <section className={`${styles['burger-constructor']} pt-25 pb-10 pl-10`}>
                <section className={`${styles['burger-constructor__list']} pb-10`}>
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
                        {selectedIngredientsState.ingredients.map((ingredient, index) => {
                            return (
                                <li
                                    className={`${styles['burger-constructor__filling']} ${
                                        index === 0 ? '' : 'pt-4'
                                    } pr-2`}
                                    key={ingredient._id}
                                >
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        key={ingredient._id}
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        extraClass="ml-2"
                                        handleClose={() => {
                                            deleteIngredient(ingredient._id);
                                        }}
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
                <section className={`${styles['burger-constructor__total']} pr-4`}>
                    <TotalPrice />
                    <Button htmlType="button" type="primary" size="large" onClick={sendOrderHandler}>
                        Оформить заказ
                    </Button>
                </section>
                {state.isOrderNeedsBeShown && state.orderId && (
                    <Modal onClose={closeOrderDetails}>
                        <OrderDetails orderId={state.orderId} />
                    </Modal>
                )}
            </section>
        </TotalPriceContext.Provider>
    );
};

export default BurgerConstructor;
