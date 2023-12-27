import TimeAgo from 'timeago-react';

import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import { Button } from 'rsuite';
import { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import IconBtnControl from './IconBtnControl';

const MessageItem = ({ message, handleAdmin, handleLike }) => {
  const { createdAt, text, author, likeCount, likes } = message;

  const admins = useCurrentRoom(v => v.admins);
  const isAdmin = useCurrentRoom(v => v.isAdmin);

  const isMsgAuthorAdmin = admins.includes(author.id);
  const isAuthor = auth.currentUser.uid === author.id;
  const canGrantAdminPrivilege = isAdmin && !isAuthor;
  const [selfRef, isHovered] = useHover();

  const isMobile = useMediaQuery('(max-width: 992px)');
  const canShowIcons = isMobile || isHovered;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0  text-black link-unstyled"
        >
          {canGrantAdminPrivilege && (
            <Button block color="blue" onClick={() => handleAdmin(author.id)}>
              {isMsgAuthorAdmin
                ? 'Remove admin permission'
                : 'Give admin permission in this room'}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo
          className="text-black-45 ml-2 font-normal"
          datetime={createdAt}
        />
        <IconBtnControl
          {...(isLiked ? { color: 'red' } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
      </div>

      <div>
        <span className="word-break-all"> {text} </span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
