import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Modal = ({sesion}) => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("userType");
  const userig = sessionStorage.getItem("userig");
  const userid = sessionStorage.getItem("userid");
  const history = useHistory();
  const handleClick = () => {
    if (sesion == "influencer") {
      actions.login(email, password);
    } else if (sesion == "empresa") {
      actions.loginempresa(email, password);
    }
  };

  if (token && token != "" && token != undefined) {
    if (userType == "influencer") {
      sessionStorage.setItem("justLogin", true);
      history.push(`/vistaInflu/${userig}`);
    } else if (userType == "empresa") {
      sessionStorage.setItem("justLogin", true);
      history.push(`/vistaEmp/${userid}`);
    }
  }

  return (
    <div
      className="modal fade"
      id={sesion}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content" id="modal-login">
          <div className="modal-header bg bg-primary text-white">
            <h3>Iniciar Sesión</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body" id="Login-us">
            <div>
              <div className="mb-3">
                <label for="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                  data-bs-dismiss="modal"
                  
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
            <br></br>
            <br></br>
            <div
              className="row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
              }}
            >
              <div className="col-5">
                <Link to="/formulario-influencers">
                  <button
                    type="button"
                    class="btn btn-outline-warning"
                    style={{ fontSize: "85%" }}
                    data-bs-dismiss="modal"
                  >
                    Registrar Empresa
                  </button>
                </Link>
              </div>
              <div className="col-5">
                <Link to="/formulario-empresas">
                  <button
                    type="button"
                    class="btn btn-outline-warning "
                    style={{ fontSize: "85%" }}
                    data-bs-dismiss="modal"
                  >
                    Registrar Influencer
                  </button>
                </Link>
              </div>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
