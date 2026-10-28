import type { Response, Request } from "express";
import { type Libros, biblioteca } from "../data/libros.ts";

export function traerTodosLosLibros(req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    mensaje: "Lista de todos los libros q tenemos disponibles",
    data: biblioteca.filter((li: Libros) => li.disponible === true),
  });
}

export function traerUnLibro(req: Request, res: Response) {
  let idBuscando = Number(req.params.id);
  let libroEncontrado = biblioteca.find(
    (librito: Libros) => librito.id === idBuscando,
  );

  if (!libroEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: `el libro con el id ${idBuscando} no existe`,
    });
  }
  res.status(200).json({
    ok: true,
    mensaje: "tu libro fue encontrado",
    data: libroEncontrado,
  });
}

export function crearLibroNuevo(req: Request, res: Response) {
  const { titulo, autor, paginas, disponible } = req.body;
  if (!titulo || !autor || !paginas || !disponible) {
    return res.status(400).json({
      ok: false,
      mensaje: "FALTAN CAMPOS OBLIGATORIOS!!!!!",
    });
  }
  let nuevoLibro: Libros = {
    id: biblioteca.length + 1,
    titulo,
    autor,
    paginas,
    disponible,
  };
  biblioteca.push(nuevoLibro);
  res.status(201).json({
    ok: true,
    mensaje: "libro creado con exito",
    data: nuevoLibro,
  });
}

export function actualizarLibro(req: Request, res: Response) {
  let idBuscando = Number(req.params.id);
  let indiceEncontrado = biblioteca.findIndex(
    (librito: Libros) => librito.id === idBuscando,
  );
  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "el libro q deseas actualizar NO EXISTE!!!",
    });
  }
  const { titulo, autor, paginas, disponible } = req.body;
  if (!titulo || !autor || !paginas || !disponible) {
    return res.status(400).json({
      ok: false,
      mensaje: "FALTAN CAMPOS OBLIGATORIOS!!!!!",
    });
  }
  biblioteca[indiceEncontrado] = {
    id: idBuscando,
    titulo,
    autor,
    paginas,
    disponible,
  };
  res.status(214).json({
    ok: true,
    mensaje: "libro actualizado con exito",
    data: biblioteca[indiceEncontrado],
  });
}

export function eliminarLibroHard(req: Request, res: Response) {
  let idBuscando = Number(req.params.id);
  let indiceEncontrado = biblioteca.findIndex(
    (librito: Libros) => librito.id === idBuscando,
  );
  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "el libro q deseas actualizar NO EXISTE!!!",
    });
  }
  /*  biblioteca = nuevaBiblioteca; */
  biblioteca.splice(indiceEncontrado, 1);

  res.status(200).json({
    ok: true,
    mensaje: "eliminacion fisica exitosa",
  });
}

export function eliminarLibroSoft(req: Request, res: Response) {
  let idBuscando = Number(req.params.id);
  let indiceEncontrado = biblioteca.findIndex(
    (librito: Libros) => librito.id === idBuscando,
  );
  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "el libro q deseas actualizar NO EXISTE!!!",
    });
  }
  const libritoLoco = biblioteca[indiceEncontrado];
  if (!libritoLoco) {
    return res.status(404).json({
      ok: false,
      mensaje: "Libro no encontrado",
    });
  }
  libritoLoco.disponible = false;
  return res.status(200).json({
    ok: true,
    mensaje: "Libro eliminado correctamente",
    libro: libritoLoco,
  });
}
