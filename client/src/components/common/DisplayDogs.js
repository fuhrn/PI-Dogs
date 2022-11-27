import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";
import { Pagination, Card } from "components/common";
import { Link } from "react-router-dom";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);


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
        {currentDogs.length > 0 ? currentDogs.map((dog) => {
          return (
            <Link key={dog.id } to={`/dogs/${dog.id}`}>
              <Card
                image={dog.image}
                name={dog.name}
                temperaments={dog.temperaments}
                key={dog.id.toString()}
              />
            </Link>
          );
        })
          : 
          <h2>Wait please, findings your dogs...</h2>
      }
      </DogsGrid>
    </DogsWrapper>
  );
}
