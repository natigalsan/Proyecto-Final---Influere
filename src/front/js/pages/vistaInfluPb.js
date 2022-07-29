import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { IframeInstagram } from "../component/iFrameInsta";
import { VistaInflu } from "./vistaInflu";
import { Link, useParams } from "react-router-dom";
import { Headervistainflu } from "../component/headervistainflu";
import NumberFormat from 'react-number-format';

export const VistaInfluPb = () => {
  const { store, actions } = useContext(Context);
  const [url, setUrl] = useState("");
  const parametro = useParams();
  const userid = sessionStorage.getItem("userid");
  const userType = sessionStorage.getItem("userType");

  useEffect(() => {
    actions.conseguirInfluencer(parametro.id);
  }, []);

  return (
    <div>
      <Headervistainflu />

      {/* --------------------------------------------------- */}
      <div
        class="btn-group container"
        style={{
          height: "40px",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        {/* <button type="button" class="btn btn-light"><i class="fas fa-home"><a class="dropdown-item" href={"/vistaInflu"}></a></i></button> */}
        { userType == "empresa"?
        <Link to="/enviarEmail">
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginRight: "5px", maxWidth: "200px" }}
        >
          <a>Enviar mensaje</a>
        </button>
        </Link>
        : ""}
        <button
            type="button"
            class="btn btn-danger likeBtn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ marginRight: "5px", maxWidth: "50px" }}
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
        { userType == "empresa"?
        <button
          type="button"
          className="btn btn-danger likeBtn"
          style={{ maxWidth: "40px" }}
          onClick={() => {
            actions.addFavInflu(store.datosInfluencer.ig_user);
          }}
        >
          <i class="far fa-heart"></i>
        </button>
        : ""}
      </div>

      <br></br>
      <br></br>
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="row ">
          <div
            className="col-md-6"
            style={{
              paddingLeft: "15px",
              textAlign: "right",
            }}
          >
            <h1 className="tituloabout" style={{ color: "#ffc107" }}>
              DATOS DEL INFLUENCER{" "}
            </h1>
            <span
              action="/influencers"
              method="GET"
              className="title1"
              style={{ color: "#363263" }}
            >
              <strong>
                {" "}
                Nombre:{" "}
                {`${store.datosInfluencer.nombre} ${store.datosInfluencer.apellidos}`}
              </strong>
            </span>
            <h2 className="title1 ">
              Sector: {`${store.datosInfluencer.categoria}`}
            </h2>
            <h4 className="title1 " style={{ opacity: "80%" }}>
              Usuario: {`${store.datosInfluencer.ig_user}`}
            </h4>
            {userType == "empresa"? 
            <h4 className="title1 " style={{ opacity: "80%" }}>
              Email: {`${store.datosInfluencer.email}`}
            </h4>
            : ""}
            <h6 className="title1 " style={{ opacity: "80%" }}>
              Provincia (ciudad):{" "}
              {`${store.datosInfluencer.autonomia} ${store.datosInfluencer.ciudad}`}
            </h6>
            <br></br>
            <br></br>
            <h5
              className="title1 "
              style={{ opacity: "40%", maxWidth: "100%", marginLeft: "30%" }}
            >
              {`${store.datosInfluencer.bio}`}
            </h5>
          </div>
          <div
            className="col-md-6 rounded-circle "
            style={{
              display: "flex",
              placeContent: "left",
            }}
          >
            <img
              src={`${store.datosInfluencer.profilepic}`}
              style={{
                maxWidth: "500px",
                opacity: "100%",
                transform: "revert",
                marginLeft: "5%",
                borderRadius: "15px",
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

        <h1
          className="tituloabout"
          style={{ textAlign: "center", color: "#ffc107" }}
        >
          ÚLTIMAS PUBLICACIONES
        </h1>

        <br></br>
        <br></br>
        <br></br>
        {/* --------------------ESPACIO DONDE SE AGREGARÁN LOS POST --------------------------------------------------------*/}
        <div className="row" style={{ marginBottom: "60px" }}>
          <div
            className="col-4"
            style={{
              display: " flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <IframeInstagram
              url={store.datosInfluencer.post1}
              style={{ height: "600px", width: "300px" }}
            />
          </div>
          <div
            className="col-4"
            style={{
              display: " flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <IframeInstagram
              url={store.datosInfluencer.post2}
              style={{ height: "600px", width: "300px" }}
            />
          </div>

          <div
            className="col-4"
            style={{
              display: " flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <IframeInstagram
              url={store.datosInfluencer.post3}
              style={{ height: "600px", width: "300px" }}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="col-4"
            style={{
              display: " flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <IframeInstagram
              url={store.datosInfluencer.post4}
              style={{ height: "600px", width: "300px" }}
            />
          </div>
          <div
            className="col-4"
            style={{
              display: " flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <IframeInstagram
              url={store.datosInfluencer.post5}
              style={{ height: "600px", width: "300px" }}
            />
          </div>

          <div
            className="col-4"
            style={{
              display: " flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <IframeInstagram
              url={store.datosInfluencer.post6}
              style={{ height: "600px", width: "300px" }}
            />
          </div>
        </div>

        {/* <div className="row ">
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
};

//         {/* <button type="button" class="btn btn-light"><i class="fas fa-home"><a class="dropdown-item" href={"/vistaInflu"}></a></i></button> */}
//         <button
//           type="button"
//           className="btn btn-outline-primary"
//           style={{ marginRight: "5px", maxWidth: "200px" }}
//         >
//           <a href={"/enviarEmail"}>Enviar mensaje</a>
//         </button>

//         <button
//           type="button"
//           className="btn btn-outline-primary"
//           style={{ maxWidth: "40px" }}
//           onClick={(name) => {
//             actions.addFavInf(name);
//           }}
//         >
//           <i class="far fa-heart"></i>
//         </button>
//       </div>
//     </div>
//     {/* -------------------------------------- */}
//
