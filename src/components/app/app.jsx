import AppHeader from '../appHeader/appHeader';
import AppBody from '../appBody/appBody';
import appStyles from './app.module.css';

const App = () => {
    return (
        <div className={appStyles.app}>
            <AppHeader />
            <AppBody />
        </div>
    );
};

export default App;
