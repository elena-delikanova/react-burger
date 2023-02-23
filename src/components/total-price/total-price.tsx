import cs from 'classnames';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector } from '../../services/store';

import styles from './total-price.module.css';

const TotalPrice = () => {
    const orderPrice = useAppSelector((state) => state.burger.orderPrice);
    return (
        <div className={cs(styles['total-price-container'], 'pr-10')}>
            <p className={cs('text text_type_digits-medium pr-2')}>{orderPrice}</p>
            <CurrencyIcon type="primary" />
        </div>
    );
};

export default TotalPrice;
