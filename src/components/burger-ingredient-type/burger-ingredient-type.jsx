import { useContext } from 'react';
import PropTypes from 'prop-types';
import burgerIngredientTypeStyles from './burger-ingredient-type.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { Context } from '../../context/context';

const BurgerIngredientType = (props) => {
    const ingredients = useContext(Context);
    const { type, typeName } = props;
    return (
        <li>
            <h3 className="text text_type_main-medium">{typeName}</h3>
            <ul className={`${burgerIngredientTypeStyles['burger-ingredient-type__list']} pt-6 pb-10 pr-4 pl-4`}>
                {ingredients
                    .filter((ingredient) => {
                        return ingredient.type === type;
                    })
                    .map((ingredient) => {
                        return <BurgerIngredient key={ingredient._id} data={ingredient}></BurgerIngredient>;
                    })}
            </ul>
        </li>
    );
};

BurgerIngredientType.propTypes = {
    type: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
}

export default BurgerIngredientType;
