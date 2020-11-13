import React from 'react';
import { useHistory } from 'react-router';
import { Paths } from '../../paths';
import styles from './LoginContainer.module.scss';
const LoginContainer =()=>{

    const history = useHistory();
    return(
        <div className={styles['container']} onClick={()=> history.push(Paths.auth.signin)}>
            로그인 랜딩
        </div>
    )
}

export default LoginContainer;