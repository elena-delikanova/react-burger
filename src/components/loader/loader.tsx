import loaderStyles from './loader.module.css';

const Loader = () => {
    return (
        <div className={`${loaderStyles['loader']}`}>
            <div className={`${loaderStyles['loader__inner']}`}/>
            <div className={`${loaderStyles['loader__inner']}`}/>
            <div className={`${loaderStyles['loader__inner']}`}/>
            <div className={`${loaderStyles['loader__inner']}`}/>
        </div>
    );
};

export default Loader;
