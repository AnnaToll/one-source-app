import React, { Component } from 'react';
import './chat.css';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { ChatContext } from '../../reducer/chatReducer';
import ACTIONS from '../../reducer/actions';



//Styles
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

class App extends Component {

  static contextType = ChatContext;

  state = {
    steps: [
      {
        id: '0',
        message: 'Hello, what\'s your name?',
        trigger: '1'
      },
      {
        id: '1',
        user: true,
        trigger: '2'
      },
      {
        id: '2',
        message: 'How may I help you {previousValue}?',
        trigger: '3'
      },
      {
        id: '3',
        options: [
          { value: 1, label: 'About us?', trigger: 'about' },
          { value: 2, label: 'Who are we?', trigger: 'team' },
          { value: 3, label: 'School?', trigger: 'school' }
        ]
      },
      {
        id: 'about',
        message: 'One Source is a school project, an application that combines a Backend with a Frontend, a project from an idea to a finished product',
        trigger: 4
      },
      {
        id: 'team',
        message: 'Our team consists of four students: Anna, Johanna, Pernilla och Isabelle.',
        trigger: 4
      },
      {
        id: 'school',
        message: 'We are students at Jensen Education in Stockholm, Sweden, and we are studying Frontend development',
        trigger: 4
      },
      {
        id: '4',
        message: 'Want more info?',
        trigger: this.context.chat.chatActive ? '5' : '6'
      },
      {
        id: '5',
        options: [
          { value: 1, label: 'Yes', trigger: '3' },
          { value: 2, label: 'No', trigger: '7' },
          { value: 3, label: 'Yes but with a human', trigger: '8' }
        ]
      },
      {
        id: '6',
        options: [
          { value: 1, label: 'Yes', trigger: '3' },
          { value: 2, label: 'No', trigger: '7' },
        ]
      },
      {
        id: '7',
        message: 'Have a nice day!',
        end: true
      },
      {
        id: '8',
        message: 'I will fetch a real human for you !',
        end: true,
      },
    ],
  };
  
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.liveChatOnline !== this.props.liveChatOnline) {
      const stepsCopy = JSON.parse(JSON.stringify(prevState.steps));
      stepsCopy[7].trigger = this.props.liveChatOnline ? '5' : '6';
      this.setState({ steps: stepsCopy });
    }
  }

  handleEnd = ({ steps, values }) => {

    if (values[values.length - 1] === 2) {
      setTimeout(() => {
        this.props.setShow(false);
      }, 1000);
    } else {
      setTimeout(() => {
        this.context.dispatch({
          type: ACTIONS.ACTIVATE_SESSION,
          payload: values[0]
        });
      }, 1000);
    }
  };

  render() {
    return (
      <div className='App'>
        <ThemeProvider theme={ theme }>
          <ChatBot
            liveChatOnline={ this.liveChatOnline }
            setShow={ this.props.setShow }
            setCurrentComponent={ this.props.setCurrentComponen }
            handleEnd={ this.handleEnd }
            headerTitle={'One Source Support'}
            placeholder={'Write here'}
            recognitionEnable={true}
            botDelay={1000}
            steps={this.state.steps}
          />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;