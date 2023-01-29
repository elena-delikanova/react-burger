import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredient-type.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Modal from '../modal/modal';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import { IgredientsContext } from '../../context/igredients-сontext';

const BurgerIngredientType = ({ type, typeName }: { type: string; typeName: string }) => {
    const ingredients = useContext(IgredientsContext);
    const [selectedIngredient, setSelectedIngredient] = useState<null | ingredient>(null);
    const ingredientClickHandler = (event: React.MouseEvent, selectedIngredient: ingredient) => {
        event.stopPropagation();
        setSelectedIngredient(selectedIngredient);
    };
    const closeIngredientCard = () => {
        setSelectedIngredient(null);
    };
    const ingredientsWithSelectedType = useMemo(() => {
        return ingredients.filter((ingredient: ingredient) => {
            return ingredient.type === type;
        });
    }, [ingredients, type]);
    return (
        <React.Fragment>
            <li>
                <h3 className="text text_type_main-medium">{typeName}</h3>
                <ul className={`${styles['burger-ingredient-type__list']} pt-6 pb-10 pr-4 pl-4`}>
                    {ingredientsWithSelectedType.map((ingredient: ingredient) => {
                        return (
                            <React.Fragment key={ingredient._id}>
                                <BurgerIngredient data={ingredient} onClick={ingredientClickHandler} />
                            </React.Fragment>
                        );
                    })}
                </ul>
            </li>
            {selectedIngredient && (
                <Modal header="Детали ингредиента" onClose={closeIngredientCard}>
                    <BurgerIngredientCard ingredient={selectedIngredient} />
                </Modal>
            )}
        </React.Fragment>
    );
};

BurgerIngredientType.propTypes = {
    type: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
};

export default BurgerIngredientType;
