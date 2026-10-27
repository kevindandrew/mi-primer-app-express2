import express from "express";
import type { Request, Response, NextFunction } from "express";

//INICIALIZAR LA APLICACION DE EXPRESS
const app = express();
const PORT = 3000;
// MIDDLEWARE OBLIGATORIO PARA JSON
app.use(express.json());
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

interface Libros {
  id: number;
  titulo: string;
  autor: string;
  paginas: number;
  disponible: boolean;
}

let biblioteca: Libros[] = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    paginas: 471,
    disponible: true,
  },
  {
    id: 2,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    paginas: 863,
    disponible: false,
  },
  {
    id: 3,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    paginas: 96,
    disponible: true,
  },
  {
    id: 4,
    titulo: "1984",
    autor: "George Orwell",
    paginas: 328,
    disponible: true,
  },
  {
    id: 5,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J. K. Rowling",
    paginas: 309,
    disponible: false,
  },
  {
    id: 6,
    titulo: "El Hobbit",
    autor: "J. R. R. Tolkien",
    paginas: 310,
    disponible: true,
  },
  {
    id: 7,
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    paginas: 432,
    disponible: true,
  },
  {
    id: 8,
    titulo: "Crónica de una muerte anunciada",
    autor: "Gabriel García Márquez",
    paginas: 122,
    disponible: false,
  },
  {
    id: 9,
    titulo: "La Odisea",
    autor: "Homero",
    paginas: 448,
    disponible: true,
  },
  {
    id: 10,
    titulo: "Los juegos del hambre",
    autor: "Suzanne Collins",
    paginas: 374,
    disponible: true,
  },
  {
    id: 11,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    paginas: 600,
    disponible: false,
  },
  {
    id: 12,
    titulo: "El código Da Vinci",
    autor: "Dan Brown",
    paginas: 592,
    disponible: true,
  },
  {
    id: 13,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    paginas: 249,
    disponible: true,
  },
  {
    id: 14,
    titulo: "La ciudad y los perros",
    autor: "Mario Vargas Llosa",
    paginas: 448,
    disponible: false,
  },
  {
    id: 15,
    titulo: "El alquimista",
    autor: "Paulo Coelho",
    paginas: 192,
    disponible: true,
  },
];

app.get("/api/libros", function (req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    mensaje: "Lista de todos los libros q tenemos disponibles",
    data: biblioteca.filter((li: Libros) => li.disponible === true),
  });
});

app.get(
  "/api/libros/:id",
  apiKeyValidator,
  function (req: Request, res: Response) {
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
  },
);

app.post("/api/libros", function (req: Request, res: Response) {
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
});

app.put("/api/libros/:id", function (req: Request, res: Response) {
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
});

app.delete("/api/libros/:id", function (req: Request, res: Response) {
  let idBuscando = Number(req.params.id);
  let indiceEncontrado = biblioteca.find(
    (librito: Libros) => librito.id === idBuscando,
  );
  if (!indiceEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: "el libro q deseas actualizar NO EXISTE!!!",
    });
  }
  let nuevaBiblioteca = biblioteca.filter(
    (librito: Libros) => librito.id !== idBuscando,
  );
  biblioteca = nuevaBiblioteca;
  res.status(200).json({
    ok: true,
    mensaje: "eliminacion fisica exitosa",
  });
});
app.delete("/api/libros/soft/:id", function (req: Request, res: Response) {
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
});
app.listen(PORT, function () {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
