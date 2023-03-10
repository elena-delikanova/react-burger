import { Formik as FormikForm, FormikProps } from 'formik';
import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import cs from 'classnames';

import styles from './form.module.css';

type FormValues = {
    email: string;
    password: string;
};

type InputType = {
    type: 'text' | 'email' | 'password';
    name: string;
    placeholder: string;
};

type AdditionalAction = {
    text: string;
    linkText: string;
    link: string;
};

const Form: React.FC<{
    header?: string;
    initialValues: FormValues;
    inputs: InputType[];
    additionalActions?: AdditionalAction[];
}> = ({ header, initialValues, inputs, additionalActions }) => {
    const handleSubmit = () => {
        console.log('Тык');
    };
    return (
        <div className={cs(styles['form__container'], 'mt-25')}>
            {header && (
                <div className={cs(styles['form__header-container'])}>
                    <h2 className={cs(styles['form__header'], 'pb-6')}>{header}</h2>
                </div>
            )}

            <FormikForm initialValues={initialValues} onSubmit={handleSubmit}>
                {(props: FormikProps<FormValues>) => {
                    const { handleSubmit, handleChange, handleBlur, values } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            {inputs.map(({ type, name, placeholder }, index) => {
                                return (
                                    <Input
                                        type={type}
                                        placeholder={placeholder}
                                        onChange={handleChange(name)}
                                        onBlur={handleBlur(name)}
                                        value={values[name as keyof FormValues]}
                                        name={name}
                                        extraClass="mb-6"
                                        key={index}
                                    />
                                );
                            })}
                            <div className={cs(styles['form__button-container'])}>
                                <Button htmlType="submit" type="primary" size="medium">
                                    Войти
                                </Button>
                            </div>
                        </form>
                    );
                }}
            </FormikForm>
            {additionalActions && (
                <ul className={cs(styles['form__additionalActions-containers'], 'pt-20')}>
                    {additionalActions.map(({ text, link, linkText }, index) => {
                        return (
                            <li
                                className={cs(
                                    styles['form__additionalActions-container'],
                                    index !== additionalActions.length - 1 ? 'pb-4' : '',
                                )}
                                key={index}
                            >
                                <span className={cs('pr-2 text text_type_main-default text_color_inactive')}>
                                    {text}
                                </span>
                                <Link to={link} className={cs(styles['form__additionalActions-link'])}>
                                    {linkText}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Form;
