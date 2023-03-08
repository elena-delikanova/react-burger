import { BrowserRouter, Routes, Route } from 'react-router-dom';

import cs from 'classnames';

import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';

import styles from './app-body.module.css';

const AppBody = () => {
    return (
        <main className={cs('pr-5 pl-5', styles['appBody'])}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default AppBody;
