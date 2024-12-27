import Navbar from '../components/Navbar';
import BodyLandPage from '../components/BodyLandPage';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <>
            <div className='bg-gray-200 h'>
                <Navbar />
            </div>
            <BodyLandPage />
            <Footer />
        </>
    )
}

export default LandingPage;