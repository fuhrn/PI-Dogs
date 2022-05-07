import styled from "styled-components";
import { Link } from "react-router-dom";

const Content = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  max-width: 1200px;
  margin: 12rem auto;
  align-items: center;
  /* height: calc(100vh - 6rem - 8rem - 8rem); */
`;

const P = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  color: #ffffff;
`;

const Button = styled.button`
  width: fit-content;
  min-width: 10rem;
  height: fit-content;
  padding: 1rem 4rem;
  background-color: transparent;
  border: 2px solid #ffffff;
  border-radius: 1rem;
  color: #fff;
  font-family: Raleway, sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    color: #000;
    background-color: #ffffff;
  }
`;

function HomeContent() {
  return (
    <Content>
      <div>
        <P>
          People have been breeding dogs since prehistoric times. The earliest
          dog breeders used wolves to create domestic dogs. From the beginning,
          humans purposefully bred dogs to perform various tasks. Hunting,
          guarding, and herding are thought to be among the earliest jobs
          eagerly performed by the animal destined to be called “man’s best
          friend.”</P>
          
          <P>For thousands of years, humans bred dogs toward the physical
          and mental traits best suited for the work expected of them. As humans
          became more sophisticated, so did their dogs. Eventually, there
          emerged specific breeds of dogs, custom-bred to suit the breeders’
          local needs and circumstances.
        </P>
      </div>
      <Link to="/dogs">
        <Button>Ver más</Button>
      </Link>
    </Content>
  );
}

export default HomeContent;
