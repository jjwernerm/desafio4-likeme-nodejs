// Utilizo la clase Pool para que soporte multiconexiones y un mejor rendimiento en las consultas
const { Pool } = require('pg');

// Uso un objeto de configuración con las credenciales de postgres y mi DB
const pool = new Pool ({
    host: 'postgresql-joa.alwaysdata.net',
    user: 'joa',
    password: 'Developer123.',
    database: 'joa_likeme',
    port: 5432,
    allowExitOnIdle: true // Le indico a PostgreSQL que cierre la conexión luego de cada consulta
});

// Función para listar y mostrar los registros de la tabla posts
const consultarPosts = async() =>{
  const { rows } = await pool.query('SELECT * FROM posts')
  return rows
}

// Función para crear un post dentro de la tabla posts
const crearPost = async (titulo, url, descripcion, likes) => {
  const consulta = 'INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)';
  const valores = [titulo, url, descripcion, likes];
  const resultado = await pool.query(consulta, valores);
};

// Función para cmodificar un post dentro de la tabla posts, en este caso el título + Provocando el código 404 con el atributo rowCount
const modificarPost = async (titulo, id) => {
  const consulta = "UPDATE posts SET titulo = $1 WHERE id = $2"
  const valores = [titulo, id]
  const resultado = await pool.query(consulta, valores)
  const { rowCount } = await pool.query(consulta, valores)
  if (rowCount === 0) {
    throw { code: 404, message: "Error al modificar el post, el id no existe" }
  }
}

// Función para eliminar un registro desde la tabla posts desde un id
const eliminarPost = async (id) =>{
  const consulta = 'DELETE FROM posts WHERE id = $1';
  const resultado = await pool.query(consulta, [id]);
  return(resultado);
}

// Exporto las funciones que he creado en este archivo node.js
module.exports = { consultarPosts, crearPost, modificarPost, eliminarPost };