import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import totalPriceStyles from './total-price.module.css';

const TotalPrice = ({ totalPrice }: { totalPrice: number }) => {
    return (
        <div className={`${totalPriceStyles['total-price-container']} pr-10`}>
            <p className={`text text_type_digits-medium pr-2`}>{totalPrice}</p>
            <CurrencyIcon type="primary" />
        </div>
    );
};

export default TotalPrice;
