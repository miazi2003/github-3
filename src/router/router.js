import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layouts/MainLayOut";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth Pages/SignUp";
import SignIn from "../pages/Auth Pages/SignIn";
import About from "../pages/About us/AboutUs";
import TouristOverview from "../pages/Home/websiteOverview section/TouristOverview";
import PackageDetails from "../pages/Home/Tab/PackageDetails";
import AllPackages from "../pages/Home/AllPackages/AllPackages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
        { index: true, Component: Home },
        {path : "/signUp" , Component: SignUp},
        {path : "/signIn" , Component: SignIn},
        {path : "/about" , Component: About},
        {path : "/overview" , Component: TouristOverview},
        {path : "/package/:id" , Component: PackageDetails},
        {path : "/allPackages" , Component: AllPackages},
    ],
  },
]);
