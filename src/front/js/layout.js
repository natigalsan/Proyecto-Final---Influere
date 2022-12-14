import React, {Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { VistaInflu } from "./pages/vistaInflu";
import {VistaInfluPb} from "./pages/vistaInfluPb";
import { VistaEmp } from "./pages/vistaEmp";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { FormInfluencers } from "./component/formulario-influencers";
import { FormEmpresas } from "./component/formulario-empresas";
import { Directorio } from "./pages/directorio";
import { EditarEmpresa } from "./component/editar-empresa";
import { EditarInfluencer } from "./component/editar-influencer";
import EnviarEmail from "./component/enviarEmail";
import { CloudinaryTest } from "./component/cloudinary-test";
// import { AddFavInflu } from "./component/addFavInflu";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/cloudinary">
              <CloudinaryTest />
            </Route>
            <Route exact path="/formulario-influencers">
              <FormInfluencers />
            </Route>
            <Route exact path="/formulario-empresas">
              <FormEmpresas />
            </Route>
            <Route exact path="/editar-empresa/:id">
              <EditarEmpresa />
            </Route>
            <Route exact path="/editar-influencer/:ig_user">
              <EditarInfluencer />
            </Route>            
            <Route exact path="/demo">
              <Demo />
            </Route>
            <Route exact path="/Directorio">
              <Directorio />
            </Route>
            <Route exact path="/single/:theid">
              <Single />
            </Route>
            <Route exact path="/vistaInflu/:id">
              <VistaInflu />
            </Route>
            <Route exact path="/vistaInfluPb/:id">
              <VistaInfluPb />
            </Route>
            <Route exact path="/enviarEmail/">
              <EnviarEmail />
            </Route>
            <Route exact path="/vistaEmp/:id">
              <VistaEmp />
            </Route>
            {/* <Route exact path="/addFavInflu/:id">
              <AddFavInflu />
            </Route> */}
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
