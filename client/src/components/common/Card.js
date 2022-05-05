import styled from "styled-components";

const CardWrapper = styled.article`
  margin: 30px;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  width: 505px;
  height: 250px;
  /* background-color: var(--color); */
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: transform 250ms ease;
  &:hover {
    transform: scale(1.02);
  }

  .contImg {
    width: 50%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
    width: 50%;
    height: 100%;

    h2 {
      font-size: 30px;
    }

    .temp-container {
      h5 {
        font-size: 20px;
      }
      margin: 0 auto;
      .temperaments {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .temp {
          margin-right: 10px;
        }
      }
    }
  }
`;

export function Card({ image, name, temperament }) {
  return (
    <CardWrapper>
      <div className='contImg'>
        <img src={image} alt="" />
      </div>

      <div className='info'>
        <h2>{name}</h2>
        <div className='temp-container'></div>
        <h5>Temperament</h5>
        <div className='temperaments'>
          {
            temperament.map(temp => <p key={temp} className='temp'>{ temp }</p>)
          }
        </div>
      </div>
    </CardWrapper>
  );
}
