import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";
import { Pagination, Card } from "components/common";
import styled from "styled-components";

const DogsWrapper = styled.main`
  padding-top: 80px;
`;

const DogsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto;
  height: calc(100vh - 6rem - 8rem - 8rem);
  justify-items: center;
`;

export function DisplayDogs() {
  // voy a cargar el estado de dogs "before mount"
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  // y si esto se lo trae del componente Dogs???
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
    <DogsWrapper>
      <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      ></Pagination>

      <DogsGrid>
        {/* <ul> */}
          {currentDogs?.map((dog) => {
            return (
              // revisar el link que esta MAL
              // <Link key={dog.id} to={`/recipe/${dog.id}`}>

                <Card
                  image={dog.image}
                  name={dog.name}
                  temperament={dog.temperament}
                  key={dog.id.toString()}
                />

              // {/* </Link> */}
            );
          })}
        {/* </ul> */}
      </DogsGrid>
    </DogsWrapper>
  );
}
