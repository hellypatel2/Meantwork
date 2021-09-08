import React from "react";
import './App.css';
import './styles/tailwind.scss';
import './styles/styles.scss';
import MainRoutes from './Routes/routes';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <MainRoutes />
      </Router>
      {/* <Register /> */}
    </>
  );
}

export default App;
