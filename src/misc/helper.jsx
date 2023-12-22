export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');
  if (splitName.length > 1) {
    return splitName[0].charAt(0) + splitName[1].charAt(0);
  } else {
    return splitName[0].charAt(0);
  }
}

export function transformToArrWithID(snapVal) {
  if (!snapVal) {
    return [];
  }

  return Object.entries(snapVal).map(([roomId, value]) => {
    return {
      ...value,
      id: roomId,
    };
  });
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
  const updates = {};
  updates[`/profiles/${userId}/${keyToUpdate}`] = value;

  const getMsgs = db
    .ref(`/messages`)
    .orderByChild('author/id')
    .equalTo(userId)
    .once('value');

  const getRooms = db
    .ref('/rooms')
    .orderByChild('lastMessage/author/id')
    .equalTo(userId)
    .once('value');

  const [msgsSnap, roomsSnap] = await Promise.all([getMsgs, getRooms]);

  msgsSnap.forEach(msgSnap => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });
  roomsSnap.forEach(roomSnap => {
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  return updates;
}
