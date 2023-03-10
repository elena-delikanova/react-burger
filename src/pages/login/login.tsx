import Form from '../../components/form/form';

type InputType = {
    type: 'text' | 'email' | 'password';
    name: string;
    placeholder: string;
};

const LoginPage = () => {
    const initialValues = { email: '', password: '' };
    const inputs: InputType[] = [
        { type: 'email', placeholder: 'E-mail', name: 'email' },
        { type: 'password', placeholder: 'Пароль', name: 'password' },
    ];
    const additionalActions = [
        { text: 'Вы — новый пользователь?', linkText: 'Зарегистрироваться', link: '/registration' },
        { text: 'Забыли пароль?', linkText: 'Восстановить пароль', link: '/forgot-password' },
    ];
    return <Form header="Вход" initialValues={initialValues} inputs={inputs} additionalActions={additionalActions}/>;
};

export default LoginPage;
