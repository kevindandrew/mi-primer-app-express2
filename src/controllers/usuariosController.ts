import type { Response, Request } from "express";
import { type Usuarios, estudiantesFunvaleros } from "../data/usuarios.ts";

export function traerTodosLosEstudiantes(req: Request, res: Response) {
  /* #swagger.tags = ['Estudiantes'] 
  #swagger.description = 'Endpoint para visualizar a todos los estudiantes' */
  return res.status(200).json({
    ok: true,
    mensaje: "la lista de todos los estudiantes",
    data: estudiantesFunvaleros,
  });
}

export function traerUnEstudiante(req: Request, res: Response) {
  /* #swagger.tags = ['Estudiantes'] 
  #swagger.description = 'Endpoint para ver un estudiante' 
  #swagger.responses[200] = {
      description: "Usuario encontrado exitosamente"
    }
  #swagger.responses[404] = {
      description: "el usuario no fue encontrado"
    }
  */
  let idBuscado = Number(req.params.id);
  let estudianteEncontrado = estudiantesFunvaleros.find(
    (e: Usuarios) => e.id === idBuscado,
  );

  if (!estudianteEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: "ESTUDIANTE NO ENCONTRADO O NO EXISTE",
    });
  }
  res.status(200).json({
    ok: true,
    mensaje: "el estudiante fue encontrado con exito",
    data: estudianteEncontrado,
  });
}

export function crearEstudiante(req: Request, res: Response) {
  /* #swagger.tags = ['Estudiantes'] 
  #swagger.description = 'Endpoint para crear un estudiante' */
  const { nombre, apPaterno, celular, activo } = req.body;
  if (!nombre || !apPaterno || !celular || !activo) {
    return res.status(400).json({
      ok: false,
      mensaje: "FALTAN CAMPOS OBLIGATORIOS!!!!!",
    });
  }
  let nuevoEstudiante: Usuarios = {
    id: estudiantesFunvaleros.length + 1,
    nombre,
    apPaterno,
    celular,
    activo,
  };
  estudiantesFunvaleros.push(nuevoEstudiante);
  res.status(201).json({
    ok: true,
    mensaje: "libro creado con exito",
    data: nuevoEstudiante,
  });
}
