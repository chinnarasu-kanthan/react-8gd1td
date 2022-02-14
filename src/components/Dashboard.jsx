import React, {  useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useStore } from 'react-redux'

const importView = (layout) =>
  React.lazy(() => import("./"+layout).catch((e) => import('./Layout')));

const Dashboard = () => {
  const [views, setViews] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const store = useStore()
  
  useEffect(() => {
    const user = store.getState().auth;
   let cuser = JSON.parse(JSON.stringify(user.user));
      let layout =cuser ? cuser.layout:"Layout";
  async function loadViews() {
          const View = await importView(layout);
      Promise.resolve(<View />).then(setViews);
    }
   loadViews();
  }, [store]);

  return (
    <React.Suspense fallback="Loading views...">
      <div className="container">{views}</div>
    </React.Suspense>
  );
};

export default Dashboard;
