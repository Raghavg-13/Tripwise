import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/index";
import CreateTrip from "./components/create-trip/index";
import Viewtrip from "./components/view-trip/index";
import MyTrips from "./components/MyTrips/index";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create-trip",
      element: (
        <ProtectedRoute>
          <CreateTrip />
        </ProtectedRoute>
      ),
    },
    {
      path: "/view-trip/:id",
      element: (
        <ProtectedRoute>
          <Viewtrip />
        </ProtectedRoute>
      ),
    },
    {
      path: "/my-trips",
      element: (
        <ProtectedRoute>
          <MyTrips />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
