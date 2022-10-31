import { ChatAdmProvider } from '../reducer/chatAdmReducer';
import LoginProvider from './LoginProvider';
import { ChatProvider } from '../reducer/chatReducer';
import { SocketProvider } from './SocketProvider';
import { IntroProvider } from '../hooks/useIntro';


const AppProvider = ({ children }) => {

    return (
        <ChatAdmProvider >
            <LoginProvider >
                <ChatProvider >
                    <SocketProvider>
                        <IntroProvider>
                            { children }
                        </IntroProvider>
                    </SocketProvider>
                </ChatProvider>
            </LoginProvider>
        </ChatAdmProvider>
    );

};

export default AppProvider;

