import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { CardsInflu } from "./cardsInfluencers";
import { Container, Row, Col } from "react-bootstrap";

export const Carruselinfluencers = () => {
  const { store, actions } = useContext(Context);
  return (
    <Container>
      <Row>
        <Col>
          <br></br>
          <br></br>
          <h4 className="antetitulo4">¿READY PARA DAR EL SALTO?</h4>
          <h1
            className="text-center pb-2 tituloabout"
            href="https://3000-jaygosling-influere-ai7nxhchf88.ws-eu47.gitpod.io/Directorio"
          >
            DIRECTORIO DE INFLUENCERS
          </h1>
          <br></br>
        </Col>
      </Row>
      <Row>
        <div className="overflow-auto row flex-row flex-nowrap mt-4 pb-4 pt-2 section">
          {store.influencers?.map((obj, i) => {
            if (i<10) {
            return (
              <div className="col-3">
                <CardsInflu
                  nombre={obj.name}
                  username={obj.ig_user}
                  sector={obj.categoria}
                  i={i}
                  seguidores={obj.seguidores}
                  imagen={obj.profilepic}
                  ubicacion={obj.ciudad}
                />
              </div>
            );}
          })}
        </div>
      </Row>
      <br></br> <br></br>
    </Container>
  );
};
