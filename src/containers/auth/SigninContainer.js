import React from 'react';
import { useHistory } from 'react-router';
import { Paths,duration } from '../../paths';
import styles from './SigninContainer.module.scss';
const SigninContainer =()=>{

    const history = useHistory();
    return(
        <div className={styles['container']}>
                <h1 onClick={()=>history.replace({
                pathname:Paths.auth.login,
                state : { transition :'normal' , duration:duration}

            })} >뒤로가기</h1>
            <h1>로그인창</h1>
            <h1 onClick={()=>history.push({
                pathname: Paths.auth.signup,
                state : {transition:'left' ,duration:duration}
                })}>회원가입</h1>
            
        </div>
    )
}

export default SigninContainer;