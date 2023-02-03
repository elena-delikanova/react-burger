import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import AppHeader from '../app-header/app-header';
import AppBody from '../app-body/app-body';
import styles from './app.module.css';
import Loader from '../loader/loader';
import Modal from '../modal/modal';
import { getIngredients } from '../../services/reducers/burger';

const App = () => {
    const dispatch = useAppDispatch();
    const { ingredientsRequest, ingredientsFailed } = useAppSelector((state) => state.burger);
    const [isErrorModalOpen, setIsErrorModal] = useState(false);

    const closeErrorModal = () => {
        setIsErrorModal(false);
    };

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <React.Fragment>
            {ingredientsRequest ? (
                <Loader />
            ) : (
                <div className={styles.app}>
                    <AppHeader />
                    {ingredientsFailed && isErrorModalOpen ? (
                        <Modal header={'Ошибка!'} onClose={closeErrorModal}>
                            <p className="text text_type_main-default pt-4">Попробуйте обновить страницу.</p>
                        </Modal>
                    ) : ingredientsFailed ? (
                        ''
                    ) : (
                        <AppBody />
                    )}
                </div>
            )}
        </React.Fragment>
    );
};

export default App;
