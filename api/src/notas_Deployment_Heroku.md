<!-- NOTAS DE EXPERIENCIA DE DEPLOYAR DOGS -->
1) luego de crear el proyecto en Heroku, desde la terminal hacer
    $ cd my-project/    --> ojo con esto, ir al root y no a la carpeta api como yo hice inicialmente
    $ git init
    $ heroku git:remote -a henry-dogs-pi

2) para deployar 
    Deploy your application
    Commit your code to the repository and deploy it to Heroku using Git.

    $ git add .
    $ git commit -am "make it better"
    $ git push heroku master
  OJO que si me rebota el push, tengo que commitiar nuevamente para evitar warning ## Warning - The same version of this code has already been built: 0084c6b.....

2) el git push hay que hacerlo desde el root project y se indica en heroku settings / config vars / PROJECT_APP el directorio donde esta la aplicacion, en nuestro caso "app/"


<!-- video clase Diego Rodriguez sobre deployment -->
https://vimeo.com/510792531/20d64d4a98


<!-- a reemplazar por lo que viene en el proyecto en api/db.js -->
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
        { logging: false, native: false }
      );


conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3000"); // eslint-disable-line no-console
  });
});


<!-- FRONT index.js -->
import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";


<!-- referencias para implementar Heroku.... -->
https://github.com/timanovsky/subdir-heroku-buildpack

PROJECT_PATH
