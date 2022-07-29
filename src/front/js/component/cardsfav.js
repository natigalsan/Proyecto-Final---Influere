import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";

export const Cardsfav = ({
  imagen,
  nombre,
  username,
  seguidores,
  sector,
  ubicacion,
}) => {
  const yourformelement = {};
  yourformelement.submit = () => {};

  function clicked() {
    if (confirm('¿Está seguro de eliminar este Influencer de su lista?')) {
      yourformelement.submit();
      location.reload();
    } else {
      location.reload();
      return false;
    }
  } 


  const userid = sessionStorage.getItem("userid");
  const userType = sessionStorage.getItem("userType");
  const { store, actions } = useContext(Context); 

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imagen} width="320" />
        <Card.Body>
          <Card.Title>
            <h4 className="titulocards">
              <b>{username}</b>
            </h4>
          </Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <b>Seguidores:</b>{" "}
              <NumberFormat
                value={seguidores}
                displayType={"text"}
                thousandSeparator={true}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Categoria:</b> {sector}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Ciudad:</b> {ubicacion}
            </ListGroup.Item>
          </ListGroup>
          <br></br>
          <Link to={"/vistainfluPb/" + username}>
            <button href="#" class="btn btn-primary rounded-pill">
              VER MÁS
            </button>
          </Link>
          {userType == "empresa" ? (
            <button type="button" className="btn btn-danger likeBtn"
            onClick={() => {
            
              actions.addFavInflu(username);
            }}> 
              &#9825;
            </button>
            
          ) : (
            ""
          )}
          <button type="button" className="btn btn-danger likeBtn" style={{marginRight:"2px"}}
          onClick = {()=>{
            actions.deleteFav(userid, username);
            clicked()

          }}
          >

          {/* <a href={`/vistaEmp/${userid}}`} target="_blank" title="Die Homepage" rel="nofollow"></a> */}
          <i class="far fa-trash-alt" ></i></button>
        </Card.Body>
      </Card>
      <br></br>
    </Col>
  );
};