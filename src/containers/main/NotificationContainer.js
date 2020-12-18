import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';

import { useDialog } from '../../hooks/useDialog';
import useScrollEnd from '../../hooks/useScrollEnd';
import {
    requestGetNotifications,
    requestPutNotificationAllRead,
    requestPutNotificationRead,
} from '../../api/notification';
import { getFormatDateDetailTime } from '../../lib/calculateDate';

import Ad from '../../static/asset/svg/notification/Ad';
import Heart from '../../static/asset/svg/notification/Heart';

import styles from './NotificationContainer.module.scss';
import useToken from '../../hooks/useToken';

const cx = cn.bind(styles);

const NotificationItem = ({ type, description, date, read }) => {
    return (
        <>
            <div className={styles['icon']}>{type ? <Ad /> : <Heart />}</div>
            <div className={styles['content']}>
                <div className={styles['description']}>{description}</div>
                <div className={styles['date']}>
                    {getFormatDateDetailTime(date)}
                </div>
            </div>
        </>
    );
};

const NotificationContainer = () => {
    const allnotifications = useRef([]);
    const JWT_TOKEN = useToken();
    const dataLength = useRef(0);
    const [notifications, setNotifications] = useState([]);
    const openDialog = useDialog();
    const history = useHistory();

    const handleReadNotification = useCallback(
        async (id) => {
            const { data } = await requestPutNotificationRead(JWT_TOKEN, id);
            if (data.msg === 'success') {
                const newNotifications = notifications.map((noti) =>
                    noti.notification_id === id
                        ? { ...noti, read_at: new Date() }
                        : noti,
                );
                setNotifications(newNotifications);
            }
        },
        [JWT_TOKEN, notifications],
    );

    const fetchNotificationList = useCallback(() => {
        const LIMIT = 10;
        const length = dataLength.current;
        const fetchData = allnotifications.current.slice(
            length,
            length + LIMIT,
        );
        if (fetchData.length > 0) {
            setNotifications((notification) => notification.concat(fetchData));
            dataLength.current += LIMIT;
        }
    }, []);

    const getNotification = useCallback(async () => {
        const { data } = await requestGetNotifications(JWT_TOKEN);
        if (data.msg === 'success') {
            allnotifications.current = data.notifications;
            fetchNotificationList();
        } else {
            openDialog('알림 정보를 가져올 수 없습니다', '', () =>
                history.goBack(),
            );
        }
    }, [fetchNotificationList, history, openDialog, JWT_TOKEN]);

    const handleAllRead = useCallback(async () => {
        const { data } = await requestPutNotificationAllRead(JWT_TOKEN);
        if (data.msg !== 'success') {
            openDialog('통신 불량', '네트워크 상태를 확인하세요.', () =>
                history.goBack(),
            );
        }
        setNotifications((notification) =>
            notification.map((noti) => ({ ...noti, read_at: new Date() })),
        );
    }, [JWT_TOKEN, history, openDialog]);

    const notiRef = useRef(null);
    useScrollEnd(fetchNotificationList, notiRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getNotification, []);
    return (
        <div className={styles['notification-container']}>
            <ButtonBase className={styles['read-all']} onClick={handleAllRead}>
                전체읽음
            </ButtonBase>
            <ul className={styles['notification-list']} ref={notiRef}>
                {notifications.map(
                    ({
                        notification_id,
                        notification_type,
                        notification_body,
                        createdAt,
                        read_at,
                    }) => {
                        const read = read_at !== null;
                        return (
                            <ButtonBase
                                component="li"
                                className={cx('notification-item', { read })}
                                key={notification_id}
                                onClick={() =>
                                    handleReadNotification(notification_id)
                                }
                            >
                                <NotificationItem
                                    type={notification_type === 'rental'}
                                    description={notification_body}
                                    date={createdAt}
                                    read={read_at !== null}
                                />
                            </ButtonBase>
                        );
                    },
                )}
            </ul>
        </div>
    );
};

export default NotificationContainer;
