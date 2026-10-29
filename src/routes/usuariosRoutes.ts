import { Router } from "express";
import {
  crearEstudiante,
  traerTodosLosEstudiantes,
  traerUnEstudiante,
} from "../controllers/usuariosController.ts";
const router = Router();

router.get("/api/estudiantes", traerTodosLosEstudiantes);
router.get("/api/estudiantes/:id", traerUnEstudiante);
router.post("/api/estudiantes", crearEstudiante);
export default router;
