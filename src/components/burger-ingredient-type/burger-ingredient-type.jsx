import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import burgerIngredientTypeStyles from './burger-ingredient-type.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Modal from '../modal/modal';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import { IgredientsContext } from '../../context/igredients-сontext';
import { nanoid } from 'nanoid';

const BurgerIngredientType = (props) => {
    const ingredients = useContext(IgredientsContext);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const { type, typeName } = props;
    const ingredientClickHandler = (event, selectedIngredient) => {
        event.stopPropagation();
        setSelectedIngredient(selectedIngredient);
    };
    const closeIngredientCard = () => {
        setSelectedIngredient(null);
    };
    return (
        <>
            <li>
                <h3 className="text text_type_main-medium">{typeName}</h3>
                <ul className={`${burgerIngredientTypeStyles['burger-ingredient-type__list']} pt-6 pb-10 pr-4 pl-4`}>
                    {ingredients
                        .filter((ingredient) => {
                            return ingredient.type === type;
                        })
                        .map((ingredient) => {
                            return (
                                <BurgerIngredient
                                    key={ingredient._id}
                                    data={ingredient}
                                    onClick={ingredientClickHandler}
                                ></BurgerIngredient>
                            );
                        })}
                </ul>
            </li>
            {selectedIngredient && (
                <Modal header="Детали ингредиента" onClose={closeIngredientCard}>
                    <BurgerIngredientCard ingredient={selectedIngredient} />
                </Modal>
            )}
        </>
    );
};

BurgerIngredientType.propTypes = {
    type: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
};

export default BurgerIngredientType;
