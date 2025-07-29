import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layouts/MainLayOut";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth Pages/SignUp";
import SignIn from "../pages/Auth Pages/SignIn";
import About from "../pages/About us/AboutUs";
import TouristOverview from "../pages/Home/websiteOverview section/TouristOverview";
import PackageDetails from "../pages/Home/Tab/PackageDetails";
import AllPackages from "../pages/Home/AllPackages/AllPackages";
import AddStory from "../pages/AddStory/AddStory";
import MyBookings from "../pages/Booking manage/MyBookings";
import ManageStories from "../pages/Manage story/ManageStories";
import UpdateStory from "../pages/Manage story/updateStory/UpdateStory";
import ViewStory from "../pages/Community/ViewStory";
import StoryCommunity from "../pages/Community/StoryCommunity";
import TourGuideProfile from "../pages/TourGuideProfile/TourGuideProfile";
import TourGuideForm from "../pages/TourGuideForm/TourGuideForm";
import DashboardLayout from "../Layouts/DashBoardLayout";
import ProtectedRoute from "./protected/ProtectedRoute";
import ManageProfile from "../pages/Manage profile/ManageProfile";
import AllAssignedTours from "../pages/AllAssigned/AllAssignedTours";
import StatCards from "../pages/admin state/Statcards";
import AddPackageForm from "../Component/AddPackages/AddPackages";
import ManageUsers from "../pages/manage users/ManageUsers";
import ManageCandidates from "../pages/Manage Candidate/ManageCandidates";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      { index: true, Component: Home },
      { path: "/signUp", Component: SignUp },
      { path: "/signIn", Component: SignIn },
      { path: "/about", Component: About },
      { path: "/overview", Component: TouristOverview },
      { path: "/package/:id", Component: PackageDetails },
      { path: "/allPackages", Component: AllPackages },

      { path: "/community", Component: StoryCommunity },
      { path: "/viewStory/:id", Component: ViewStory },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin", "tourist", "guide"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
   
      { path: "guideProfile/:email", element: <ProtectedRoute><TourGuideProfile></TourGuideProfile></ProtectedRoute> },
      { path: "guideForm", element: <ProtectedRoute><TourGuideForm></TourGuideForm></ProtectedRoute> },
      { path: "manageStories", element: <ProtectedRoute><ManageStories></ManageStories></ProtectedRoute> },
      { path: "updateStory/:id", element: <ProtectedRoute><UpdateStory></UpdateStory></ProtectedRoute> },
      { path: "addStory", element: <ProtectedRoute><AddStory></AddStory></ProtectedRoute> },
      { path: "manageBookings", element: <ProtectedRoute><MyBookings></MyBookings></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><ManageProfile></ManageProfile></ProtectedRoute>,},
      { path: "allTour", element: <ProtectedRoute allowedRoles={["admin"]}><AllAssignedTours></AllAssignedTours></ProtectedRoute>},
      {path : "addPackages" , element : <ProtectedRoute allowedRoles={["admin"]}><AddPackageForm></AddPackageForm></ProtectedRoute>},
      {path : "manageUsers" , element : <ProtectedRoute allowedRoles={["admin"]}><ManageUsers></ManageUsers></ProtectedRoute>},
      {path : "manageCandidates" , element : <ProtectedRoute allowedRoles={["admin"]}><ManageCandidates></ManageCandidates></ProtectedRoute>},
    ],
  },
]);
