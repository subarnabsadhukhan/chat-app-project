import { Badge, Tooltip, Whisper } from 'rsuite';
import { usePresence } from '../misc/custom-hooks';
import TimeAgo from 'timeago-react';

const getText = presence => {
  if (!presence) {
    return 'Unknown State';
  }
  if (presence.state === 'online') return 'Online';
  else {
    return (
      <>
        Last Seen:{' '}
        <TimeAgo className="font-normal" datetime={presence.last_changed} />
      </>
    );
  }
};

const getColor = presence => {
  if (!presence) {
    return 'gray';
  }
  switch (presence.state) {
    case 'online':
      return 'green';
    case 'offline':
      return 'red';

    default:
      return 'gray';
  }
};

const PresenceDot = ({ uid }) => {
  const presence = usePresence(uid);
  return (
    <Whisper
      placement="top"
      trigger="hover"
      speaker={<Tooltip>{getText(presence)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ backgroundColor: getColor(presence) }}
      />
    </Whisper>
  );
};

export default PresenceDot;
