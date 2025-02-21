import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState({})
  
  const buscarCEP = async () => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        setEndereco(response.data)
      } catch (error) {
        console.error('Erro ao buscar o CEP', error)
      }
    }
  }

  return (
    <>
      <label>Digite o CEP:</label>
      <input type='text' value={cep} onChange={(e) => setCep(e.target.value)} onBlur={buscarCEP} />
      {endereco.logradouro && (
        <div>
          <p>Rua: {endereco.logradouro}</p>
          <p>Bairro: {endereco.bairro}</p>
          <p>Cidade: {endereco.localidade}</p>
          <p>Estado: {endereco.uf}</p>
        </div>
      )}
    </>
  );
}

export default App;
