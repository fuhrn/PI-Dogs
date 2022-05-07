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
  }
`;

export function Pagination({ dogsPerPage, allDogs, paginado }) {
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
    </NavWrapper>
  );
}
