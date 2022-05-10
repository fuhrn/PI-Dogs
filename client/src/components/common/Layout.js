import styled from 'styled-components';


const Content = styled.main`
  padding: 0 16px;
  font-family: "Open Sans";

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Kaushan Script";
  }
`;

export function Layout({ children }) {
  return (
      <Content>
        {children}
      </Content>
  )}