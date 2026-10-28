import type { Response, Request } from "express";
import { type Usuarios, estudiantesFunvaleros } from "../data/usuarios.ts";

export function traerTodosLosEstudiantes(req: Request, res: Response) {
  return res.status(200).json({
    ok: true,
    mensaje: "la lista de todos los estudiantes",
    data: estudiantesFunvaleros,
  });
}

export function traerUnEstudiante(req: Request, res: Response) {
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
