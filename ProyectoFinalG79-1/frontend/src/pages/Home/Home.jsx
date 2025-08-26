import { Slider } from '../../components/Slider/Slider';
import Iconos from '../../components/Iconos/Iconos';


const Home = () => {


    return (
        <div className="container">
            <Slider />
            <div className="d-flex flex-wrap justify-content-center mt-2 mb-3 gap-3">
            <Iconos />
            </div>
        </div>
    );
};

export default Home;
