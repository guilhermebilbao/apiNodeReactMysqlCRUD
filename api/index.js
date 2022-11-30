import express from "express"
import funcionarioRoutes from "./routes/funcionario.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", funcionarioRoutes)

app.listen(8800)