import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { Header, Layout } from "components/common";
import styled from "styled-components";
import theme from "themes/light";

const primaryHeader = theme.primaryColor;
const secondaryHeader = theme.secondaryColor;

const H1 = styled.h1`
  margin-top: 100px;
  margin-left: 200px;
`;

const DetailWrapper = styled.article`
  display: flex;
  /* flex-direction: column; */
  border-radius: 1rem;
  overflow: auto;
  width: 1000px;
  height: 500px;
  background-color: ${(p) => p.theme.secondaryColor};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  margin: auto;
  cursor: pointer;

  .img {
    /* width: ${(props) => props.size}; */
    width: 50%;
    height: 100%;
    object-fit: cover;
  }

  img:before {
    content: " ";
    display: block;
    position: absolute;
    left: 10px;
    height: 41px;
    width: 95px;
    background-color: white;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAAApCAMAAABk6QUbAAAAA3NCSVQICAjb4U/gAAACRlBMVEX///+dnqLhbiZlJxImIRF9ZlcmIRGdnqImIRGdnqLhbiYwJBMmIREmIRGdnqKQkJGMi4vhbiYmIRG+WyQmIRGdnqLBcUppZV5nY1wmIRGdnqJwdIpOSkBMSD5lJxImIRGJd4CNQSAmIRGdnqLhbiardGFcXGRQTk4mIRGdnqKdeGidc2DSZSXRZSWdblqaXkKZWTuYVTVONiE2MiU0MCMmIRHdci+VRiWVRCSUQyNKMRsmIRGdnqKbm6CTk5WckpCejomdi4TXcTPVcDXhbiaFUixIMBsuKh4rJhgmIRGdnqKcnaGdnJ+bm6C2kHuTk5WRkZKQkJGMi4uLiYeIh4bhbiaDgYDebCaBf33ZbCaBfnvWaiZ/fHnRaSd9enfTaSfLZyd6d3N5dnLHZifFZSd3dG/DZCjAZCd2c267Yii5YShzb2q0YChwbWdtamRtaWOrXSioXCinXChqZmCkWih4YlFpZV6iWiieWChnY1ybWChmYluYVyhkYFqVVihjX1iUVSiTVShhXVaOUyiOUyeLUihcWFCDTydbVk5YVEt8TCZ6SyZWUkl4SyZ2SSZVUEeUQCBUT0ZzSCVuRiRQTEJrRSROSkBMSD5mQiNKRjxgQCNJRDpIRDhcPiJGQjdEQDVYPCFWOyFDPjNVOyBAPDBPOB9MNx87NytDMhxCMRw4NChlJxJgKBI2MSQ/MBs9Lho4LBkyLiEyLiI2Kxg1KxgvKh0uKRsyKBcwJxYrJhgsJRQqJhcqJBQqJRYoJBQoIhImIhImIRG88IXPAAAAwnRSTlMAERERESIiMzNEREREVWZmZmZmd3eIiIiIiJmZmZmZmaqqqru7u7u7u8zMzMzMzMzMzMzMzMzd3d3d3d3u7u7u7u7u7u7u7u7u7v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3i+U8EAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAADUklEQVRIidWW+18MURjGJyW3Nlq5s5Gw7kRuK/dLM0lFB+lCLrmT3C+5RCZiDWmzq9IkbFYaQlq0nf/MOe+Z1dbu7K40nw/PD/u+z+w53/ec98zMLsf924pYLRAtWE8/p+tRYAwBb1u5mPKH6MGnG5grSet0Wj7dQPoKSVokCMP04UcIcySitbP1wXPcxOWUv1Cn5XPc4FVbiJL1wnPcBExkgDTSZDKNHj7A/CiCt7A00uVyzUNxfkPMTAlR/SpANmD05W/yG4GZUsz9KhDN85wvH2nycf8KJBh78ZP8BvBMFtLIeCIjVUz4MniTEe9drvlJg7TWgf9efKJBe5/8ABTAQXpMvvSIBUwKxjUse04uv9oPqejB2HmEXb6NcUkBUlToHaTqG+lxtDbf6h2n4EZv+hq37VbTaozz1PQqxidRQD42a/dHROi8SNWBHQidFMVjCMnYidDBKuslhKwYI5Rrparvy78Bl39Qp3EGGPgOdQrhizAR+GdJv1R+gbfTvfmyzxEE41crVF24Xou/DwZ09OXXOKmY1exPVU//ZS1+0P4zG/iE+V7nqxe/wuE4FJSfJ8tPA/AfyFTMBn4ELMB3qBM1+eR83wTg+5xvimb/CV+U5WKVf1mWS+nENoSOy3JFgPVXO4gagS/S1AH3pzEY36f/TDJWvKlf/0HFfZ4vS2A87U+7d46C3ddZdsuNPY9YWkJuyvrcUHx+qAafvt/cTiayT08LTVo8dMdtTucHRYHNdyje+/8zy5T23xcVxYMtWviBeH92W+K1f6IS2c9MQy2R7Ux4unAXtJmF0mmacCgAa0gV/kDbWduXqe2XTKELpAoHbPaLGYKQea/uSQ5hHLbZzxGbVcns0Vqw2ZV1j3f68cMokHGNVnmRntVKwve9wk1q7UL2JxI69wjl1NYK2R+p3eXHD11gzU9oU1ElhOZMZgvvQ2jK6oKY/xBCg8rf0MMPWaCI3QrlLyF05jNb1gThayGzV5ohfFH5G334oQqUdcPU088gtO5gwFM2CO9ymD1hh/A2ED9EgfhkN5mZNmocPFlTYpfQkDZyPJSdHLuUhq2TZoKdNXUGaGwckxROgagEHpvJKzwmhfzf8rEW1WKcSKyBfOv3IpPCKvDf6Bfrd/GWYekhrgAAAABJRU5ErkJggg==");
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 3rem;

    h2 {
      font-size: 1.5rem;
    }

    h5 {
      font-size: 1rem;
      margin: 0 0 5px 0;
    }

    .container {
      margin: 0 0 10px 0;
    }
  }
`;

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const dog = useSelector((state) => state.detail);
  console.log('detailDog: ', dog)

  return (
    <>
      <Header primary={primaryHeader} secondary={secondaryHeader} />
      {/* <Layout>
        {dog ? (
          <>
            <H1>Dog Detail</H1>
            <DetailWrapper>
              <img className="img" src={dog.image} alt={dog.name} />

              <div className="info">
                <h2>{dog.name}</h2>
                <h5>Temperaments</h5>
                <div className="container">
                  {dog.temperaments?.join(", ").concat(".")}
                </div>
                <h5>Weight:</h5>
                <div className="container">{dog.weight} kgs.</div>
                <h5>Height:</h5>
                <div className="container">{dog.height} cms.</div>
                <h5>Life span: </h5>
                <div className="container">{dog.life_span} years.</div>
              </div>
            </DetailWrapper>
          </>
        ) : (
          <div>
            <H1>
              <strong>Loading ...</strong>
            </H1>
          </div>
        )}
      </Layout> */}
    </>
  );
}
