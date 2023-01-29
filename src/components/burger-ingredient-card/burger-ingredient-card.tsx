import { IngredientType } from '../../utils/types';
import styles from './burger-ingredient-card.module.css';
import PropTypes from 'prop-types';

const BurgerIngredientDetailedInfo = ({ ingredient }: { ingredient: ingredient }) => {
    const { name, image_large, proteins, fat, carbohydrates, calories } = ingredient;
    return (
        <div>
            <figure className={`${styles['burger-ingredient-card__illustration']} pb-8`}>
                <img
                    alt={`Изображение ингредиента ${name}`}
                    src={image_large}
                    className={`${styles['burger-ingredient-card__image']} pb-4`}
                />
                <figcaption
                    className={`${styles['burger-ingredient-card__caption']} text text_type_main-medium`}
                >
                    {name}
                </figcaption>
            </figure>
            <table className={`${styles['burger-ingredient-card__nutrients']}`}>
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
