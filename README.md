<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Dogs - Néstor Santiago Fuhr

<p align="left">
  <img height="200" src="./dog.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Horarios y Fechas

La aplicación despliega las razas de perros de la API Thedogapi, y permite además al usuario a crear nuevas razas de perros, asignando uno o más temperamentos a la nueva raza creada (relación uno a muchos).
Adicionalmente, la aplicación tiene buscadores por nombre de la raza, por temperamento, y permite filtrar las razas por orden alfabético, y por razas de la API, o por las creadas por el usuario. No se permitía tampoco cargar los datos de las razas de perros en la base de datos, solo la de los temperamentos (relación muchos a muchos entre temperamentos y razas) y las razas creadas por el usuario. Por lo tanto las consultas en la aplicación son al mismo tiempo a la API (por las razas desde allí consultadas) y a la base de datos para las razas creadas por el usuario.

Resumidamente, esta aplicación tiene estas características:
<u>Back End<u>: servidor Express Node.js con base de datos Postgre y ORM Sequelize. Servidor desplegado en <b>Heroku<b>.
<u>Front End<u>: aplicación con componentes React y Styled Components. No se permitia usar en el proyecto ningún tipo de framework de estilos (tipo Bootstrap / Tailwind) y ninguna librería, salvo React y Redux. Uso Redux para el estado global de la aplicación. El front end está desplegado en <b>Vercel<b>. 
