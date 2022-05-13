import { useState } from "react";
import styled from "styled-components";

const NavWrapper = styled.nav`
  ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: auto;
    padding: 0;
  }

  li {
    margin: 0 8px;
  }

  button {
    background: linear-gradient(
      to bottom,
      ${(p) => p.theme.primaryColor},
      ${(p) => p.theme.secondaryColor}
    );

    border-radius: 6px;
    padding: 8px;
    font-size: 120%;

    &:hover {
      box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }

    &:active {
      color: red;
    }
  }
`;

export function Pagination({ dogsPerPage, allDogs, paginado }) {
  // falta cambiar el estado para un boton actual
  const [page, setPage] = useState(1)
  const pagesArray = [];

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pagesArray.push(i + 1);
  }

  return (
    <NavWrapper>
      <ul>
        {pagesArray?.map((number) => (
          <li key={number}>
            <button
              key={number}
              onClick={() => {
                paginado(number);
                setPage(number)
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </NavWrapper>
  );
}
