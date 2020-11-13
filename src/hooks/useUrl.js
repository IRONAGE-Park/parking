import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Paths } from '../paths';


export const useUrl = () => {
    const location = useLocation();
    const [current, setCurrent] = useState('/');
    const [prev, setPrev] = useState('');

    useEffect(() => {
        setCurrent(location.pathname + location.search);
        setPrev(current);
        const obj = {
            current: location.pathname + location.search,
            prev: current,
        };
        sessionStorage.setItem('url', JSON.stringify(obj));
    }, [location.pathname]);

    return { prev, current };
};

