import React, {  useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';

const importView = (layout) =>
  React.lazy(() => import("./"+layout+".jsx").catch((e) => import('./Layout')));

const Dashboard = () => {
  const [views, setViews] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(currentUser.layout+"adsdasd");
    async function loadViews() {
      const View = importView(currentUser.layout);
      setViews(<View />);
    }
   loadViews();
  }, [currentUser]);

  return (
    <React.Suspense fallback="Loading views...">
      <div className="container">{views}</div>
    </React.Suspense>
  );
};

export default Dashboard;
