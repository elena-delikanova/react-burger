import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Modal from '../modal/modal';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';

import { useAppSelector, useAppDispatch } from '../../services/store';
import { MODAL_NAMES } from '../../utils/constants';

import { selectIngredient, resetSelectedIngredient } from '../../services/reducers/burger';

import styles from './burger-ingredient-type.module.css';

const BurgerIngredientType = React.forwardRef<HTMLLIElement, { type: string; typeName: string }>(
    ({ type, typeName }, ref) => {
        const dispatch = useAppDispatch();
        const { ingredients, currentIngredient }: { ingredients: ingredient[]; currentIngredient: ingredient } =
            useAppSelector((state) => state.burger);
        const ingredientClickHandler = (event: React.MouseEvent, selectedIngredient: ingredient) => {
            event.stopPropagation();
            dispatch(selectIngredient(selectedIngredient));
        };
        const closeIngredientCard = () => {
            dispatch(resetSelectedIngredient());
        };
        const ingredientsWithSelectedType = useMemo(() => {
            return ingredients.filter((ingredient: ingredient) => {
                return ingredient.type === type;
            });
        }, [ingredients, type]);
        return (
            <React.Fragment>
                <li ref={ref}>
                    <h3 className={cs('text text_type_main-medium')}>{typeName}</h3>
                    <ul className={cs(styles['burger-ingredient-type__list'], 'pt-6 pb-10 pr-4 pl-4')}>
                        {ingredientsWithSelectedType.map((ingredient: ingredient) => {
                            return (
                                <React.Fragment key={ingredient._id}>
                                    <BurgerIngredient ingredient={ingredient} onClick={ingredientClickHandler} />
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </li>
                {currentIngredient && (
                    <Modal header={MODAL_NAMES.ingredientDetails} onClose={closeIngredientCard}>
                        <BurgerIngredientCard ingredient={currentIngredient} />
                    </Modal>
                )}
            </React.Fragment>
        );
    },
);

BurgerIngredientType.propTypes = {
    type: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
};

export default BurgerIngredientType;
