import { Chat } from './pages';
import ChatContextProvider from './contexts/chatContext';

function App() {
  return (
    <ChatContextProvider>
      <Chat />
    </ChatContextProvider>
  );
}

export default App;
