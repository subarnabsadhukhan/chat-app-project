import TimeAgo from 'timeago-react';

import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({ message }) => {
  const { createdAt, text, author } = message;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0  text-black link-unstyled"
        />
        <TimeAgo
          className="text-black-45 ml-2 font-normal"
          datetime={createdAt}
        />
      </div>

      <div>
        <span className="word-break-all"> {text} </span>
      </div>
    </li>
  );
};

export default MessageItem;
