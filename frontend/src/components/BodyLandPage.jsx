import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const BodyLandPage = () => {
    return (
        <div className="flex justify-center w-full min-h-screen bg-gray-100 pt-16">
            <div className="max-w-2xl text-center px-4 md:px-8 mx-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight font-cursive">
                    Get All Your Essentials Testimonials in One Place
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Collecting testimonials is hard, we get it! So we built Testimonial. In minutes, you can collect text and video testimonials from your customers with no need for a developer or website hosting.
                </p>
                <div className="flex justify-center gap-4 mt-5 bg-blue-100 p-4">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
                        Try Now
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
                        Chat With Us
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                    Get started for free, see <span className="inline-flex items-center gap-1">
                        <FaLongArrowAltRight />
                        <Link to="/pricing" aria-label="See price details">Price Details</Link>
                    </span>
                </p>
                <div className="flex justify-center gap-4 mt-10">
                    <div className="border-2 border-gray-300 p-8 rounded-md w-full max-w-md">
                        <p className="text-center text-gray-600">
                            Video tutorial coming soon!
                        </p>
                    </div>
                </div>

                <hr className="my-10 border-blue-800 " />

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight font-cursive">
                    Add Testimonials to Your Website with No Coding
                </h1>
            </div>
        </div>
    );
}

export default BodyLandPage;
