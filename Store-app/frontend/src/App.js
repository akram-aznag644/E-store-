import React from 'react';
import Header from './components/header';
import MyRoutes from './routes/routes';
import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <div>
   <MyRoutes/>
    </div>
  );
}
