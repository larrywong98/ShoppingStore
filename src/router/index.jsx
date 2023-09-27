import React, {  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from "../pages/App"
import SignUpPage from "../pages/signup/SignUpPage"
import LogInPage from "../pages/login/LogInPage"
import HeaderNav from '../pages/HeaderNav/index';

const AppRouter = ()=> {
    return (
        <Router>
            <HeaderNav/>
            <Routes>
                <Route exact path="/" Component={App }></Route>
                <Route path="/signup" Component={SignUpPage}></Route>
                <Route path="/login" Component={LogInPage}></Route>
            </Routes>
        </Router>
    );
}
export default AppRouter;
