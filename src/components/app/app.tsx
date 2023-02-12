import React, { useEffect } from 'react';
import cs from 'classnames';

import AppHeader from '../app-header/app-header';
import AppBody from '../app-body/app-body';
import Loader from '../loader/loader';
import Modal from '../modal/modal';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { getIngredients } from '../../services/reducers/burger';
import { setIngredientsRequestStatusIdle } from '../../services/reducers/burger';

import styles from './app.module.css';

const App = () => {
    const dispatch = useAppDispatch();
    const { ingredientsRequestStatus } = useAppSelector((state) => state.burger);

    const closeErrorModal = () => {
        dispatch(setIngredientsRequestStatusIdle());
    };

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <React.Fragment>
            {ingredientsRequestStatus === 'pending' ? (
                <Loader />
            ) : (
                <div className={cs(styles.app)}>
                    <AppHeader />
                    {ingredientsRequestStatus === 'rejected' ? (
                        <Modal header={'Ошибка!'} onClose={closeErrorModal}>
                            <p className={cs('text text_type_main-default pt-4')}>Попробуйте обновить страницу.</p>
                        </Modal>
                    ) : ingredientsRequestStatus === 'idle' ? (
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
