import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Layout = () => {

  let [cuser , setUser] = useState([]);
  let { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  useEffect(() => {
    setUser(currentUser)
    if (!(currentUser)) {
      alert();
    }
  }, [currentUser, dispatch])

  console.log(cuser+"currentUser");
  return (
    <div className="container">
      <div className="card card-container">
        <header className="jumbotron">
          <h3>
            <strong>Profile</strong> 
          </h3>
        </header>
        <p>
          <strong>First Name:{cuser.firstName}</strong>
        </p>
        <p>
          <strong>Last Name:{cuser.lastName}</strong>
        </p>
        <p>
          <strong>Email:{cuser.username}</strong>
        </p>
    
      </div>
    </div>
  );
};


export default Layout;
