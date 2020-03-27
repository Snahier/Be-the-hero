import React from "react"
import "./styles.scss"

import logoImg from "../../assets/logo.svg"
import { FiArrowLeft } from "react-icons/fi"
import { Link } from "react-router-dom"

const NewIncident = props => {
  return (
    <div className="NewIncident-component">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero logo" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form>
          <input placeholder="Título do caso" />
          <textarea placeholder="Descrição"></textarea>
          <input placeholder="Valor em R$" />
          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
export default NewIncident
