import './chat.css';
import { useState, useEffect } from 'react';
import Chatbot from './Chatbot';
import LiveChat from './LiveChat';
import { AiOutlineCloseCircle, AiOutlineSmile } from 'react-icons/ai';
import robotOrange from '../../img/robot-orange.svg';
import robotBlue from '../../img/robot-blue.svg';
import robotGreen from '../../img/robot-green.svg';
import robotGray from '../../img/robot-gray.svg';
import useChatSocket from '../../hooks/useChatSocket';
import { useChat } from '../../reducer/chatReducer';

const ChatContainer = ({ socket }) => {

    const [ show, setShow ] = useState(false);
    const [ submitMessage, submitTyping, connected, deactivateQueue, ] = useChatSocket(socket, setShow);
    const { chat } = useChat();
    const [ welcome, setWelcome] = useState('');
    const [ hidden, setHidden ] = useState('hidden');
    const text = 'Hey! Want some help?  ';

    const toggleShowChat = () => {
        if (!show && !chat.sessionActive) {
            connected();
        }
        if (show && chat.inQueue) {
            deactivateQueue();
        } 
        setShow(!show);
    };

    useEffect(() => {

        let i = 500;
        let prevletter = '';

        if (welcome !== '') {
            setWelcome('');
        }

        const textTimeout = (i, letter) => {
            setTimeout(() => {
                setWelcome(prev => {
                    return prev + letter;
                });

            }, i);
        };

        for (let letter of text) {
            i += 60;
            if (prevletter === '!') {
                i += 400;
            }
            textTimeout(i, letter);
            prevletter = letter;
        }

        setTimeout(() => {
            setHidden('');
        }, i + 93);




    }, []);

    return (
        <div className='Chat-Button'>
            {
                show && chat.chatActive !== null ?
                    chat.sessionActive ? 
                        <LiveChat submitMessage={ submitMessage } submitTyping={ submitTyping }  />
                        :
                        <Chatbot setShow={ setShow } />
                    : 
                    null
            }
            <div onClick={ toggleShowChat } className='Chat-Icons'>
                {
                    show && chat.chatActive !== null ? 
                        <p className='Icon-close'><i className='bi bi-x'></i>
                        </p>
                        : 
                        <div className='Icon-chat'>
                            <div className='bubble'>
                                { welcome && 
                                    <p>
                                        { welcome }
                                        <i className={`bi bi-emoji-smile ${hidden}`}></i>
                                    </p> 
                                }
                                <div  className='circle'>
                                    <img src={ robotOrange } />
                                </div>
                                <div  className='arrow' />
                                <div className='bubble-green'>
                                    <div className='arrow-green' />
                                </div>
                            </div>
                        </div>
                }
            </div>

        </div>
    );
};

export default ChatContainer;