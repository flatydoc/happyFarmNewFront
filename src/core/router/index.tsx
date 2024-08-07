import { createBrowserRouter } from "react-router-dom";

import { RouteList } from "./routes";
import { MainPage } from "../../pages/MainPage";
import { ErrorBoundary } from "../../pages/ErrorBoundary";
import { Layout } from "../../Layout/Layout";
import { Providers } from "../../Providers";
import { FriendsPage } from "../../pages/FriendsPage";
import { ShopPage } from "../../pages/ShopPage";
import { TasksPage } from "../../pages/TasksPage";
import { LeaderBoardPage } from "../../pages/LeaderBoardPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Providers />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <Layout />,

        children: [
          {
            path: RouteList.Root,
            element: <MainPage />,
          },
          {
            path: RouteList.Friends,
            element: <FriendsPage />,
          },
          {
            path: RouteList.Shop,
            element: <ShopPage />,
          },
          {
            path: RouteList.Tasks,
            element: <TasksPage />,
          },
          {
            path: RouteList.Leaders,
            element: <LeaderBoardPage />,
          },
        ],
      },
    ],
  },
]);
