import express from "express";
import { addFuncionario, deleteFuncionario, getFuncionarios, updateFuncionario } from "../controllers/funcionario.js";

const router = express.Router()

router.get("/", getFuncionarios)

router.post("/", addFuncionario)

router.put("/:id", updateFuncionario)

router.delete("/:id", deleteFuncionario)

export default router