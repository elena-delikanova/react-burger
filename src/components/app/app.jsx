import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import AppBody from '../app-body/app-body';
import appStyles from './app.module.css';
import { IgredientsContext } from '../../context/igredients-сontext';
import { API_URL, API_HEADERS } from '../../utils/constants';
import Api from '../api/api';
import Loader from '../loader/loader';
import Modal from '../modal/modal';

const api = new Api({ baseUrl: API_URL, headers: API_HEADERS });
const App = () => {
    const [state, setState] = useState({
        ingredients: [],
        isLoading: false,
        hasError: false,
        isErrorModalOpen: false,
    });

    const closeErrorModal = () => {
        setState({ ...state, isErrorModalOpen: false });
    };

    useEffect(() => {
        setState({ ...state, hasError: false, isLoading: true });
        api.getIngredients()
            .then((data) => setState({ ...state, ingredients: data.data, isLoading: false }))
            .catch((error) => {
                console.log(error);
                setState({ ...state, hasError: true, isLoading: false, isErrorModalOpen: true });
            });
    }, []);

    const { ingredients, isLoading, hasError, isErrorModalOpen } = state;

    return (
        <IgredientsContext.Provider value={ingredients}>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={appStyles.app}>
                    <AppHeader />
                    {hasError && isErrorModalOpen ? (
                        <Modal header={'Ошибка!'} onClose={closeErrorModal}>
                            <p className="text text_type_main-default pt-4">Попробуйте обновить страницу.</p>
                        </Modal>
                    ) : hasError ? (
                        ''
                    ) : (
                        <AppBody api={api}/>
                    )}
                </div>
            )}
        </IgredientsContext.Provider>
    );
};

export default App;
