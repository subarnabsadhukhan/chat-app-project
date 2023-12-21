import { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { ButtonToolbar, Icon } from 'rsuite';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useMediaQuery } from '../../../misc/custom-hooks';
import RoomInfoBtnModal from './RoomInfoBtnModal';

const ChatTop = () => {
  const name = useCurrentRoom(v => v.name);
  const isMobile = useMediaQuery('(max-width: 992px)');
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h4>
          <Icon
            icon="arrow-circle-left"
            componentClass={Link}
            to="/"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0  mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">todo</ButtonToolbar>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <span>todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default memo(ChatTop);