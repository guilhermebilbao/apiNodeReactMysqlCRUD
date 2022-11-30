import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";



const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getFuncionarios, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const funcionario = ref.current;

      funcionario.nome.value = onEdit.nome;
      funcionario.email.value = onEdit.email;
      funcionario.fone.value = onEdit.fone;
      funcionario.cargo.value = onEdit.cargo;
      funcionario.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const funcionario = ref.current;

    if (
      !funcionario.nome.value ||
      !funcionario.email.value ||
      !funcionario.fone.value ||
      !funcionario.cargo.value ||
      !funcionario.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: funcionario.nome.value,
          email: funcionario.email.value,
          fone: funcionario.fone.value,
          cargo: funcionario.cargo.value,
          data_nascimento: funcionario.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: funcionario.nome.value,
          email: funcionario.email.value,
          fone: funcionario.fone.value,
          cargo: funcionario.cargo.value,
          data_nascimento: funcionario.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    funcionario.nome.value = "";
    funcionario.email.value = "";
    funcionario.fone.value = "";
    funcionario.cargo.value = "";
    funcionario.data_nascimento.value = "";

    setOnEdit(null);
    getFuncionarios();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Cargo</Label>
        <Input name="cargo" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
