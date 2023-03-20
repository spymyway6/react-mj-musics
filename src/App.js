import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyMusics from './pages/MyMusics';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import SignUpRoute from './components/SignUpRoute';
import AddMusics from './pages/AddMusics';
import EditMusic from './pages/EditMusic';
import Music from './pages/Music';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/my-musics" element={<MyMusics />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUpRoute />}>
                        <Route path="/sign-up" element={<SignUp />} />
                    </Route>
                    <Route path="/add-music" element={<PrivateRoute />}>
                        <Route path="/add-music" element={<AddMusics />} />
                    </Route>
                    <Route path="/edit-music" element={<PrivateRoute />}>
                        <Route path="/edit-music/:musicID" element={<EditMusic />} />
                    </Route>
                    <Route path="/music/:musicID" element={<Music />} />
                </Routes>
            </Router>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
