import PropTypes from 'prop-types';
import cs from 'classnames';

import { IngredientType } from '../../utils/types';

import styles from './burger-ingredient-card.module.css';

const BurgerIngredientDetailedInfo = ({ ingredient }: { ingredient: ingredient }) => {
    const { name, image_large, proteins, fat, carbohydrates, calories } = ingredient;
    return (
        <div>
            <figure className={cs(styles['burger-ingredient-card__illustration'], 'pb-8')}>
                <img
                    alt={`Изображение ингредиента ${name}`}
                    src={image_large}
                    className={cs(styles['burger-ingredient-card__image'], 'pb-4')}
                />
                <figcaption className={cs(styles['burger-ingredient-card__caption'], 'text text_type_main-medium')}>
                    {name}
                </figcaption>
            </figure>
            <table className={cs(styles['burger-ingredient-card__nutrients'])}>
                <thead className={cs('pb-2')}>
                    <tr>
                        <th className={cs('text text_type_main-default pr-5')}>Калории,ккал</th>
                        <th className={cs('text_type_main-default pr-5')}>Белки, г</th>
                        <th className={cs('text_type_main-default pr-5')}>Жиры, г</th>
                        <th className={cs('text_type_main-default')}>Углеводы, г</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={cs('text_type_digits-default')}>{calories}</td>
                        <td className={cs('text_type_digits-default')}>{proteins}</td>
                        <td className={cs('text_type_digits-default')}>{fat}</td>
                        <td className={cs('text_type_digits-default')}>{carbohydrates}</td>
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
