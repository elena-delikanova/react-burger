import AppHeader from '../app-header/app-header';
import AppBody from '../app-body/app-body';
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
