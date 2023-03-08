import cs from 'classnames';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import MenuItem from './menu-item/menu-item';

import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={cs(styles.appHeader, 'text text_type_main-default mt-4 mb-4 mr-10 ml-10')}>
            <nav className={cs(styles.appHeader__menu)}>
                <ul className={cs(styles['appHeader__menu-items'])}>
                    <MenuItem
                        className={cs(styles['appHeader__menu-item'], 'pt-4 pb-4 pr-5 pl-5 mr-2')}
                        text="Конструктор"
                        icon={BurgerIcon}
                        isActive
                    />
                    <MenuItem
                        className={cs(styles['appHeader__menu-item'], 'pt-4 pb-4 pr-5 pl-5')}
                        text="Лента заказов"
                        icon={ListIcon}
                    />
                    <li className={styles['appHeader__logo']}>
                        <Logo />
                    </li>
                    <MenuItem
                        className={cs(styles['appHeader__menu-item'], 'pt-4 pb-4 pr-5 pl-5')}
                        text="Личный кабинет"
                        icon={ProfileIcon}
                    />
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
