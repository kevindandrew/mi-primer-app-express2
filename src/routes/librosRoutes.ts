import { Router } from "express";
import {
  actualizarLibro,
  crearLibroNuevo,
  eliminarLibroHard,
  eliminarLibroSoft,
  traerTodosLosLibros,
  traerUnLibro,
} from "../controllers/librosController.ts";
const router = Router();

router.get("/api/libros", traerTodosLosLibros);

router.get("/api/libros/:id", traerUnLibro);

router.post("/api/libros", crearLibroNuevo);

router.put("/api/libros/:id", actualizarLibro);

router.delete("/api/libros/:id", eliminarLibroHard);

router.delete("/api/libros/soft/:id", eliminarLibroSoft);

export default router;
