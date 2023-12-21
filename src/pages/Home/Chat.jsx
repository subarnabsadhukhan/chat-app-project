import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ChatBottom from '../../components/chat-window/bottom';
import Messages from '../../components/chat-window/messages';
import ChatTop from '../../components/chat-window/top';
import { useRooms } from '../../context/rooms.context';
import { Loader } from 'rsuite';

const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms)
    return <Loader center vertical speed="slow" size="md" content="Loading" />;

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom)
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;

  return (
    <>
      <div className="chat-top">
        <ChatTop />
      </div>

      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </>
  );
};

export default Chat;
