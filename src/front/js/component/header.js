import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Header = () => {
  return (
    <div
      className="p-5 text-center header"
      style={{
        backgroundImage: `url("https://i.ibb.co/FDKVdF9/header-1.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "700px",
        width: "100%",
      }}
    >
      <h4 className="antetitulo">TE DAMOS LA BIENVENIDA A</h4>
      <h1 className="mb-3 titulo1">Influĕre</h1>

      <h4 className="subtitulo">
        La web donde empresas e influencers se unen para generar contenido de
        calidad.<br></br> Accede a nuestro directorio de colaboradores y llega a
        tu público objetivo.
      </h4>
      <br></br>
      <Link to="/formulario-influencers">
      <a className="btn btn-danger rounded-pill btn-lg mx-2" href="" role="button">
        INFLUENCER
      </a>
      </Link>
      <Link to="/formulario-empresa">
      <a className="btn btn-danger rounded-pill btn-lg" href="" role="button">
        EMPRESA
      </a>
      </Link>
    </div>
  );
};
