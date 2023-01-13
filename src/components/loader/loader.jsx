import loaderStyles from './loader.module.css';

const Loader = () => {
    return (
        <div className={`${loaderStyles['loader']}`}>
            <div className={`${loaderStyles['loader__inner']}`}></div>
            <div className={`${loaderStyles['loader__inner']}`}></div>
            <div className={`${loaderStyles['loader__inner']}`}></div>
            <div className={`${loaderStyles['loader__inner']}`}></div>
        </div>
    );
};

export default Loader;
