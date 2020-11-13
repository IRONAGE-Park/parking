import React from 'react';
import { useHistory } from 'react-router';
import { Paths ,duration} from '../../paths';
import styles from './LoginContainer.module.scss';

const LoginContainer =()=>{

    const history = useHistory();
    return(
        <div className={styles['container']} onClick={()=> history.push({
            pathname :Paths.auth.signin,
            state : { transition :'left' , duration:duration}
        })}>
            로그인 랜딩
        </div>
    )
}

export default LoginContainer;