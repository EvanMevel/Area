import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Users from "./Users";
import Login from "./login/Login";
import Home from "./Home";
import Register from "./login/Register";
import Services from "./area/Services";
import Nav from "./Nav";
import NotFound from "./NotFound";
import AreaCreate from "./area/AreaCreate";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to="/app"/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register />} />

                <Route path="app" element={<Nav/>}>
                    <Route index element={<Home/>} />
                    <Route path="services" element={<Services />} />
                    <Route path="create" element={<AreaCreate />} />
                    <Route path="users/:id" element={<Users/>} />
                    <Route path="*" element={<NotFound/>} />
                </Route>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}