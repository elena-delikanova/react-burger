
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app-body.module.css';
import Api from '../api/api';


const AppBody = ({ api } : {api: Api}) => {

    return (
        <main className={`${styles.appBody} pr-5 pl-5`}>
            <BurgerIngredients />
            <BurgerConstructor api={api} />
        </main>
    );
};

export default AppBody;
