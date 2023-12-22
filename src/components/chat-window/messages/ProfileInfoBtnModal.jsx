import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../ProfileAvatar';
import PresenceDot from '../../PresenceDot';

const ProfileInfoBtnModal = ({ profile, ...btnProps }) => {
  const { open, isOpen, close } = useModalState();
  const shortName = profile.name.split(' ')[0];
  const { name, avatar, createdAt } = profile;
  const memberSince = new Date(createdAt).toLocaleDateString();
  return (
    <>
      <Button {...btnProps} onClick={open}>
        <div className="d-flex align-items-center">
          <PresenceDot uid={profile.id} />
          <ProfileAvatar src={avatar} name={name} className="ml-1" size="xs" />
          <span className="ml-1"> {shortName}</span>
        </div>
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName}&apos;s profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center ">
          <ProfileAvatar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />
          <h4 className="mt-2">{name}</h4>
          <p>Member since: {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
