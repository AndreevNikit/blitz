import {useEffect, useState, useCallback} from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userID, setUserID] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const navigate = useNavigate();

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserID(id)
        localStorage.setItem('userData', JSON.stringify({
            userID: id,
            token: jwtToken
        }));
        navigate('/menu')
    }, [navigate]);

    const logout = () => {
        setToken(null)
        setUserID(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if(data && data.token) {
            setToken(data.token);
            setUserID(data.userID);
        }
        setIsReady(true)
    }, [login]);

    return {login, logout, token, userID, isReady}
}