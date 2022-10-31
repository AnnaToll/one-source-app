import { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import supportAvatar from '../../img/customer-service-svgrepo-com.svg';
import userAvatar from '../../img/user-avatar-filled-svgrepo-com.svg';
import typing from '../../img/loading_dots.gif';
import { useEffect } from 'react';
import { useChat } from '../../reducer/chatReducer';

const theme = {
    background: '#fff',
    fontFamily: 'Graphik Light',
    headerBgColor: '#17A398',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#E1987E',
    botFontColor: '#fff',
    userBubbleColor: '#17A398',
    userFontColor: '#fff',
    botAvatar: 'bot.jpg'
};

const LiveChat = ({ submitMessage, submitTyping }) => {

    const { chat } = useChat();
    const [message, setMessage] = useState('');
    
    const handleClickSubmit = (e) => {
        e.preventDefault();
        submitMessage(message);
        setMessage('');
    };

    const typingTimeout = useCallback(() => {
        submitTyping(true);
        setTimeout(() => {
            submitTyping(false);
        }, 3000);
    }, []);

    useEffect(() => {
        return clearTimeout(typingTimeout);
    });

    const handlePress = (e) => {
        if (e.key === 'Enter') {
            submitTyping(false);
            handleClickSubmit(e);
        }
        if (!chat.userTyping) {
            typingTimeout();
        }
    };

    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <div className='rsc'>
                    <div className="sc-iwsKbI gPDECf rsc-container">
                        <div className="sc-gqjmRU jJuEU rsc-header">
                            <h2 className='sc-VigVT bNgTFH rsc-header-title'>On source Support</h2>
                        </div>
                        <div className='sc-gZMcBi fBGGBn rsc-content'>
                            { chat.messages.map((message, index) => (
                                message.type === 'other' ?
                                <div key={ index } className='sc-dnqmqq efROPc rsc-ts rsc-ts-bot'>
                                    <div className='sc-htoDjs vmYlS rsc-ts-image-container'>
                                        <img 
                                        className='sc-gzVnrw cwuCQv rsc-ts-image' 
                                        src={supportAvatar}
                                        alt='avatar' />
                                    </div>
                                    <div className='sc-bZQynM dDsRQm rsc-ts-bubble'>
                                        {message.msg}
                                    </div>
                                </div>
                                :
                                <div key={ index } className='sc-dnqmqq eBYsSN rsc-ts rsc-ts-user'>
                                    <div className='sc-htoDjs fmWSyf rsc-ts-image-container'>
                                        <img className='sc-gzVnrw eijbEu rsc-ts-image' src={userAvatar} alt='avatar' />
                                    </div>
                                    <div className='sc-bZQynM gAkjtG rsc-ts-bubble'>
                                        {message.msg}
                                    </div>
                                </div>
                            ))}
                            { chat.agentTyping &&
                            <div className='sc-dnqmqq efROPc rsc-ts rsc-ts-bot'>
                                <div className='sc-htoDjs vmYlS rsc-ts-image-container'>
                                    <img 
                                    className='sc-gzVnrw cwuCQv rsc-ts-image' 
                                    src={supportAvatar}
                                    alt='avatar' />
                                </div>
                                <div className='sc-bZQynM dDsRQm rsc-ts-bubble'>
                                    <img src={ typing } width='14px' />
                                </div>
                            </div> }
                        </div>
                        <div className='sc-cSHVUG hDUXUW rsc-footer'>
                            <input 
                                type="textarea" 
                                className='sc-kAzzGY jpJyWr rsc-input' 
                                placeholder='Write here' 
                                value={ message }
                                onChange={ e => setMessage(e.target.value) }
                                onKeyDown={ handlePress }
                            />
                            <button 
                                onClick={ handleClickSubmit } 
                                className='sc-chPdSV hiexti rsc-submit-button'
                            >
                                <i className='bi bi-send-fill'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
      </div>
    );
};

export default LiveChat;