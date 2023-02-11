import { MutableRefObject, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientType from '../burger-ingredient-type/burger-ingredient-type';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => {
    const bunTabRefForScroll = useRef<HTMLLIElement>(null);
    const [bunTab, inView] = useInView({
        threshold: 0.2,
        initialInView: true,
    });

    const [sauceTab, inView2] = useInView({
        threshold: 0.2,
    });
    const [mainTab, inView3] = useInView({
        threshold: 0.2,
    });
    const getCurrentTab = () => {
        if (inView) {
            return 'bun';
        } else if (inView2) {
            return 'sauce';
        } else if (inView3) {
            return 'main';
        }
    };
    return (
        <section className={`${styles['burger-ingredients']} pt-10 pb-10`}>
            <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
            <nav className={`${styles['burger-ingredients__menu']} pt-5 pb-10`}>
                <Tab
                    value="bun"
                    active={getCurrentTab() === 'bun'}
                    onClick={() => {
                        bunTabRefForScroll.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    Булки
                </Tab>

                <Tab value="sauce" active={getCurrentTab() === 'sauce'} onClick={() => {}}>
                    Соусы
                </Tab>
                <Tab value="main" active={getCurrentTab() === 'main'} onClick={() => {}}>
                    Начинки
                </Tab>
            </nav>
            <ul className={`${styles['burger-ingredients__types-list']}`}>
                <BurgerIngredientType
                    type="bun"
                    typeName="Булки"
                    ref={(element) => {
                        (bunTabRefForScroll as MutableRefObject<HTMLLIElement>).current = element as HTMLLIElement;
                        return bunTab(element);
                    }}
                />
                <BurgerIngredientType type="sauce" typeName="Соусы" ref={sauceTab} />
                <BurgerIngredientType type="main" typeName="Начинки" ref={mainTab} />
            </ul>
        </section>
    );
};

export default BurgerIngredients;
