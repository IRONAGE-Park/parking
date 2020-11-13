import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

import DialogContainer from './containers/assets/DialogContainer';
import LoadingContainer from './containers/assets/LoadingContainer';
import {useUrl} from './hooks/useUrl';

import { Paths } from './paths';

const App = () => {
    useUrl();
    return (
        <>
            <Switch>
                <Route path={Paths.auth.index} component={AuthPage} />
                <Route path={Paths.main.index} component={MainPage} />
                <Route component={ErrorPage} />
            </Switch>
            <DialogContainer />
            <LoadingContainer />
        </>
    );
};

export default App;
