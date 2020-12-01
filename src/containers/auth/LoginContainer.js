import React from 'react';
import { Link, useHistory } from 'react-router-dom'
/* Library */

import { Paths } from '../../paths'

import classNames from 'classnames/bind'
import styles from './LoginContainer.module.scss'
import Logo from '../../static/asset/svg/Logo'
import Naver from '../../static/asset/svg/auth/naver'
import Kakao from '../../static/asset/svg/auth/kakao'
import Facebook from '../../static/asset/svg/auth/facebook'
import Email from '../../static/asset/svg/auth/mail'
import XButton from '../../static/asset/svg/auth/XButton'
import { ButtonBase } from '@material-ui/core'

const cx = classNames.bind(styles)

const Button = ({ name, color, backgroundColor, children }) => {
    return (
        <ButtonBase className={cx("button")} style={{color:`${color}`, background:`${backgroundColor}`}}>
            {children}
            {name}
        </ButtonBase>
    );
}

const LoginContainer = () => {
    const history = useHistory()
    
    const onClickBack = () => history.push(Paths.main.index)

    return (
        <div className={cx('container')}>
            <div className={cx("logo")}>
                <Logo />
            </div>

            <ButtonBase onClick={onClickBack} ><XButton /></ButtonBase>

            <div className={cx("area")}>
                <Button name={"네이버로 주차하기"} color={"#EBEBEB"} backgroundColor={"#00BF19"}><Naver /></Button>
                <Button name={"카카오로 주차하기"} color={"#381E1F"} backgroundColor={"#FCE000"}><Kakao /></Button>
                <Button name={"페이스북으로 주차하기"} color={"#EBEBEB"} backgroundColor={"#4267B2"}><Facebook /></Button>
                <Link to={Paths.auth.signin} ><Button name={"이메일로 주차하기"} color={"#EBEBEB"} backgroundColor={"#333333"}><Email /></Button></Link>
            </div>
        </div>
    );
};

export default LoginContainer;