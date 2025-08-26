import Carousel from 'react-bootstrap/Carousel';
import './slider.css';
import imagen1 from "../../assets/images/banner1.avif";
import imagen2 from "../../assets/images/banner2.webp";
import imagen3 from "../../assets/images/banner3.jpg";


export function Slider() {
  return (
    <div className='slider-container'>
      <Carousel fade>
        <Carousel.Item>
          <img
            src={imagen2}
            alt="First slide"
            className="slider-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={imagen1}
            alt="Second slide"
            className="slider-image"
          />
        </Carousel.Item>
          <Carousel.Item>
          <img
            src={imagen3}
            alt="Second slide"
            className="slider-image"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
