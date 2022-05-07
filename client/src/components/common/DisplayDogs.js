import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { getDogs } from "../../redux/actions";
import { Pagination, Card } from "components/common";
import styled from "styled-components";

const DisplayDogsWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto;
  /* align-items: center; */
  /* min-height: 100vh; */ /* esto lo usaria si quisiera q este componente ocupara todo el vh */
  height: calc(100vh - 6rem - 8rem - 8rem);
  justify-items: center;
`;

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
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      ></Pagination>

      <DisplayDogsWrapper>
        {currentDogs?.map((dog) => {
          return (
            // revisar el link que esta MAL
            // <Link key={dog.id} to={`/recipe/${dog.id}`}>
            <Card
              image={dog.image}
              name={dog.name}
              temperament={dog.temperament}
              key={dog.id}
            ></Card>
            // {/* </Link> */}
          );
        })}
      </DisplayDogsWrapper>
    </>
  );
}
