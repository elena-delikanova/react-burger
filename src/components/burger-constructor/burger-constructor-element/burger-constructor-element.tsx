import { useAppDispatch } from '../../../services/store';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient, moveIngredient } from '../../../services/reducers/burger';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import styles from './burger-constructor-element.module.css';
import { useRef } from 'react';
import { useAppSelector } from '../../../services/store';

const BurgerConstructorElement = ({
    ingredient,
    isLocked = false,
    text,
    extraClass,
    type,
}: {
    ingredient: ingredient;
    isLocked?: boolean;
    text?: string;
    extraClass?: string;
    type?: 'top' | 'bottom';
}) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);
    const addedIngredients: ingredient[] = useAppSelector((state) => state.burger.addedIngredients);
    const currentIndex = addedIngredients.findIndex((addedIngredient) => {
        return addedIngredient.uniqueId === ingredient.uniqueId;
    });
    const { uniqueId, name, price, image } = ingredient;
    const [, dragRef] = useDrag(() => ({
        type: 'addedIngredient',
        item: { index: currentIndex },
        collect: (monitor) => ({
            isDragged: monitor.isDragging(),
        }),
    }));

    const [, dropTarget] = useDrop({
        accept: 'addedIngredient',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const { index: draggedIndex } = item as { index: number };
            const hoveredIndex = currentIndex;
            if (draggedIndex === currentIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (draggedIndex < hoveredIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (draggedIndex > hoveredIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dispatch(moveIngredient([draggedIndex, hoveredIndex]));
            (item as { index: number }).index = hoveredIndex;
        },
    });
    dragRef(dropTarget(ref));
    return (
        <div className={`${styles['burger-constructor-element']}`} ref={!isLocked ? ref : null}>
            {!isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                key={uniqueId}
                text={text || name}
                price={price}
                thumbnail={image}
                extraClass={extraClass}
                isLocked={isLocked}
                type={type}
                handleClose={
                    !isLocked
                        ? () => {
                              dispatch(removeIngredient(ingredient));
                          }
                        : undefined
                }
            />
        </div>
    );
};

export default BurgerConstructorElement;
