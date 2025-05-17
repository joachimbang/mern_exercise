import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowerRouter } from "react-router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowerRouter>
    <App />
    </BrowerRouter>
  </StrictMode>,
);
