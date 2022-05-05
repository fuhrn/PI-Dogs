import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from '../../redux/actions'
import { Pagination, Card } from "components/common";



export function DisplayDogs() {

  // voy a cargar el estado de dogs "before mount"
  const dispatch = useDispatch();
   useEffect(() => {
     dispatch(getDogs());
   }, [dispatch]);

  // traigo del estado allDogs
  const allDogs = useSelector((state) => state.allDogs);

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 9;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(
    indexOfFirstDog,
    indexOfLastDog
  );

 const paginado = (pageNumber) => {
   setCurrentPage(pageNumber);
 };

  return (
    <div>
      <div>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}  
        ></Pagination>
      </div>
      <div>
        {currentDogs?.map((dog) => {
          return (
            // revisar el link que esta MAL
            <Link key={dog.id} to={`/recipe/${dog.id}`}>
              <Card
                image={dog.image}
                name={dog.name}
                temperament={dog.temperament}
                key={dog.id}
              ></Card>
            </Link>
          );
        })}
      </div>
      <div>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        ></Pagination>
      </div>
    </div>
  );
}
