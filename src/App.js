import React, { useHistory, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { logout } from "./actions/auth";
import { clearMessage } from './actions/message';
import { createBrowserHistory } from 'history';


export default function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = createBrowserHistory();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  
  useEffect(() => {
    if(!(isLoggedIn)){
      history.push('/login');
    }
  }, [isLoggedIn]);
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
 
  return (
    <BrowserRouter>
      <div>
        {currentUser ? (
          <nav className="navbar navbar-expand bg-primary">
            <div className="navbar-nav mr-auto">
              <li className="nav-item ">
                <span className="navbar-brand pull-right" onClick={logOut}>
                  LogOut
                </span>
                </li>
            </div>
          </nav>
        ) : (
          ' '
        )}

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    </BrowserRouter>
  );
}
