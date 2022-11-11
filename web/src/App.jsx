import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import Home from "./Home";
import Register from "./login/Register";
import Services from "./area/Services";
import Nav from "./Nav";
import NotFound from "./NotFound";
import AreaCreate from "./area/AreaCreate";
import Callback from "./Callback";

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

export default function App() {
    return (
        <div>
            <ReactNotifications/>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate to="/app"/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="callback/:service" element={<Callback/>} />

                    <Route path="app" element={<Nav/>}>
                        <Route index element={<Home/>} />
                        <Route path="services" element={<Services />} />
                        <Route path="create" element={<AreaCreate />} />
                        <Route path="*" element={<NotFound/>} />
                    </Route>
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}