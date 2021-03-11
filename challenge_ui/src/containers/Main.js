import api from '../api/api';
import '../App.css';
import endpoints from '../config/endpoints';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { useState } from 'react';

export default function Main() {
    const [open, setOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState();
    const [responseText, setResponseText] = useState();
    const [user, setUser] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setResponseText('');
    };

    const login = async (inputs) => {

        const cb = (res) => {
            setUser(res);
            setResponseText('Login successful');
            setTimeout(() => handleClose(), 1000);
        }

        const error = (e) => {
            console.error(e);
            setResponseText('Invalid username or password')
        }
        
        let data = {
            user: inputs.username,
            password: inputs.password
        }

        await api.POST({ url: endpoints.LOGIN() }, data, cb, error);
    };

    const register = async (inputs) => {
        const cb = (res) => {
            setResponseText(`Registration successful`);
            setUser(res);
            setTimeout(() => handleClose(), 1000);
        };

        const error = (e) => {
            if (e.status === 500)
                setResponseText('User already exists');
            else
                setResponseText(e.status)
        };

        await api.POST({ url: endpoints.REGISTER() }, { user: inputs.username, password: inputs.password }, cb, error);
    };

    const headerClick = (e) => {

        switch (e.currentTarget.id) {
            case 'register':
                setModalInfo({
                    header: 'Register',
                    submitText: 'Submit',
                    inputs: [
                        { id: 'username', label: 'Username' },
                        { id: 'password', label: 'Password' }
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
                        { id: 'password', label: 'Password' }
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