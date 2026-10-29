import express from "express";
import type { Request, Response, NextFunction } from "express";
import libroRouter from "./routes/librosRoutes.ts";
import usuariosRouter from "./routes/usuariosRoutes.ts";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
//INICIALIZAR LA APLICACION DE EXPRESS
const app = express();
const PORT = 3000;
// MIDDLEWARE OBLIGATORIO PARA JSON
const swaggerDocument = JSON.parse(
  fs.readFileSync(
    path.join(import.meta.dirname, "./swagger-output.json"),
    "utf-8",
  ),
);
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(apiKeyValidator); // de manera global
/* creacion del custom middleware */
function apiKeyValidator(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers[`x-api-key`];
  /* verificar si la api key es correcta o si existe */
  if (!apiKey || apiKey !== "funval-2026-10") {
    res.status(401).json({
      ok: false,
      mensaje: "ACCESO NO AUTORIZADO!!!",
    });
    return;
  }
  next();
}
app.use("/", libroRouter);
app.use("/", usuariosRouter);

app.listen(PORT, function () {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});

/* 
comentario aleatorio
*/
