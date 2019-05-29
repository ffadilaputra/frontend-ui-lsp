import Tuk from "../pages/Tuk";
import Skema from "../pages/Skema";
import Unit from "../pages/Unit";
import Elemen from "../pages/Elemen";
import Kuk from "../pages/Kuk";

const routes: IRoute[] = [
  {
    component: Tuk,
    label: "Tuk",
    icon: "cube",
    path: "/tuk",
    private: true,
  },
  {
    component: Skema,
    label: "Skema",
    icon: "clipboard",
    path: "/skema",
    private: true,
  },
  {
    component: Unit,
    label: "Unit",
    icon: "folder",
    path: "/unit",
    private: true,
  },
  {
    component: Elemen,
    label: "Elemen",
    icon: "archive",
    path: "/elemen",
    private: true,
  },
  {
    component: Kuk,
    label: "Kuk",
    icon: "file alternate",
    path: "/kuk",
    private: true,
  },
]

export default routes
