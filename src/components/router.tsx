import { Link, Outlet } from "react-router-dom";
import FormeAjouterSoin from "./FormeAjouterSoin";
import FormePatient from "./FormePatient";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import Test from "./test";
import Menu from "./Menu";
import Test2 from "./test2";
import AffichePatients from "./affichePatients";
import AfficheSoins from "./afficheSoins";
import "../CSS/router.css";

export const Routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "formulaire_ajouter_patient",
        element: <FormePatient />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "formulaire_ajouter_soin",
        element: <FormeAjouterSoin />,
      },
      {
        path: "affiche_patients",
        element: <AffichePatients />,
      },
      {
        path: "affiche_soins",
        element: <AfficheSoins />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "test2",
        element: <Test2 />,
      },
    ],
  },
];

function Root() {
  return (
    <>
      <AppBar
        position="sticky"
      >
        <Tabs centered value={false}>
          <Tab label="Menu" value="/menu" component={Link} to={"/menu"} />
          <Tab
            label="Ajouter un patient"
            value="/formulaire_ajouter_patient"
            component={Link}
            to={"/formulaire_ajouter_patient"}
          />
          <Tab
            label="Ajouter un soin"
            value="/formulaire_ajouter_soin"
            component={Link}
            to={"/formulaire_ajouter_soin"}
          />
          <Tab
            label="Afficher les patients"
            value="/affiche_patients"
            component={Link}
            to={"/affiche_patients"}
          />
          <Tab
            label="Afficher les soins"
            value="/affiche_soins"
            component={Link}
            to={"/affiche_soins"}
          />
          <Tab
            label="Test"
            value="/test"
            component={Link}
            to={"/test"}
          />
          <Tab
            label="Test2"
            value="/test2"
            component={Link}
            to={"/test2"}
          />
        </Tabs>
      </AppBar>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
export default Root;
