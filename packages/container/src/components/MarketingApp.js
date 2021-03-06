import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // Reusable piece of code to any framework
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        // console.log('Container sends a notification to Marketing', location);
        // console.log(nextPathname);

        // Check current path name if it is different or the same
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    }); // ref to the html

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
