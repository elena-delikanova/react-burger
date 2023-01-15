import { IngredientType } from '../../utils/types';
import burgerIngredientCardStyles from './burger-ingredient-card.module.css';
import PropTypes from 'prop-types';

const BurgerIngredientDetailedInfo = (props) => {
    const { name, image_large, proteins, fat, carbohydrates, calories } = props.ingredient;
    return (
        <div>
            <figure className={`${burgerIngredientCardStyles['burger-ingredient-card__illustration']} pb-8`}>
                <img
                    alt={`Изображение ингредиента ${name}`}
                    src={image_large}
                    className={`${burgerIngredientCardStyles['burger-ingredient-card__image']} pb-4`}
                ></img>
                <figcaption
                    className={`${burgerIngredientCardStyles['burger-ingredient-card__caption']} text text_type_main-medium`}
                >
                    {name}
                </figcaption>
            </figure>
            <table className={`${burgerIngredientCardStyles['burger-ingredient-card__nutrients']}`} cols="4">
                <thead className={`pb-2`}>
                    <tr>
                        <th className={`text text_type_main-default pr-5`}>Калории,ккал</th>
                        <th className={`text text_type_main-default pr-5`}>Белки, г</th>
                        <th className={`text text_type_main-default pr-5`}>Жиры, г</th>
                        <th className={`text text_type_main-default`}>Углеводы, г</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={`text text_type_digits-default`}>{calories}</td>
                        <td className={`text text_type_digits-default`}>{proteins}</td>
                        <td className={`text text_type_digits-default`}>{fat}</td>
                        <td className={`text text_type_digits-default`}>{carbohydrates}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

BurgerIngredientDetailedInfo.propTypes = {
    ingredient: PropTypes.shape(IngredientType).isRequired,
};

export default BurgerIngredientDetailedInfo;
