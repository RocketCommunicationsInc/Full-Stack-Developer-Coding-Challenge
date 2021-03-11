import api from '../api/api';
import '../App.css';
import endpoints from '../config/endpoints';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Overview from '../components/Overview';
import { useState } from 'react';

export default function Main() {
    const [open, setOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState();
    const [responseText, setResponseText] = useState();
    const [token, setToken] = useState();
    const [user, setUser] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setResponseText('');
    };

    const login = async (inputs) => {
        setToken(inputs.token);

        const cb = (res) => {
            console.log(res);
            setUser(res.user);
            setResponseText('Login successful');
            setTimeout(() => handleClose(), 1000);
        }

        const error = (e) => {
            console.error(e.response);
        }
        
        let config = {
            headers: { Authorization: `Bearer ${inputs.token}`}
        }

        await api.GET({ url: endpoints.USER(inputs.username) }, config, cb, error);
    };

    const register = async (inputs) => {
        const cb = (res) => {
            console.log(res.token);
            setToken(res.token);
            setResponseText(`Store this token for safekeeping: ${res.token}`);
        };

        const error = (e) => {
            console.error(e.data);
            setResponseText(e.data);
        };

        await api.POST({ url: endpoints.REGISTER(inputs.username) }, {}, cb, error);
    };

    const headerClick = (e) => {

        switch (e.currentTarget.id) {
            case 'register':
                setModalInfo({
                    header: 'Enter desired username',
                    submitText: 'Submit',
                    inputs: [
                        { id: 'username', label: 'Username' }
                    ],
                    submitAction: register
                });
                setOpen(true);
                break;
            case 'login':
                setModalInfo({
                    text: 'Enter your username and token',
                    header: 'Login',
                    submitText: 'Login',
                    inputs: [
                        { id: 'username', label: 'Username' },
                        { id: 'token', label: 'Token' }
                    ],
                    submitAction: login
                });
                setOpen(true);
                break;
            default:
                setOpen(true);
                break;
        }
    }

    return (
        <div>
            <Header
                action={headerClick}
                username={user?.username}
            >
                {user ? <Overview user={user} /> : null}
            </Header>
            <Modal 
                open={open}
                handleClose={handleClose}
                modalInfo={modalInfo}
                responseText={responseText}
            />
        </div>
    );
};