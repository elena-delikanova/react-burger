import styles from './loader.module.css';

const Loader = () => {
    return (
        <div className={`${styles['loader']}`}>
            <div className={`${styles['loader__inner']}`}/>
            <div className={`${styles['loader__inner']}`}/>
            <div className={`${styles['loader__inner']}`}/>
            <div className={`${styles['loader__inner']}`}/>
        </div>
    );
};

export default Loader;
