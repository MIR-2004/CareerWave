import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ApplyJob from "../pages/ApplyJob";
import Application from "../pages/Application";


const Routes = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/apply-job/:id',
                element: <ApplyJob/>
            },
            {
                path: '/applications',
                element: <Application/>
            }
        ]
    }
])

export default Routes