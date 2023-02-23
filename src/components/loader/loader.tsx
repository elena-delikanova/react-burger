import cs from 'classnames';

import styles from './loader.module.css';

const Loader = () => {
    return (
        <div className={cs(styles['loader'])}>
            <div className={cs(styles['loader__inner'])} />
            <div className={cs(styles['loader__inner'])} />
            <div className={cs(styles['loader__inner'])} />
            <div className={cs(styles['loader__inner'])} />
        </div>
    );
};

export default Loader;
