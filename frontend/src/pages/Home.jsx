import { useState } from "react";
import { Link } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import { IoVideocamOutline } from "react-icons/io5";
import { GrPlan } from "react-icons/gr";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { RiFileAddLine } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";

//  ** sample image
import SampleImage from "../../public/istockphoto-1183790559-612x612.jpg";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [spaceImage, setSpaceImage] = useState(SampleImage);

    const toggleModal = () => setShowModal(!showModal);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setSpaceImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex-col bg-gray-50 min-h-screen">
            <HomeNav />
            <div className="flex items-center justify-center py-10">
                <div className="w-full max-w-[1000px] p-10">
                    <h1 className="text-4xl font-semibold text-gray-800 leading-tight mb-10">
                        Overview
                    </h1>
                    {/* Overview Cards */}
                    <div className="flex items-center justify-center gap-8">
                        {/* Total Videos */}
                        <div className="bg-gradient-to-br from-blue-50 to-white shadow-md rounded-xl p-8 w-72 text-center">
                            <IoVideocamOutline className="h-14 w-14 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-700">
                                Total Videos
                            </h3>
                            <p className="text-lg text-gray-500 mt-3">0 / 2</p>
                        </div>
                        {/* Total Spaces */}
                        <div className="bg-gradient-to-br from-blue-50 to-white shadow-md rounded-xl p-8 w-72 text-center">
                            <AiFillDingtalkCircle className="h-14 w-14 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-700">
                                Total Spaces
                            </h3>
                            <p className="text-lg text-gray-500 mt-3">0</p>
                        </div>
                        {/* Current Plan */}
                        <div className="bg-gradient-to-br from-blue-50 to-white shadow-md rounded-xl p-8 w-72 text-center">
                            <GrPlan className="h-14 w-14 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-700">
                                Current Plan
                            </h3>
                            <div className="flex items-center justify-center mt-3 space-x-2">
                                <p className="text-lg text-gray-500">Starter</p>
                                <Link to={"/settings"} state={{ tabIndex: 2 }}><button className="text-blue-600 bg-blue-50 border border-blue-300 rounded-md px-2 py-1 hover:bg-blue-100">
                                    Upgrade?
                                </button></Link>
                            </div>
                        </div>
                    </div>
                    <hr className="border-purple-300 w-full my-10" />
                    {/* Spaces Section */}
                    <div className="items-center gap-8">
                        <h1 className="text-4xl font-semibold text-gray-800 leading-tight mb-10">
                            Spaces
                        </h1>
                        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-8">
                            <RiFileAddLine className="text-4xl text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700">
                                No Spaces Yet
                            </h3>
                            <h3 className="text-lg text-gray-500 mt-3">
                                Create one to get started
                            </h3>
                            <button
                                className="flex items-center text-blue-600 border border-blue-600 rounded-md px-4 py-2 hover:bg-blue-100 mt-5"
                                onClick={toggleModal}
                            >
                                <CiCirclePlus className="mr-2" />
                                Create New Space
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md shadow-lg w-[1000px] h-[600px] p-8 relative">
                        {/* User Input Form */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Create New Space
                        </h2>
                        <h3 className="text-lg text-gray-500 mb-4">
                            After creating the space, you can add all essentials
                            on this page.
                        </h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">
                                    Space Name{" "}
                                    <span>(Must be unique)</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Enter space name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">
                                    Space Image
                                </label>
                                <div className="relative inline-block">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-300">
                                        <img
                                            src={spaceImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        accept="image/*"
                                        className="hidden"
                                        id="profilePictureInput"
                                        onChange={handleImageChange}
                                    />
                                    <label
                                        htmlFor="profilePictureInput"
                                        className="absolute top-1/2 transform -translate-y-1/2 -right-4 bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white cursor-pointer"
                                    >
                                        <span className="text-white text-sm font-bold">
                                            +
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Enter description"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </form>
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            onClick={toggleModal}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Home;
