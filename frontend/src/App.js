import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getFuncionarios = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setFuncionarios(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getFuncionarios();
  }, [setFuncionarios]);

  return (
    <>
      <Container>
        <Title>GERENCIAMENTO DE FUNCIONÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getFuncionarios={getFuncionarios} />
        <Grid setOnEdit={setOnEdit} funcionarios={funcionarios} setFuncionarios={setFuncionarios} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
