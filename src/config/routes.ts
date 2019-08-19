import Tuk from "../pages/Tuk";
import Skema from "../pages/Skema";
import Unit from "../pages/Unit";
import Elemen from "../pages/Elemen";
import Kuk from "../pages/Kuk";
import Login from "../pages/Login";
import Pemohon from "../pages/Pemohon";
import Berkas from "../pages/Berkas";
import Relevansi from "../pages/Relevansi";

const routes: IRoute[] = [
  {
    name: "tuk",
    component: Tuk,
    label: "Tuk",
    icon: "cube",
    path: "/tuk",
    private: true
  },
  {
    name: "tuk",
    component: Skema,
    label: "Skema",
    icon: "clipboard",
    path: "/skema",
    private: true
  },
  {
    name: "unit",
    component: Unit,
    label: "Unit",
    icon: "folder",
    path: "/unit",
    private: true
  },
  {
    name: "elemen",
    component: Elemen,
    label: "Elemen",
    icon: "archive",
    path: "/elemen",
    private: true
  },
  {
    name: "kuk",
    component: Kuk,
    label: "Kuk",
    icon: "file alternate",
    path: "/kuk",
    private: true
  },
  {
    name: "login",
    component: Login,
    label: "Login",
    path: "/login",
    private: false,
    hide: true
  },
  {
    name: "pemohon",
    component: Pemohon,
    label: "Pemohon",
    icon: "user",
    path: "/pemohon",
    private: false
  },
  {
    name: "Relevansi",
    component: Relevansi,
    label: "Relevansi",
    icon: "file",
    path: "/relevansi",
    private: true
  },
  {
    name: "Berkas",
    component: Berkas,
    label: "Berkas",
    icon: "file",
    path: "/berkas",
    private: true
  }
];

export default routes;
