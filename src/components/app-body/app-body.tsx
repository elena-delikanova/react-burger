import { BrowserRouter, Routes, Route } from 'react-router-dom';

import cs from 'classnames';

import HomePage from '../../pages/home';

import styles from './app-body.module.css';


const AppBody = () => {
    return (
        <main className={cs(styles.appBody, 'pr-5 pl-5')}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default AppBody;
