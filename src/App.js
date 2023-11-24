import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { urlPaths } from './constants/urlPath';
import Navbar from './screens/privateScreens/navbar';
import Jobs from './screens/privateScreens/jobs';
import './App.scss';

function App() {

  const isLoggedIn = useSelector((state)=>state?.userLoginData?.details?.isAuthenticated)
  const LazyLogin = lazy(()=> import("../src/screens/publicScreens/login"))
  const LazySidenavbar = lazy(() => import("../src/screens/privateScreens/sideNavbar"))

  return (
    <Suspense>
      <BrowserRouter>
        {
          (isLoggedIn) ?
          <>
            <Navbar />
            <Routes>
              <Route path={urlPaths.jobs} element={<LazySidenavbar section={<Jobs />} />} exact={true}/>
              <Route path="*" element={<Navigate to={urlPaths.jobs}/>} exact={true} />
            </Routes>
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
