import PropTypes from 'prop-types';
import burgerIngredientTypeStyles from './burgerIngredientType.module.css';
import BurgerIngredient from '../burgerIngredient/burgerIngredient';
import { ingredients } from '../../utils/data';

const BurgerIngredientType = (props) => {
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
