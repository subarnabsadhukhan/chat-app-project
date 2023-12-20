import { useRef } from 'react';
import TimeAgo from 'timeago-react';
const RoomItem = () => {
 
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="text-disappear">Room Name</h3>
        <TimeAgo datetime={new Date()} className="font-normal text-black-45" />
      </div>
      <div className="d-flex align-items-center text-block-70">
        <span>No messages yet...</span>
      </div>
    </div>
  );
};

export default RoomItem;
