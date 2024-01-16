import Landing from "@/pages/common/landing/Landing";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Contact from "@/pages/common/contact/Contact";
import AboutUs from "@/pages/common/about-us/AboutUs";
import Register from "@/pages/common/register/Register";
import Login from "@/pages/common/login/Login";
import UserCars from "@/pages/user/cars/UserCars";
import BlogMain from "@/pages/blog/BlogMain";
import Reservations from "@/pages/user/reservations/Reservations";
import Reviews from "@/pages/common/reviews/Reviews";
import AddReview from "@/pages/common/reviews/AddReview";
import BlogArticle from "@/pages/blog/BlogArticle";
import Car from "@/pages/car/Car";

export const ROUTES = [
  {
    name: "witamy!",
    url: "/",
    component: (
      <ContentWrapper>
        <Landing />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "o nas",
    url: "/about-us",
    component: (
      <ContentWrapper>
        <AboutUs />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "moje Auta",
    url: "/my-cars",
    component: (
      <ContentWrapper>
        <UserCars />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "rezerwacje",
    url: "/my-reservations",
    component: (
      <ContentWrapper>
        <Reservations />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "opinie",
    url: "/reviews",
    component: (
      <ContentWrapper>
        <Reviews />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "dodaj opinie",
    url: "/reviews/add-review",
    component: (
      <ContentWrapper>
        <AddReview />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "kontakt",
    url: "/contact",
    component: (
      <ContentWrapper>
        <Contact />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "blog",
    url: "/blog",
    component: (
      <ContentWrapper>
        <BlogMain />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "blog",
    url: "/blog/:articleLink",
    component: (
      <ContentWrapper>
        <BlogArticle />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "logowanie",
    url: "/login",
    component: (
      <ContentWrapper>
        <Login />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "rejestracja",
    url: "/register",
    component: (
      <ContentWrapper>
        <Register />
      </ContentWrapper>
    ),
    access: [],
  },
  {
    name: "samochód",
    url: "/car-info/:id",
    component: (
      <ContentWrapper>
        <Car />
      </ContentWrapper>
    ),
    access: [],
  },
];
