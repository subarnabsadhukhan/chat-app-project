import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import ProfileAvatar from '../ProfileAvatar';
import { getUserUpdates } from '../../misc/helper';

const fileInputTypes = '.png, .jpg, .jpeg';
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File process error'));
      }
    }, 'image/jpeg');
  });
};
const isValidFile = file => acceptedFileTypes.includes(file.type);
const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const onFileInputChange = e => {
    const currFiles = e.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`Wrong file type: ${file.type} selected`, 4000);
      }
    }
  };

  const avatarEditorRef = useRef();
  const { profile } = useProfile();
  const onClickUpload = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`/profiles/${profile.id}`)
        .child('avatar');
      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });
      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const updates = await getUserUpdates(
        profile.id,
        'avatar',
        downloadUrl,
        database
      );

      await database.ref().update(updates);

      setIsLoading(false);
      Alert.info('Avatar has been updated', 4000);
      close();
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          {' '}
          Select New Avatar
          <input
            type="file"
            name=""
            id="avatar-upload"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload New Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={onClickUpload}
              disabled={isLoading}
            >
              Upload New Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
