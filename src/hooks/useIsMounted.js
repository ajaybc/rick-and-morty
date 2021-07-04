import React from 'react';

const useIsMounted = () => {
  const isMounted = React.useRef(true);
  React.useEffect(() => () => {
    isMounted.current = false;
  }, []);
  return isMounted;
}

export default useIsMounted;
