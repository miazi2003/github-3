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
      { path: "guideProfile/:email", Component: TourGuideProfile },
      { path: "guideForm", Component: TourGuideForm },
      { path: "manageStories", Component: ManageStories },
      { path: "updateStory/:id", Component: UpdateStory },
      { path: "addStory", Component: AddStory },
      { path: "manageBookings", Component: MyBookings },
      { path: "profile", Component: ManageProfile,},
    ],
  },
]);
