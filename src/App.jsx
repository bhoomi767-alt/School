import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import './myproject/src/index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homy from "./Component/Homy";
import About2 from "./Component/About2"
import Front from "./Component/Front";
import Back from "./Component/Back";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";
import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedAdminRoute from "./Pages/ProtectedAdminRoute";
import VisitorGate from "./Component/VisitorGate";
import SearchResults from "./Pages/SearchResults";
import PrincipalTeachers from "./Component/PrincipalTeahers";
import Feedback from "./Component/Feedback";
import Achievements from "./pages/Achievements";
import Certificates from "./pages/Certificates";
import Gallery from "./Pages/Gallery2";
import Admission from "./Pages/Admission";



function App() {
     const [open, setOpen] = useState(false);
    return (
        <BrowserRouter future={{ 
                v7_startTransition: true, 
                v7_relativeSplatPath: true 
            }}>
        <VisitorGate />
            <Front setOpen={setOpen}/>
            
            <Back open={open} setOpen={setOpen}/>
           <main className="min-h-screen max-w-full w-full overflow-x-hidden">
                <Routes>
                    <Route path="/" element={<Homy />} />
                    <Route path="/about" element={<About2 />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/Dashboard" element={<Dashboard/>} />
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/school" element={<SearchResults/>}/>
                    <Route path="/admin-dashboard" element={<ProtectedAdminRoute><AdminDashboard/></ProtectedAdminRoute>}/>
                    <Route path="/principal" element={<PrincipalTeachers />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/admission" element={<Admission />} />
                </Routes>
            </main>
            <Contact/>
            <Footer/>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render( <App> </App>)