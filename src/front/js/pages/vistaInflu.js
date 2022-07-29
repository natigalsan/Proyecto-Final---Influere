import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { IframeInstagram } from "../component/iFrameInsta";
import { useParams } from "react-router-dom";
import { Headervistainflu } from "../component/headervistainflu";
import NumberFormat from 'react-number-format';

export const VistaInflu = () => {
  sessionStorage.setItem("justLogin", false);
  const { store, actions } = useContext(Context);
  // const [url, setUrl] = useState("");
  const parametro = useParams();

  //  useEffect para que me consiga un actions cuando se renderice el componente y traer la informacion al perfil: 
  useEffect(() => {
    actions.conseguirInfluencer(parametro.id);
    // actions.agregar(url);
  }, []);
 useEffect ( () => {
  actions.privado(parametro.id);
 }, []);
  if (store.permiso){
  return (
    <div>
      <Headervistainflu />

      {/* --------------------------------------------------- */}
      
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div className="row"
          class="btn-group"
          style={{ height: "40px", width: "40px", marginRight: "100px" }}
        >
          <button
            type="button"
            class="btn btn-warning dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{}}
          >
            <i class="fas fa-at"></i>
          </button>
          <ul class="dropdown-menu">
            <li type="button" style={{ float: "left" }}>
              <a href={`https://www.instagram.com/${store.datosInfluencer.ig_user}`} target="_blank">
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
                  }
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    marginTop: "5px",
                    marginLeft: "10px",
                  }}
                />
              </a>
            </li>

          </ul>
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
              <a class="dropdown-item" href={`/editar-influencer/${parametro.id}`}>
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
        <br></br>
        <br></br>
      </div>
      <br></br>
      <br></br>
      {/* ------------------------------------------------- */}
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="row ">
          <div
            className="col-md-6"
            style={{
              paddingLeft: "15px",
              textAlign: "right",
            }}>
            <h1 className="tituloabout" style={{ color: "#ffc107" }}>DATOS DEL INFLUENCER
            </h1>
            <span
              action="/influencers"
              method="GET"
              className="title1"
              style={{ color: "#363263" }}
            ><strong> Nombre: {`${store.datosInfluencer.nombre} ${store.datosInfluencer.apellidos}`}</strong>

            </span>
            <h2 className="title1 " style={{ opacity: "80%" }}>Sector: {`${store.datosInfluencer.categoria}`}
            </h2>
            <h4 className="title1 " style={{ opacity: "80%" }}>
              Usuario: {`${store.datosInfluencer.ig_user}`}
            </h4>
            <h6 className="title1 " style={{ opacity: "80%" }}>
              Email: {`${store.datosInfluencer.email}`}
            </h6>
            <br></br>
            <span className="title1 " style={{ opacity: "80%" }}>
              Ubicación: {`${store.datosInfluencer.autonomia} (${store.datosInfluencer.ciudad})`}

            </span>
            <br></br>
            <br></br>
            <h5
              className="title1 "
              style={{ opacity: "40%", maxWidth: "100%", marginLeft: "50%" }}
            > {`${store.datosInfluencer.bio}`}

            </h5>
          </div>
          <div
            className="col-md-6 rounded-circle "
            style={{
              display: "flex",
              placeContent: "left"
            }}
          >
            <img
              src={`${store.datosInfluencer.profilepic}`}
              style={{
                maxWidth: "500px",
                opacity: "100%",
                transform: "revert",
                marginLeft: "5%",
                borderRadius: "15px"


              }}
            />
          </div>
        </div>

        <br></br>
        <br></br>
        <div className="row" style={{ margin: "auto 25% auto 25%" }}>
          <table class="table">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th scope="col">{`${store.datosInfluencer.publicaciones}`}</th>
                <th scope="col"><NumberFormat value={`${store.datosInfluencer.followers}`} displayType={'text'} thousandSeparator={true}/></th>
                <th scope="col">{`${store.datosInfluencer.seguidos}`}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>Publicaciones</td>
                <td>Seguidores</td>
                <td>Seguidos</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>

        <h1 className="tituloabout" style={{ textAlign: "center", color: "#ffc107" }}>
          MIS ÚLTIMAS PUBLICACIONES{" "}
        </h1>
        {/* ---------------AGREGAR UN POST NUEVO-------------------------------------------------------------------------- */}

        {/* <div className="text-center mt-5 title1">
          <h4 style={{ color: "#302880" }}>Agrega un nuevo post:</h4>
          */}

        {/* <form>
            <div className="todo-list">
              <div className="file-input">
                <input
                  type={"text"}
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                />

                <button
                  type="button"
                  class="btn-light"
                  style={{ color: "#302880" }}
                  // disabled={description ? "" : "disabled"}
                  onClick={() => {
                    actions.agregar(url);
                    setUrl("");
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          </form> */}
        {/* </div> */}
        <br></br>
        <br></br>
        <br></br>
        {/* --------------------ESPACIO DONDE SE AGREGARÁN LOS POST --------------------------------------------------------*/}

        <div className="row" style={{marginBottom:"50px"}}>
          <div className="col-4" style={{display:" flex", justifyContent:"center", alignContent:"center"}} >
            <IframeInstagram url={store.datosInfluencer.post1} style={{ height: "600px", width: "300px" }} />
          </div>
          <div className="col-4" style={{display:" flex", justifyContent:"center", alignContent:"center"}}>
            <IframeInstagram url={store.datosInfluencer.post2} style={{ height: "600px", width: "300px" }} />

          </div>

          <div className="col-4" style={{display:" flex", justifyContent:"center", alignContent:"center"}}>
            <IframeInstagram url={store.datosInfluencer.post3} style={{ height: "600px", width: "300px" }} />

          </div>
        </div>
        <div className="row" >
          <div className="col-4" style={{display:" flex", justifyContent:"center", alignContent:"center"}}>
            <IframeInstagram url={store.datosInfluencer.post4} style={{ height: "600px", width: "300px" }} />

          </div>
          <div className="col-4" style={{display:" flex", justifyContent:"center", alignContent:"center"}}>
            <IframeInstagram url={store.datosInfluencer.post5} style={{ height: "600px", width: "300px"}} />

          </div>

          <div className="col-4" style={{display:" flex", justifyContent:"center", alignContent:"center"}}>
            <IframeInstagram url={store.datosInfluencer.post6} style={{ height: "600px", width: "300px" }} />

          </div>
        </div>

        {/* <div>
              
          {store.posts?.map((e, i) => {
            return (
              <div key={i} className="col-4">
                <IframeInstagram url={e} />
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
      }
      else {
        return (
          <h1>404 la pagina no existe</h1>
        );
      }
};
