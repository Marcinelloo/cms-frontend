import Landing from "@/pages/common/landing/Landing";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Contact from "@/pages/common/contact/Contact";
import AboutUs from "@/pages/common/about-us/AboutUs";
import Register from "@/pages/common/register/Register";
import Login from "@/pages/common/login/Login";
import UserCars from "@/pages/user/cars/UserCars";
import BlogMain from "@/pages/blog/BlogMain";
import Reservations from "@/pages/user/reservations/Reservations";

export const ROUTES = [
  {
    name: "Landing",
    url: "/",
    component: (
      <ContentWrapper>
        <Landing />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "About Us",
    url: "/about-us",
    component: (
      <ContentWrapper>
        <AboutUs />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "My Cars",
    url: "/my-cars",
    component: (
      <ContentWrapper>
        <UserCars />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "My reservations",
    url: "/my-reservations",
    component: (
      <ContentWrapper>
        <Reservations />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "Contact",
    url: "/contact",
    component: (
      <ContentWrapper>
        <Contact />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "Blog",
    url: "/blog",
    component: (
      <ContentWrapper>
        <BlogMain />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "Login",
    url: "/login",
    component: (
      <ContentWrapper>
        <Login />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "Register",
    url: "/register",
    component: (
      <ContentWrapper>
        <Register />
      </ContentWrapper>
    ),
    access: [],
  },
];
