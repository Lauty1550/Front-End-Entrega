import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Card.css";
import "../css/Titulo.css";

export default class Home extends Component {
  render() {
    return (
      <div className="container mt-3">
        <h1 className="titulo">Inicio</h1>
        <Link
          to="/proyectos"
          className="card"
          style={{ width: "18rem", textDecoration: "none" }}
        >
          <img src="..." className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">Proyectos</h5>
            <p className="card-text">Administra tus proyectos</p>
          </div>
        </Link>
      </div>
    );
  }
}
