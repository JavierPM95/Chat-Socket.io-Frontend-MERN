import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

import { ChatProvider } from './context/Chat/ChatContext';
import { MessageProvider } from './context/Message/MessageContext';
import { UserProvider } from './context/User/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <ChatProvider>
        <UserProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </UserProvider>
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
