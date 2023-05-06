import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, PublicLayout } from './layouts';
import {  NotFound, Login, Register, Home, Tasks } from './pages';

import { ProtectedRoute } from './routes';

import { Provider } from 'react-redux';
import store from './redux/store';

import './assets/css/style.css'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route element={ <AuthLayout />}>
            <Route element={<ProtectedRoute redirect="/login"/>}>
              <Route index element={<Home />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>
          </Route>
            <Route element={ <PublicLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </BrowserRouter>
  </Provider>
  );

}

export default App;
