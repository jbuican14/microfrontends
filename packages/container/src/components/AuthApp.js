import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // Reusable to any framework
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        // Check current path name if it is different or the same
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
    }); // ref to the html

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
