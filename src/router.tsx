import CreateHero from "./components/CreateHero";
import HeroesList from "./components/HeroesList";

const AppRoutes = [
  {
    path: '/',
    element: <HeroesList />
  },
  {
    path: '/create',
    element: <CreateHero />
  }
];

export default AppRoutes;
