import { Alert, Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import EditableInput from '../../EditableInput';
import { useCurrentRoom } from '../../../context/current-room.context';
import { database } from '../../../misc/firebase';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { memo } from 'react';

const EditRoomBtnDrawer = () => {
  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);
  const { isOpen, open, close } = useModalState();
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success('Successfully updated', 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };
  const onNameSave = newName => {
    updateData('name', newName);
  };
  const onDescriptionSave = newDesc => {
    updateData('description', newDesc);
  };
  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name cannot be empty"
          />
          <EditableInput
            initialValue={description}
            onSave={onDescriptionSave}
            componentClass="textarea"
            rows={5}
            label={<h6 className="mb-2 mt-2">Description</h6>}
            emptyMsg="Description cannot be empty"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={close} block>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
