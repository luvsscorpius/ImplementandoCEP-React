import React, { useState } from 'react'
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton'
import { Box } from '@mui/material'

function App() {
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState({})
  const [loading, setLoading] = useState(false)

  const buscarCEP = async () => {
    if (cep.length === 8) {
      setLoading(true)
      setTimeout(async () => {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
          setEndereco(response.data)
        } catch (error) {
          console.error('Erro ao buscar o CEP', error)
        } finally {
          setLoading(false)
        }
      }, 1000)
    }
  }

  return (
    <>
      <label>Digite o CEP:</label>
      <input type='text' value={cep} onChange={(e) => setCep(e.target.value)} onBlur={buscarCEP} />

      {loading ? (
        <Box>
          <Skeleton width={200} height={35} animation="wave" />
          <Skeleton width={200} height={35} animation="wave" />
          <Skeleton width={200} height={35} animation="wave" />
          <Skeleton width={200} height={35} animation="wave" />
        </Box>
      ) : endereco.logradouro && (
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
