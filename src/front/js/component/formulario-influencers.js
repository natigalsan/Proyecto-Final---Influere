import React, { Component, useState, useEffect, useContext } from "react";
import { Headerformularioinfluencer } from "./headerformularioinfluencer";
import { Context } from "../store/appContext";
import axios from "axios";

export const FormInfluencers = () => {
  var picUrl = ""
  const [instaPic, setInstaPic] = useState("")
  var instaUser = ""
  /*   function uploadPicture() {

    } */
  var allData = {};
  var finalData = {};
  const [igLinks, addLinks] = useState([]);
  const { actions, store } = useContext(Context)
  function addData() {
    if (
      document.getElementById("password-influ").value ==
      document.getElementById("rep-password-influ").value
    ) {
      allData.email = document.getElementById("email-influ").value;
      allData.password = document.getElementById("password-influ").value;
      allData.apellidos = document.getElementById("apellidos").value;
      allData.nombre = document.getElementById("nombre").value;
      allData.autonomia = document.getElementById("autonomia").value;
      allData.ciudad = document.getElementById("ciudad").value;
      allData.bio = document.getElementById("bio").value;
      allData.ig_user = document.getElementById("ig-user").value;
      allData.categoria = document.getElementById("categoria").value;
      allData.precio_post = document.getElementById("precio-post").value;
      allData.precio_reel = document.getElementById("precio-reel").value;
      allData.precio_story = document.getElementById("precio-story").value;
      allData.post1 = igLinks[0];
      allData.post2 = igLinks[1];
      allData.post3 = igLinks[2];
      allData.post4 = igLinks[3];
      allData.post5 = igLinks[4];
      allData.post6 = igLinks[5];

      /*       actions.conseguirFotoPerfil(allData.ig_user)
            allData.profilepic = picUrl
            allData.followers = store.profileData?.followers */


      if (
        allData.email &&
        allData.password &&
        allData.apellidos &&
        allData.nombre &&
        allData.autonomia &&
        allData.ciudad &&
        allData.bio &&
        allData.ig_user &&
        allData.categoria &&
        allData.post1 &&
        allData.precio_post &&
        allData.precio_reel &&
        allData.precio_story
      ) {
        finalData = allData;
        addFollowers();
        setTimeout(() => { actions.registrarInfluencer(finalData) }, 5000);
      } else {
        alert("Todos los campos son obligatorios");
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  }

  function addFollowers() {
    fetch(
      process.env.BACKEND_URL + "/api/instagram/" + allData.ig_user
    )
      .then(response => response.json())
      .then(result => {
        finalData.seguidores = result.followers
        const formData = new FormData()
        formData.append("file", result.profilepic)
        formData.append("upload_preset", "influere_uns")
        axios.post("https://api.cloudinary.com/v1_1/influere/image/upload", formData).then((response) => { finalData.profilepic = response.data.url })
        console.log(finalData)
      })
      .catch((error) => console.log("addFollowers error ", error));
  }

  function plusButton() {
    if (igLinks.length == 6) {
      alert("Has llegado al máximo de enlaces posibles.");
    } else {
      addLinks([...igLinks, document.getElementById("ig-link").value]);
      document.getElementById("ig-link").value = "";
    }
  }

  return (
    <div>
      <Headerformularioinfluencer />

      <div className="container-fluid m-0 p-0">
        <div className="container-fluid pt-5">
          <p className="h1 text-center my-5 tituloabout">RELLENA TUS DATOS</p>
          <div className="container row d-flex justify-content-center text-end mx-auto mb-3">
            <div className="col">
              <div className="mb-3 row">
                <label
                  for="email-influ"
                  className="col-sm-3 col-form-label camposform"
                >
                  Email
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="email-influ"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="apellidos"
                  className="col-sm-3 col-form-label camposform"
                >
                  Apellidos
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="apellidos" />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="categoria"
                  className="col-sm-3 col-form-label camposform"
                >
                  Sector
                </label>
                <div className="col-sm-9 menu">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="categoria"
                    defaultValue="Selecciona"
                  >
                    <option value="Moda y belleza">Moda y belleza</option>
                    <option value="Maquillaje y cosméticos">
                      Maquillaje y cosméticos
                    </option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Fitness y gym">Fitness y gym</option>
                    <option value="Comida y recetas">Comida y recetas</option>
                    <option value="Mamá y premamá">Mamá y premamá</option>
                    <option value="Vegano y vegetariano">
                      Vegano y vegetariano
                    </option>
                    <option value="Deportes">Deportes</option>
                    <option value="Emprendimiento">Emprendimiento</option>
                    <option value="Viajes">Viajes</option>
                    <option value="Coches y motos">Coches y motos</option>
                    <option value="Reality y televisión">
                      Reality y televisión
                    </option>
                    <option value="Actores y cantantes">
                      Actores y cantantes
                    </option>
                    <option value="Mascotas">Mascotas</option>
                    <option value="Family friendly">Family friendly</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="mb-3 row">
                <label
                  for="password-influ"
                  className="col-sm-5 col-form-label camposform"
                >
                  Contraseña
                </label>
                <div className="col-sm-7">
                  <input
                    type="password"
                    className="form-control"
                    id="password-influ"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="nombre"
                  className="col-sm-5 col-form-label camposform"
                >
                  Nombre
                </label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" id="nombre" />
                </div>
              </div>
              <div className="mb-3 row d-flex">
                <label
                  for="autonomia"
                  className="col-sm-5 col-form-label camposform"
                >
                  C. Autónoma
                </label>
                <div className="col-sm-7">
                  <select
                    className="form-select menu"
                    aria-label="Default select example"
                    id="autonomia"
                    defaultValue="Selecciona"
                  >
                    <option value="Andalucía">Andalucía</option>
                    <option value="Aragón">Aragón</option>
                    <option value="Canarias">Canarias</option>
                    <option value="Cantabria">Cantabria</option>
                    <option value="Castilla y León">Castilla y León</option>
                    <option value="Castilla-La Mancha">
                      Castilla-La Mancha
                    </option>
                    <option value="Cataluña">Cataluña</option>
                    <option value="Ceuta">Ceuta</option>
                    <option value="Comunidad de Madrid">
                      Comunidad de Madrid
                    </option>
                    <option value="Comunidad Valenciana">
                      Comunidad Valenciana
                    </option>
                    <option value="Extremadura">Extremadura</option>
                    <option value="Galicia">Galicia</option>
                    <option value="Islas Baleares">Islas Baleares</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Melilla">Melilla</option>
                    <option value="Navarra">Navarra</option>
                    <option value="País Vasco">País Vasco</option>
                    <option value="Principado de Asturias">
                      Principado de Asturias
                    </option>
                    <option value="Región de Murcia">Región de Murcia</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="mb-3 row">
                <label
                  for="rep-password-influ"
                  className="col-sm-6 col-form-label camposform"
                >
                  Repite contraseña
                </label>
                <div className="col-sm-6">
                  <input
                    type="password"
                    className="form-control"
                    id="rep-password-influ"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="ig-user"
                  className="col-sm-6 col-form-label camposform"
                >
                  Usuario Instagram
                </label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" id="ig-user" />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="ciudad"
                  className="col-sm-6 col-form-label camposform"
                >
                  Ciudad
                </label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" id="ciudad" />
                </div>
              </div>
            </div>
          </div>
          <div className="container row d-flex justify-content-center mx-auto my-5 py-3">
            <div className="col-8">
              <p className="text-center camposform">
                Enlace a posts de promociones que hayas hecho como influencer
                (máximo 6)
              </p>
              <div className="d-flex ">
                <input
                  className="form-control menu"
                  type="text"
                  placeholder="Pega aquí el enlace a tu post"
                  aria-label="default input example"
                  id="ig-link"
                />
                <i
                  className="fas fa-plus m-auto ms-3"
                  onClick={() => plusButton()}
                ></i>
              </div>
              <div className="text-center mt-3" id="mostrar-ig-links">
                {igLinks.map((value, index) => {
                  return (
                    <li className="list-group-item" key={`${index}`}>
                      <div className="d-flex">
                        <div className="col-10">{value}</div>
                        <div className="col-2 text-end">
                          <i
                            className="fas fa-times"
                            id="cross"
                            onClick={() => {
                              let newItemsArray = igLinks.filter((v, i) => {
                                return i != index;
                              });
                              addLinks(newItemsArray);
                            }}
                          ></i>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="container-fluid row text-center mx-0 py-3">
            <div className="mb-3 col-8 mx-auto">
              <label for="bio" className="form-label camposform">
                Cuéntanos un poco más de ti
              </label>
              <textarea className="form-control" id="bio" rows="3"></textarea>
            </div>
          </div>
          <p className="h1 text-center my-5 tituloabout">
            INDÍCANOS TU RANGO DE PRECIOS
          </p>
          <div className="container-fluid row d-flex justify-content-center mx-auto">
            <div className="col-3 d-flex ">
              <label
                for="precio-post"
                className="col-sm-3 col-form-label text-end me-3 camposform"
              >
                Post
              </label>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="precio-post" />
              </div>
            </div>
            <div className="col-3 d-flex">
              <label
                for="precio-reel"
                className="col-sm-3 col-form-label text-end me-3 camposform"
              >
                Reel
              </label>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="precio-reel" />
              </div>
            </div>
            <div className="col-3 d-flex">
              <label
                for="precio-story"
                className="col-sm-3 col-form-label text-end me-3 camposform"
              >
                Story
              </label>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="precio-story" />
              </div>
            </div>
          </div>
          <div className="button-container my-5 d-flex justify-content-center pb-5">
            <button
              type="button"
              className="btn btn-danger rounded-pill btn-sm col-1 me-3"
              onClick={() => {
                delData();
              }}
            >
              BORRAR
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-pill btn-sm col-1 ms-3"
              onClick={() => {
                addData();
                //var theUser = document.getElementById("ig-user").value
                //uploadPicture("unl", instaPic)

              }}
            >
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
