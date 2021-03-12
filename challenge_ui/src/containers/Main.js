import api from '../api/api';
import '../App.css';
import endpoints from '../config/endpoints';
import AstroTable from '../components/AstroTable';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { useEffect, useState } from 'react';

export default function Main() {
    const [open, setOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState();
    const [responseText, setResponseText] = useState();
    const [user, setUser] = useState(null);
    const [contacts, setContacts] = useState(null);
    const [contactStateGroups, setContactStateGroups] = useState(null);
    const [alerts, setAlerts] = useState(null);

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
    };

    useEffect(() => {
        const contactCols = ['contactName', 'contactStatus', 'contactBeginTimestamp', 'contactEndTimestamp'];
        const alertCols = ['errorMessage', 'errorCategory', 'errorTime'];

        const fetchData = async (params) => {
            let auth = {
                headers: {
                    'Authorization': 'Basic ' + btoa(unescape(encodeURIComponent(user.username + ':' + user.password)))
                }
            }

            const cb = (res) => {
                let headers = [];

                for (let col of Object.keys(res[0])) {
                    if ((params.name === 'alerts' && alertCols.includes(col)) || (params.name === 'contacts' && contactCols.includes(col))) {
                        headers.push({
                            Header: col,
                            accessor: col
                        });
                    }
                }

                if (params.name === 'alerts')
                    setAlerts({ columns: headers, data: res });
                else {
                    let groups = {}
                    for (let row of res) {
                        if (!groups[row.contactState])
                            groups[row.contactState] = 0;
                        groups[row.contactState] ++;
                    }
                    setContactStateGroups(groups);
                    setContacts({ columns: headers, data: res });
                }
            };

            const error = (res) => {
                console.error(res);
            };

            await api.GET({ url: endpoints.DATA(params.name) }, auth, cb, error);
        };

        if (user) {
            fetchData({ name: 'alerts' });
            fetchData({ name: 'contacts' });
        }
    }, [user]);

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
            { user && alerts ?
                <AstroTable 
                    data={alerts.data}
                    columns={alerts.columns}
                /> : null
            }
            <div style={{ backgroundColor: '#172635', height: '20px' }}/>
            { user && contacts ?
                <AstroTable 
                    data={contacts.data}
                    columns={contacts.columns}
                    groups={contactStateGroups}
                    showCount={true}
                /> : null
            }
        </div>
    );
};