import { Suspense, lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { urlPaths } from './constants/urlPath';
import Navbar from './screens/privateScreens/navbar';
import Jobs from './screens/privateScreens/jobs';
import SideNavBar from '../src/screens/privateScreens/sideNavbar';
import './App.scss';

function App() {

  const [sideBarIsOpen, setSideBarIsOpen] = useState(true)
  const isLoggedIn = useSelector((state)=>state?.userLoginData?.details?.isAuthenticated)
  const LazyLogin = lazy(()=> import("../src/screens/publicScreens/login"))

  return (
    <Suspense>
      <BrowserRouter>
        {
          (isLoggedIn) ?
          <>
            <Navbar setSideBarIsOpen={setSideBarIsOpen} sideBarIsOpen={sideBarIsOpen}/>
            <div className='d-flex'>
              <SideNavBar sideBarIsOpen={sideBarIsOpen} />
              <Routes>
                <Route path={urlPaths.jobs} element={<Jobs />} exact={true}/>
                <Route path="*" element={<Navigate to={urlPaths.jobs}/>} exact={true} />
              </Routes>
            </div>
          </> :
          <Routes>
            <Route path={urlPaths.login} element={<LazyLogin />} />
            <Route  path="*" element={<Navigate to={urlPaths.login}/>}/>
          </Routes>
        }
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
