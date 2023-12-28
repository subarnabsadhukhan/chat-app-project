import { Input, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';

const ImgBtnModal = ({ src, fileName }) => {
  const { isOpen, open, close } = useModalState(false);
  return (
    <>
      <Input
        type="image"
        className="mw-100 mh-100 w-auto"
        src={src}
        alt={fileName}
        onClick={open}
      />
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{fileName.slice(13)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={src} alt={fileName} height="100%" width="100%" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href={src} target="_blank" rel="noopener noreferrer">
            View Original
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImgBtnModal;
