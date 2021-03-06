import React, { useState } from "react"
import "./styles.scss"

import api from "../../services/api"

import heroesImg from "../../assets/heroes.png"
import logoImg from "../../assets/logo.svg"
import { FiLogIn } from "react-icons/fi"
import { Link, useHistory } from "react-router-dom"

const Logon = props => {
  const [id, setId] = useState("")

  const history = useHistory()

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const response = await api.post("/sessions", { id })

      localStorage.setItem("ongId", id)
      localStorage.setItem("ongName", response.data.name)

      history.push("/profile")
    } catch (error) {
      alert("Falha no login, tente novamente.")
    }
  }

  return (
    <div className="Logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero logo" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}
export default Logon
