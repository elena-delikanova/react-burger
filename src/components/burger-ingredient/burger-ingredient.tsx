import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import { useAppSelector } from '../../services/store';

/*const [{ opacity }, drag, preview] = useDrag(() => ({
    type: ItemTypes.BOX,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }))

  return (
    <>
      <DragPreviewImage connect={preview} src={boxImage} />
      <div ref={drag} style={{ ...style, opacity }}>
        Drag me to see an image
      </div>
    </>
  )
*/
const BurgerIngredient = ({
    data,
    onClick,
}: {
    data: ingredient;
    onClick: (event: React.MouseEvent, selectedIngredient: ingredient) => void;
}) => {
    const addedIngredients: ingredient[] = useAppSelector((state) => state.burger.addedIngredients);
    const [{ isDragged }, dragRef, preview] = useDrag(() => ({
        type: 'ingredient',
        item: data,
        collect: (monitor) => ({
            isDragged: monitor.isDragging(),
        }),
    }));
    const { image, name, price, _id } = data;
    const counterOfSuchIngredients = addedIngredients.filter((addedIngredient) => {
        return addedIngredient._id === _id;
    }).length;
    return (
        <React.Fragment>
            <li
                className={`${styles['burger-ingredient__card']} ${isDragged ? 'burger-ingredient__card_dragged' : ''}`}
                ref={dragRef}
                onClick={(event) => onClick(event, data)}
            >
                <DragPreviewImage connect={preview} src={image} />
                <figure className={`${styles['burger-ingredient__item']}`}>
                    <img
                        alt={`Изображение ингредиента ${name}`}
                        src={image}
                        className={`${styles['burger-ingredient__image']} pr-4 pl-4`}
                    />
                    <div className={`${styles['burger-ingredient__price-container']} pt-1 pb-1`}>
                        <p className={`${styles['burger-ingredient__price']} text text_type_digits-default pr-2`}>
                            {price}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <figcaption className={`${styles['burger-ingredient__name']} text text_type_main-default`}>
                        {name}
                    </figcaption>
                    <Counter count={counterOfSuchIngredients} />
                </figure>
            </li>
        </React.Fragment>
    );
};

BurgerIngredient.propTypes = {
    data: PropTypes.shape(IngredientType).isRequired,
};

export default BurgerIngredient;
