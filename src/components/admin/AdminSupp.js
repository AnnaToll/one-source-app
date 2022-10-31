
import { useEffect, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './live-chat.css';
import jwt_decode from 'jwt-decode';
import { useJWT } from '../../hooks/useJWT';
import useChatAdmSocket from '../../hooks/useChatAdmSocket';
import { useChatAdm } from '../../reducer/chatAdmReducer';
import typing from '../../img/loading_dots.gif';


const AdminSupp = ({ socket }) => {

    const [ activate, submitMessage, nextUser, submitTyping, disconnect, socketCleanUp ] = useChatAdmSocket(socket);
    const { chat } = useChatAdm();
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ checkExpiration ] = useJWT();

    useEffect(() => {
        return () => {
            socketCleanUp();
            clearTimeout(typingTimeout);
        };
    }, []);


    const handleClickActivate = async (e) => {
        e.preventDefault();
        await checkExpiration();
        const settings = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/admin/activate-chat`, settings);
            const data = await response.json();
            if (response.status !== 200) {
                setError(data.error);
            } else {
                if (sessionStorage.getItem('support-key')) {
                    sessionStorage.removeItem('support-key');
                }
                sessionStorage.setItem('support-key', data.key);
                activate();
                const user = jwt_decode(sessionStorage.getItem('accessToken'));
                socket.emit('chat-adm-start', {
                    key: data.key,
                    name: user.name  
                });
                setError('');
            }
        } catch (error) {
            setError('Oops, something went wrong! Please try again or contact us for more information.');
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        submitMessage(message);
        setMessage('');
    };

    const handleClickNext = () => {
        nextUser();
        setSuccess('Next user coming up :)');
        setTimeout(() => {
            setSuccess('');
        }, 2000);
    };

    const typingTimeout = useCallback(() => {
        submitTyping(true);
        setTimeout(() => {
            submitTyping(false);
        }, 3000);
    }, []);


    const handlePress = (e) => {
        if (e.key === 'Enter') {
            submitTyping(false);
            handleSubmit(e);
        }
        if (!chat.agentTyping) {
            typingTimeout();
        }
    };


    return (
        !jwt_decode(sessionStorage.getItem('accessToken')).accessLevel.includes('support')
        ?
            <Navigate to='/admin'/>
        :
            <> 
                <h2>Support</h2>
                { error ? <p className="error">{error}</p> : '' }
                { success ?  <p className="success">{success}</p> : '' }
                { !chat.active ? 
                    <button onClick={ handleClickActivate } className='btn bg-orange'>Activate chat</button>
                    :
                    <section className='chat-support'>
                        <div className='messages-container'>
                            { chat.messages.map( (message, index) => (
                                <p key={ index } className={`btn bg-grey message ${ message.type }`}>
                                    { message.msg }
                                </p>
                            ))}
                            { chat.userTyping &&
                            <p className={'btn bg-grey message other'}>
                                <img src={ typing } width='14px' />
                            </p> }
                            <p className='support'></p>
                        </div>
                        <div className='chat-input-container'>
                            <form onSubmit={ handleSubmit }>
                                <textarea 
                                    type='text'
                                    value={ message }
                                    onChange={(e) => setMessage(e.target.value)} 
                                    onKeyDown={ handlePress }
                                />
                                <button className='btn bg-green'>Send</button>
                            </form>
                        </div>
                        <button onClick={ handleClickNext } className='btn bg-grey top-m'>Next user</button>
                        <button onClick={ disconnect} className='btn bg-orange top-m'>Deconnect from chat</button>
                    </section>
                }
            </>
    );
};

export default AdminSupp;