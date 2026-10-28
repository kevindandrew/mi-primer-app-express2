import { Router } from "express";
import {
  traerTodosLosEstudiantes,
  traerUnEstudiante,
} from "../controllers/usuariosController.ts";
const router = Router();

router.get("/api/estudiantes", traerTodosLosEstudiantes);
router.get("/api/estudiantes/:id", traerUnEstudiante);

export default router;
