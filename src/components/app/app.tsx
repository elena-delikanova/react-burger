import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import AppHeader from '../app-header/app-header';
import AppBody from '../app-body/app-body';
import styles from './app.module.css';
import { IgredientsContext } from '../../context/igredients-сontext';
import Loader from '../loader/loader';
import Modal from '../modal/modal';
import { api } from '../api';
import { getIngredients } from '../../services/reducers/burger';

const App = () => {
    const dispatch = useAppDispatch();
    const { ingredientsRequest, ingredientsFailed } = useAppSelector(state => state.burger);

    /*const closeErrorModal = () => {
        setState({ ...state, isErrorModalOpen: false });
    };*/

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    // const { ingredients, isLoading, hasError, isErrorModalOpen } = state;

    /* return (
        <React.Fragment>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={styles.app}>
                    <AppHeader />
                    {hasError && isErrorModalOpen ? (
                        <Modal header={'Ошибка!'} onClose={closeErrorModal}>
                            <p className="text text_type_main-default pt-4">Попробуйте обновить страницу.</p>
                        </Modal>
                    ) : hasError ? (
                        ''
                    ) : (
                        <IgredientsContext.Provider value={ingredients}>
                            <AppBody/>
                        </IgredientsContext.Provider>
                    )}
                </div>
            )}
        </React.Fragment>
    ); */
    return (
        <div className={styles.app}>
            <AppHeader />
            <AppBody/>
        </div>
    )
};

export default App;
