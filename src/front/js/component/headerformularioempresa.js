import React from "react";
import "../../styles/home.css";

export const Headerformularioempresa = () => {
  return (
    <div
      className="p-5 text-center header"
      style={{
        backgroundImage: `url("https://i.ibb.co/K7CRPgy/franja-1-min.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "300px",
        width: "100%",
      }}
    >
      <h1 className="mb-3 tituloabout3">¡ENHORABUENA!</h1>
      <h4 className="subtitulo">
        Estás a un paso de encontrar el embajador perfecto para tu marca
      </h4>
    </div>
  );
};
