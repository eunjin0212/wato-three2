import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./global.css";

import Help from "./routes/Help";
import Notice from "./routes/Notice";
import Terms from "./routes/Terms";
import Mypage from "./routes/Mypage";
import Alarm from "./routes/Alarm";
import Push from "./routes/Push";
import Lock from "./routes/Lock";
import Setting from "./routes/Setting";
import Myinfo from "./routes/Myinfo";
import Recommend from "./routes/Recommend";
import Index from "./routes/Index";
import Customer from "./routes/Customer";
import Write from "./routes/Write";
import Started from "./routes/Started";
import Login from "./routes/Login";
import Signin from "./routes/Signin";
import IndexDetail from "./routes/IndexDetail";
import Edit from "./routes/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Started />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/notice",
    element: <Notice />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/mypage",
    element: <Mypage />,
  },
  {
    path: "/alarm",
    element: <Alarm />,
  },
  {
    path: "/push",
    element: <Push />,
  },
  {
    path: "/lock",
    element: <Lock />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/myinfo",
    element: <Myinfo />,
  },
  {
    path: "/recommend",
    element: <Recommend />,
  },
  {
    path: "/index",
    element: <Index />,
  },
  {
    path: "/customer",
    element: <Customer />,
  },
  {
    path: "/write",
    element: <Write />,
  },
  {
    path: "/started",
    element: <Started />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
  {
    path: "/indexdetail/:id",
    element: <IndexDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
