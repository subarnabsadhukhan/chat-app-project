import { createContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithID } from '../misc/helper';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref('rooms');
    roomListRef.on('value', snap => {
      const data = transformToArrWithID(snap.val());
      setRooms(data);
    });
    return () => roomListRef.off();
  }, []);
  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};
