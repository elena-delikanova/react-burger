import { MutableRefObject, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import cs from 'classnames';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientType from '../burger-ingredient-type/burger-ingredient-type';

import { BUN_TYPE, MAIN_TYPE, SAUCE_TYPE, BUN_TYPE_NAME, MAIN_TYPE_NAME, SAUCE_TYPE_NAME } from '../../utils/constants';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const bunTabRefForScroll = useRef<HTMLLIElement>(null);
    const [bunTabRefForInView, bunsInView] = useInView({
        threshold: 0.2,
        initialInView: true,
    });

    const [sauceTabRefForInView, sausesInView] = useInView({
        threshold: 0.2,
    });
    const [mainTabRefForInView, mainsInView] = useInView({
        threshold: 0.2,
    });
    const getCurrentTab = () => {
        if (bunsInView) {
            return BUN_TYPE;
        } else if (sausesInView) {
            return SAUCE_TYPE;
        } else if (mainsInView) {
            return MAIN_TYPE;
        }
    };
    return (
        <section className={cs(styles['burger-ingredients'], 'pt-10 pb-10')}>
            <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
            <nav className={cs(styles['burger-ingredients__menu'], 'pt-5 pb-10')}>
                <Tab
                    value={BUN_TYPE}
                    active={getCurrentTab() === BUN_TYPE}
                    onClick={() => {
                        bunTabRefForScroll.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    {BUN_TYPE_NAME}
                </Tab>

                <Tab value={SAUCE_TYPE} active={getCurrentTab() === SAUCE_TYPE} onClick={() => {}}>
                    {SAUCE_TYPE_NAME}
                </Tab>
                <Tab value={MAIN_TYPE} active={getCurrentTab() === MAIN_TYPE} onClick={() => {}}>
                    {MAIN_TYPE_NAME}
                </Tab>
            </nav>
            <ul className={cs(styles['burger-ingredients__types-list'])}>
                <BurgerIngredientType
                    type={BUN_TYPE}
                    typeName={BUN_TYPE_NAME}
                    ref={(element) => {
                        (bunTabRefForScroll as MutableRefObject<HTMLLIElement>).current = element as HTMLLIElement;
                        return bunTabRefForInView(element);
                    }}
                />
                <BurgerIngredientType type={SAUCE_TYPE} typeName={SAUCE_TYPE_NAME} ref={sauceTabRefForInView} />
                <BurgerIngredientType type={MAIN_TYPE} typeName={MAIN_TYPE_NAME} ref={mainTabRefForInView} />
            </ul>
        </section>
    );
};

export default BurgerIngredients;
