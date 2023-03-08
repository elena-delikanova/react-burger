import { Formik } from 'formik';
import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import cs from 'classnames';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

const LoginPage = () => {
    return (
        <div className={cs(styles['form__container'], 'mt-25')}>
            <div className={cs(styles['form__header-container'])}>
                <h2 className={cs(styles['form__header'], 'pb-6')}>Вход</h2>
            </div>

            <Formik initialValues={{ email: '', password: '' }} onSubmit={() => {}}>
                {({ handleSubmit, handleChange, handleBlur, values }) => (
                    <form onSubmit={handleSubmit} className={cs(styles['form'])}>
                        <Input
                            type="email"
                            placeholder="E-mail"
                            onChange={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            name="email"
                            extraClass="mb-6"
                        />
                        <Input
                            type="password"
                            placeholder="Пароль"
                            onChange={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            name="password"
                            extraClass="mb-6"
                            icon="ShowIcon"
                        />
                        <div className={cs(styles['form__button-container'])}>
                            <Button htmlType="submit" type="primary" size="medium">
                                Войти
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
            <div className={cs(styles['form__additionalActions-container'])}>
                <span>Вы — новый пользователь?</span>
                <Link to={'/'}>Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default LoginPage;
