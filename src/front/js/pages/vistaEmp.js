import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Cardsfav } from "../component/cardsfav";
import { Headervistaempresa } from "../component/headervistaempresa";
import { useParams } from "react-router-dom";

export const VistaEmp = () => {
  sessionStorage.setItem("justLogin", false);
  const { store, actions } = useContext(Context);
  const parametro = useParams();

  useEffect(() => {
    actions.conseguirEmpresa(parametro.id);
    actions.conseguirFav(parametro.id);
  }, []);
  

  useEffect(() => {
    actions.privadoEmpresa(parametro.id);
  }, []);

  if (store.permiso) {
    return (
      <div>
        <Headervistaempresa />

        <div className="container">
          {/* ------------------------ */}
          <br></br>
          {/* ------------------------ */}
          <div
            className="row container"
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <div class="btn-group" style={{ height: "40px", width: "40px" }}>
              {/* <button type="button" class="btn btn-light"><i class="fas fa-home"><a class="dropdown-item" href={"/vistaInflu"}></a></i></button> */}
              <button
                type="button"
                class="btn btn-warning dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-user-edit"></i>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item"
                    href={`/editar-empresa/${parametro.id}`}
                  >
                    Editar Perfil
                  </a>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* ----------------------------------------------------------------------------------- */}
          <div className="container" style={{ maxWidth: "3000px" }}>
            <div
              className="container"
              style={{ paddingLeft: "15px", textAlign: "center" }}
            >
              <h1 className="tituloabout" style={{ color: "#ffc107" }}>
                DATOS DE EMPRESA
              </h1>
              <h1 className="title1" style={{ color: "#302880" }}>
                Nombre:{" "}
                {`${store.datosEmpresa.nombre} ${store.datosEmpresa.apellidos}`}
              </h1>
              <h4 className="title1 " style={{ opacity: "80%" }}>
                Razón Social: {`${store.datosEmpresa.razon_social}`}
              </h4>
              <h4 className="title1 " style={{ opacity: "80%" }}>
                Sector: {`${store.datosEmpresa.sector}`}
              </h4>
              <h5 className="title1 " style={{ opacity: "80%" }}>
                Ubicación:{" "}
                {`${store.datosEmpresa.autonomia} (${store.datosEmpresa.ciudad})`}
              </h5>
              <h7 className="title1 " style={{ opacity: "80%" }}>
                Email: {`${store.datosInfluencer.email}`}
              </h7>
              <br></br>
              <br></br>
              <h6
                className="title1 "
                style={{ opacity: "40%", maxWidth: "100%" }}
              >
                {`${store.datosEmpresa.bio}`}
              </h6>
            </div>
            {/* ------------------------ */}
            <br></br>
            <br></br>
            {/* ------------------------ */}
            <div className=" container-fluid">
              <h1
                className="tituloabout"
                style={{ textAlign: "center", color: "#ffc107" }}
              >
                INFLUENCERS FAVORITOS{" "}
              </h1>
            </div>

          {/* ------------------------ */}
          <br></br>
          <br></br>
          {/* ------------------------ */}
          <div className="row container">
            <div className="row ">
              
              {store.favInflu?.map((obj, id) => {
                        return (
                            <div key={id} className="col-4">
                                <Cardsfav nombre={obj.nombre} username={obj.ig_user} sector={obj.categoria} seguidores={obj.seguidores} i={id} imagen={obj.profilepic} ubicacion={obj.ciudad}/>
                            </div>
                        );
                    })} 
                
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  } else {
    return <h1>404 la pagina no existe</h1>;
  }
};
