export interface Libros {
  id: number;
  titulo: string;
  autor: string;
  paginas: number;
  disponible: boolean;
}

export let biblioteca: Libros[] = [
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
