import styled from "styled-components";

const Ul = styled.ul`

 /* className={styles.barra} */

`;

export function Pagination({ dogsPerPage, allDogs, paginado }) {
  const pagesArray = [];

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pagesArray.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {pagesArray?.map((number) => (
          <li key={number}>
            <button
              key={number}
              onClick={() => paginado(number)}
              // style={
              //   number === currentPage
              //     ? {
              //         backgroundColor: "#fd684d",
              //         color: "white",
              //         border: "1px solid #777db8",
              //       }
              //     : {}
              // }
            >
              {number}
            </button>
            {/* <a onClick={() => paginado(number)}>{number}</a> */}
          </li>
        ))}
      </ul>
    </nav>
  );
}