import { Form } from 'formik';
import React, { FC } from 'react';
import styles from './form.module.css';
import cs from 'classnames';

const FormikForm: FC<{ children: React.ReactNode }> = ({ children, ...props }) => {
    return (
        <Form className={cs(styles.form)} {...props}>
            {children}
        </Form>
    );
};

export default FormikForm;
