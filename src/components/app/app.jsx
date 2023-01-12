import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import AppBody from '../app-body/app-body';
import appStyles from './app.module.css';
import { Context } from '../../context/context';
import { API_URL } from '../../utils/constants';

const App = () => {
    const [state, setState] = useState({
        ingredients: [],
        isLoading: false,
        hasError: false,
    });

    useEffect(() => {
        setState({ ...state, hasError: false, isLoading: true });
        fetch(`${API_URL}/api/ingredients`)
            .then((res) => res.json())
            .then((data) => setState({ ...state, ingredients: data.data, isLoading: false }))
            .catch((error) => {
                console.log(error);
                setState({ ...state, hasError: true, isLoading: false });
            });
    }, []);

    const { ingredients, isLoading, hasError } = state;

    return (
        <Context.Provider value={ingredients}>
            <div className={appStyles.app}>
                <AppHeader />
                <AppBody />
            </div>
        </Context.Provider>
    );
};

export default App;
