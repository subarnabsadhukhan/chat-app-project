import { useCallback, useEffect, useState } from 'react';
import { database } from './firebase';

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addEventListener('change', listener);
    return () => queryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);
  useEffect(() => {
    const userRef = database.ref(`/status/${uid}`);
    userRef.on('value', snap => {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      }
    });
    return () => userRef.off();
  }, [uid]);

  return presence;
}
