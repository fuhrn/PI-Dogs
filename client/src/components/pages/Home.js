import styled from "styled-components";
import bkg from "../../assets/dogs.jpeg";
import { Header } from "components/common";
import HomeContent, { } from './HomeContent'
import theme from "themes/light";

const primaryHeader = theme.primaryColor + "25";
const secondaryHeader = theme.secondaryColor + "25";
const primary = theme.primaryColor + "15";
const secondary = theme.secondaryColor + "15";



const Wrapper = styled.div`
    display: grid;
    height: 100%;   /*el 100% de la altura visible del viewport*/
    min-height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: 6rem 1fr 8rem; 
    position: relative;
`

const Img = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  z-index: -1;
`;

const Background = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: -1;
  background: linear-gradient(to right, ${primary}, ${secondary});
`;

const Home = ({ children }) => {
  return (
    <Wrapper>
      <Header primary={primaryHeader} secondary={secondaryHeader} />
      <Img src={bkg} alt="" />
      <Background />
      <HomeContent />
    </Wrapper>
  );
};

export default Home;
