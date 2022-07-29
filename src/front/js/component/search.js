import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";

export const Search = () => {
  const [categoria, setCategoria] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [seguidores, setSeguidores] = useState("");
  const [precioPubli, setPrecioPubli] = useState("");
  const { store, actions } = useContext(Context);

  function handleChangeCategoria(event){
    setCategoria(event.target.value)
  }
  function handleChangeUbicacion(event){
    setUbicacion(event.target.value)
  }
  function handleChangeSeguidores(event){
    setSeguidores(event.target.value)
  }
  function handleChangePrecioPubli(event){
    setPrecioPubli(event.target.value)
  }

  function handleClick (){
    actions.buscar(categoria, ubicacion, seguidores, precioPubli);
  }
  return (
    <div
      className="mask d-flex align-items-center my-5"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 col-lg-8 col-xl-12 mx-auto rounded">
            <div className="card bg-warning">
              <div className="card-body p-3">
                <h6 className="busqueda">BÚSQUEDA AVANZADA</h6>

                <div className="row">
                  <div className="col-md-3 mb-3 ms-5">
                    <div class="dropdown">
                      <select
                        class="btn btn-secondary dropdown-toggle"
                        id="dropdownMenuButton1"
                        value={categoria}
                        onChange={handleChangeCategoria}
                        defaultValue=""
                      >
                        <option value="">Categoria</option>
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
                  <div className="col-md-3 mb-3">
                    <div className="dropdown">
                      <select
                        class="btn btn-secondary dropdown-toggle"
                        id="dropdownMenuButton1"
                        value={seguidores}
                        onChange={handleChangeSeguidores}
                        defaultValue=""
                      >
                          <option value="">
                            Seguidores
                          </option>
                          <option value="1">
                            Menos de 100.000
                          </option>
                          <option value="2">
                            Entre 100.000 y 500.000
                          </option>
                          <option value="3">
                            Entre 500.000 y 1 millón
                          </option>
                          <option value="4">
                            Más de 1 millón
                          </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="dropdown">
                    <select
                        class="btn btn-secondary dropdown-toggle"
                        id="dropdownMenuButton1"
                        value={precioPubli}
                        onChange={handleChangePrecioPubli}
                        defaultValue=""
                      >
                          <option value="">
                            Precio por Publicación
                          </option>
                          <option value="1">
                            0€ - 100€
                          </option>
                          <option value="2">
                            100€ - 300€
                          </option>
                          <option value="3">
                            300€ - 500€
                          </option>
                          <option value="4">
                            + 500€
                          </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2 mb-2">
                    <div className="dropdown">
                      <select
                        class="btn btn-secondary dropdown-toggle"
                        id="dropdownMenuButton1"
                        value={ubicacion}
                        onChange={handleChangeUbicacion}
                        defaultValue=""
                      >
                        <option value="">Ubicación</option>
                        <option value="Andalucía">Andalucía</option>
                        <option value="Aragón">Aragón</option>
                        <option value="Canarias">Canarias</option>
                        <option value="Cantabria">Cantabria</option>
                        <option value="Castilla y León">Castilla y León</option>
                        <option value="Castilla-La Mancha">Castilla-La Mancha</option>
                        <option value="Cataluña">Cataluña</option>
                        <option value="Ceuta">Ceuta</option>
                        <option value="Comunidad de Madrid">Comunidad de Madrid</option>
                        <option value="Comunidad Valenciana">Comunidad Valenciana </option>
                        <option value="Extremadura">Extremadura</option>
                        <option value="Galicia">Galicia</option>
                        <option value="Islas Baleares">Islas Baleares</option>
                        <option value="La Rioja">La Rioja</option>
                        <option value="Melilla">Melilla</option>
                        <option value="Navarra">Navarra</option>
                        <option value="País Vasco">País Vasco</option>
                        <option value="Principado de Asturias">Principado de Asturias</option>
                        <option value="Región de Murcia">Región de Murcia</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row d-flex flex-row-reverse">
                <div className="col-md-1 pe-1 ms-5">
                    <button type="button" className="btn btn-secondary fw-bold" onClick={handleClick}>
                      Buscar
                    </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
