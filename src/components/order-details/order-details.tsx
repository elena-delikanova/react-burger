import PropTypes from 'prop-types';
import cs from 'classnames';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-details.module.css';

const OrderDetails = ({ orderId } : { orderId: number }) => {
    return (
        <div className={cs(styles['order-details'], 'pt-4 pb-15')}>
            <div className={cs(styles['order-details__id-container'], 'pb-8')}>
                <p className={`text text_type_digits-large`}>{orderId}</p>
            </div>
            <p className={cs(styles['order-details__id-title'], 'text text_type_main-default pb-15')}>
                Идентификатор заказа
            </p>
            <div className={cs(styles['order-details__check-mark-container'])}>
                <CheckMarkIcon type="primary"/>
            </div>
            <p className={cs('text text_type_main-small pt-15 pb-2')}>Ваш заказ начали готовить</p>
            <p className={cs('text text_type_main-small text_color_inactive')}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

OrderDetails.propTypes = {
    orderId: PropTypes.number.isRequired,
};

export default OrderDetails;
