import styled from "styled-components";
import bkg from "../../assets/dogs.jpeg";
import { Header } from "components/common";
import theme from "themes/light";

const primary = theme.primaryColor + '20';
const secondary = theme.secondaryColor + "20";



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
      <Header/>
      <Img src={bkg} alt="" />
      <Background/>
    </Wrapper>
  );
};

export default Home;
