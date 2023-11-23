import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Counter } from '../features/Counter/Counter';
import { Todos } from '../features/Todos/Todos';
import { Nav } from './Nav/Nav';
import { NotFound } from '../features/NotFound/NotFound';
import { Auth } from '../features/Auth/Auth';

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="todos" element={<Todos />} />
        <Route
          path="counter"
          element={<Counter initialValue={3} largeStep={10} smallStep={2} />}
        />
        <Route path="login" element={<Auth />} />
        <Route path="register" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
