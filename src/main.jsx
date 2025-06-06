import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import "./index.css";
import Routers from './Routers/Routers.jsx';
import Context from './Context/Context.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
    <RouterProvider router={Routers} />
    </Context>
  </StrictMode>,
)
