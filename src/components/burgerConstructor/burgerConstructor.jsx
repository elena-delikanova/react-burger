import burgerConstructorStyles from './burgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredients } from '../../utils/data';

const BurgerConstructor = () => {
    // КОСТЫЛИ ЧИСТО ДЛЯ ВЕРСТКИ, ПОКА НЕТ РЕАЛЬНЫХ ДАННЫХ
    const bun = ingredients.find((ingredient) => {
        return ingredient.type === 'bun';
    });
    const totalPrice =
        bun.price +
        ingredients.reduce((price, ingredient) => {
            if (ingredient.type !== 'bun') {
                price += ingredient.price;
            }
            return price;
        }, 0);
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
                    {ingredients
                        .filter((ingredient) => {
                            return ingredient.type !== 'bun';
                        })
                        .map((ingredient, index) => {
                            return (
                                <li
                                    className={`${burgerConstructorStyles['burger-constructor__filling']} ${
                                        index === 0 ? '' : 'pt-4'
                                    } pr-2`}
                                >
                                    <DragIcon />
                                    <ConstructorElement
                                        key={index}
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
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
};

export default BurgerConstructor;
