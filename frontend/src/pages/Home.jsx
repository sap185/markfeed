import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import { IoVideocamOutline } from "react-icons/io5";
import { GrPlan } from "react-icons/gr";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { RiFileAddLine } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { checkAuthentication } from "../handlers/auth.handlers";
import SampleImage from "/istockphoto-1183790559-612x612.jpg";
import axiosInstance from "../api/axios";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";

// Reusable OverviewCard Component
// eslint-disable-next-line react/prop-types
const OverviewCard = ({ icon, title, description }) => (
  <div className="bg-gradient-to-br from-blue-50 to-white shadow-md rounded-xl p-8 w-72 text-center">
    {icon}
    <h3 className="text-2xl font-semibold text-gray-700">{title}</h3>
    <p className="text-lg text-gray-500 mt-3">{description}</p>
  </div>
);

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [spaceImage, setSpaceImage] = useState(SampleImage);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    userId: Cookies.get("userId"),
    headerName: "",
    description: "",
    customizedMessage: "",
    question1: "",
    question2: "",
    spaceImage: null,
  });
  const [errors, setErrors] = useState({});
  const [spaceCount, setSpaceCount] = useState(0);
  // const [blink, setBlink] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const { isAuthenticated } = await checkAuthentication();
        setIsAuthenticated(isAuthenticated);
        if (!isAuthenticated) navigate("/login");
      } catch (error) {
        console.error("Authentication failed:", error);
        setIsAuthenticated(false);
      }
    };
    authenticate();
  }, [navigate]);

  const toggleModal = () => setShowModal(!showModal);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, spaceImage: file }));
      const reader = new FileReader();
      reader.onload = () => setSpaceImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.headerName.trim()) newErrors.headerName = "Space name is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      try {
        const response = await axiosInstance.post("/api/save-space", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data);
        if (response.data.status === "200") {
          toast.success("Space saved successfully!");
        }
      } catch (error) {
        console.log(error)
      }
      toggleModal();
    }
  };


  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const fetchSpaceCount = async () => {
      try {
        const response = await axiosInstance.get(`/api/get-space-count?userId=${Cookies.get("userId")}`);
        setSpaceCount(response.data.spaceCount || 0);
      } catch (error) {
        console.error("Error fetching space count:", error);
      }
    };
    fetchSpaceCount();

    const socket = io("http://localhost:5001");
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      // setBlink(true);
    });
    socket.on("updateSpaceCount", (data) => {
      console.log("Received updated space count:", data);
      if (data.userId === Cookies.get("userId")) {
        console.log("Setting space count:", data.spaceCount);
        setSpaceCount(data.spaceCount || 0);
      }
    });

    return () => {
      socket.off("updateSpaceCount");
      socket.disconnect();
      // setBlink(false);
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-md shadow-md">
          Please login before reaching here {"->"}
          <Link to="/login" className="text-blue-500 underline"> Click here</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <HomeNav />
      <Toaster />
      <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-[1000px] p-10">
          <h1 className="text-4xl font-semibold text-gray-800 leading-tight mb-10">Overview</h1>
          {/* <div className={`w-4 h-4 rounded-full ${blink ? "bg-green-500 animate-ping" : "bg-gray-400"}`} >
            <span className="text-sm text-gray-700">
              {blink ? "Connected" : "Disconnected"}
            </span>
          </div> */}
          <div className="flex items-center justify-center gap-8">
            <OverviewCard icon={<IoVideocamOutline className="h-14 w-14 text-blue-600 mx-auto mb-4" />} title="Total Videos" description="0 / 2" />
            <Link to="/spaces" className={spaceCount === 0 ? "pointer-events-none" : ""}><OverviewCard icon={<AiFillDingtalkCircle className="h-14 w-14 text-blue-600 mx-auto mb-4" />} title="Total Spaces" description={`${spaceCount}` || 1} /></Link>
            <OverviewCard icon={<GrPlan className="h-14 w-14 text-blue-600 mx-auto mb-4" />} title="Current Plan" description={
              <div className="flex items-center justify-center mt-3 space-x-2">
                <p className="text-lg text-gray-500">Starter</p>
                <Link to={"/settings"} state={{ tabIndex: 2 }}>
                  <button className="text-blue-600 bg-blue-50 border border-blue-300 rounded-md px-2 py-1 hover:bg-blue-100">
                    Upgrade?
                  </button>
                </Link>
              </div>
            }
            />
          </div>

          <hr className="border-purple-300 w-full my-10" />
          <div className="items-center gap-8">
            <h1 className="text-4xl font-semibold text-gray-800 leading-tight mb-10">Spaces</h1>
            <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-8">
              <RiFileAddLine className="text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">No Spaces Yet</h3>
              <h3 className="text-lg text-gray-500 mt-3">Create one to get started</h3>
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

      {
        showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="bg-white rounded-md shadow-lg w-[1000px] h-[600px] p-8 relative flex overflow-auto"
              style={{ maxHeight: "90vh" }}
            >
              <div className="w-1/2 pr-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Space</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div> {/* for space name */}
                    <label className="block text-gray-700 mb-2">
                      Space Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="headerName" value={formData.headerName} onChange={handleInputChange} className={`w-full border rounded-md p-2 ${errors.name ? "border-red-500" : "border-gray-300"}`} placeholder="Enter space name" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Space Image</label>
                    <div className="relative inline-block">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-300">
                        <img src={spaceImage} alt="Space" className="w-full h-full object-cover" />
                      </div>
                      <input type="file" accept="image/*" id="spaceImageInput" onChange={handleImageChange} className="hidden" />
                      <label
                        htmlFor="spaceImageInput"
                        className="absolute top-1/2 transform -translate-y-1/2 -right-4 bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white cursor-pointer" >
                        <span className="text-white text-sm font-bold">+</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Description</label>
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="w-full border rounded-md p-2 border-gray-300" placeholder="Enter category" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Customized Message</label>
                    <input type="text" name="customizedMessage" value={formData.customizedMessage} onChange={handleInputChange} className="w-full border rounded-md p-2 border-gray-300" placeholder="Enter tags (comma-separated)" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Question : 1</label>
                    <input type="text" name="question1" value={formData.question1} onChange={handleInputChange} className="w-full border rounded-md p-2 border-gray-300" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Question : 2</label>
                    <input type="text" name="question2" checked={formData.question2} onChange={handleInputChange} className="w-full border rounded-md p-2 border-gray-300" />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
                  >
                    Save
                  </button>
                </form>
              </div>
              <div className="w-1/2 pl-4 border-l border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
                <div className="border rounded-md p-4">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 overflow-hidden border-4 border-gray-300 mb-4">
                      <img src={spaceImage} alt="Preview Space" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">{formData.headerName || "Space Name"}</h3>
                    <p className="text-gray-500 mt-2">{formData.description || "Description will appear here."}</p>
                    <p className="text-gray-500 mt-2">{formData.customizedMessage || "Customized Message will appear here."}</p>
                    <p className="text-gray-500 mt-2">{formData.question1 || "Category will appear here."}</p>
                    <p className="text-gray-500 mt-2">{formData.question2 || "Tags will appear here."}</p>
                  </div>
                </div>
              </div>
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={toggleModal}
              >
                ✖
              </button>
            </div>
          </div>
        )
      }

      <Footer />
    </div >
  );
};

export default Home;