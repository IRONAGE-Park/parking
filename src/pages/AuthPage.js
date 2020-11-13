import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import FindPage from './auth/find/FindPage';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Transitions from '../components/transition/Transitions';

import LoginContainer from '../containers/auth/LoginContainer';
import SigninContainer from '../containers/auth/SigninContainer';
import SignupContainer from '../containers/auth/SignupContainer';


import '../static/stylesheets/transition.scss';
const { Paths } = require('../paths');


const AuthPage = () => {
    const history = useHistory();
    const location = useLocation();
    console.log(location.state);
 
    return (
        <div>
             <Transitions pageKey={location.key} {...location.state}>
                 <Switch location={location}>
                    <Route path={Paths.auth.login} component={LoginContainer}  />
                    <Route path={Paths.auth.signin} component={SigninContainer}  />
                    <Route path={Paths.auth.signup} component={SignupContainer}  />
                    <Route path={Paths.auth.enrollment}  render={() => <h1>차량등록 페이지</h1>}  />
                    <Route path={Paths.auth.sign_complete}  render={() => <h1>회원가입 완료 페이지</h1>}  />
                    <Route path={Paths.auth.find.index}  component={FindPage}  />
                    <Route render={() => history.replace(Paths.auth.login)} />
                </Switch>
            </Transitions>
      
        </div>
    );
};

export default AuthPage;
