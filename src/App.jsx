import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/index";
import CreateTrip from "./components/create-trip/index";
import Viewtrip from "./components/view-trip/index";

function App() {
  const [trip, setTrip] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create-trip",
      element: <CreateTrip setTrip={setTrip} />,
    },
    {
      path: "/view-trip",
      element: <Viewtrip trip={trip} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
