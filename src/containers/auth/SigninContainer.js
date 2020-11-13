import React from 'react';
import { useHistory } from 'react-router';
import { Paths } from '../../paths';
import styles from './SigninContainer.module.scss';
const SigninContainer =()=>{

    const history = useHistory();
    return(
        <div className={styles['container']}>
            <h1 onClick={()=>history.goBack()} >뒤로가기</h1>
            <h1>로그인창</h1>
            <h1 onClick={()=>history.push(Paths.auth.signup)}>회원가입</h1>
            
        </div>
    )
}

export default SigninContainer;