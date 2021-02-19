import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

const MarketingApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    // Reusable to any framework
    mount(ref.current); // ref to the html
  });

  return <div ref={ref} />;
};

export default MarketingApp;
