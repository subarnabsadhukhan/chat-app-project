import { Avatar } from 'rsuite';
import { getNameInitials } from '../misc/helper';

const ProfileAvatar = ({ name, ...avatorProps }) => {
  return (
    <Avatar circle {...avatorProps}>
      {getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
