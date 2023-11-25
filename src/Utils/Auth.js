import {useEffect, useState} from "react";

const createTokenProvider = () => {

    let _token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH')) || null;

    const getExpirationDate = (jwtToken) => {
        if (!jwtToken) {
            return null;
        }
        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
        // multiply by 1000 to convert seconds into milliseconds
        return (jwt && jwt.exp && jwt.exp * 1000) || null;
    };

    const isExpired = (exp) => {
        if (!exp) {
            return false;
        }
        return Date.now() > exp;
    };

    const getToken = async () => {
        if (!_token) {
            return null;
        }
        if (isExpired(getExpirationDate(_token.accessToken))) {
            await fetch(process.env.REACT_APP_LOCAL_URL+'update_token', {
                method: 'POST',
                body: _token.refreshToken
            })
                .then(r => r.json())
                .then((res)=>{
                    return res
                })
                .then((token)=>{
                    if(token?.res){
                        setToken(null)
                        alert(token.res)
                    }
                    else(
                        setToken(token)
                    )
                })
        }

        return _token.accessToken;
    };

    const isLoggedIn = () => {
        return !!_token;
    };

    let observers = [];

    const subscribe = (observer) => {
        observers.push(observer);
    };

    const unsubscribe = (observer) => {
        observers = observers.filter(_observer => _observer !== observer);
    };

    const notify = () => {
        const isLogged = isLoggedIn();
        observers.forEach(observer => observer(isLogged));
    };

    const setToken = (token) => {
        if (token) {
            localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
        } else {
            localStorage.removeItem('REACT_TOKEN_AUTH');
        }
        _token = token;
        notify();
    };

    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe,
    };
};

export const createAuthProvider = () => {

    const tokenProvider = createTokenProvider();

    const getUserInfo = ()=>{
        return tokenProvider.getToken()
            .then((res)=>{
                if(res){
                    return JSON.parse(atob(res.split('.')[1]))
                }
            })
    }

    const login= (newTokens,name) => {
        tokenProvider.setToken(newTokens);
        localStorage.setItem('REACT_USER_NAME', name);
    };

    const logout = () => {
        tokenProvider.setToken(null);
        localStorage.removeItem('REACT_USER_NAME');
    };

    const getName = ()=>{
        return localStorage.getItem('REACT_USER_NAME')
    }

    const authFetch = async (input, init) => {
        return await tokenProvider.getToken()
            .then((token)=>{
                init = init || {};

                init.headers = {
                    ...init.headers,
                    Authorization: token
                };

                return fetch(input, init);
            })
    };

    const useAuth = () => {
        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());
        const [userInfo, setUserInfo] = useState({});

        useEffect(() => {
            getUserInfo()
                .then(setUserInfo)
            const listener = (newIsLogged) => {
                setIsLogged(newIsLogged);
            };

            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, []);

        return [isLogged,userInfo];
    };

    return {
        useAuth,
        authFetch,
        login,
        logout,
        getName,
        getUserInfo
    }
};