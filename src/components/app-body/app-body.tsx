
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app-body.module.css';

const AppBody = () => {

    return (
        <main className={`${styles.appBody} pr-5 pl-5`}>
            <BurgerIngredients />
            <BurgerConstructor/>
        </main>
    );
};

export default AppBody;
