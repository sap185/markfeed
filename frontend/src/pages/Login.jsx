import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { loginHandlerRequest } from "../handlers/handlers";
// import Cookies from "js-cookie";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            return toast.error("Please fill in all fields.");
        }

        try {
            setLoading(true);

            // Make login request
            const response = await loginHandlerRequest(email, password);

            // Check for accessToken in response
            if (response?.accessToken) {
                console.log("Login successful. Redirecting...");
                toast.success("Logged In Successfully!");
                // Navigate to the home page
                navigate("/home");
            } else {
                console.error("Unexpected response:", response);
                toast.error("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full justify-center">
            <Navbar />
            <Toaster />
            <div className="flex flex-col items-center m-10">
                <h1 className="text-3xl font-bold">Welcome back to Testimonial</h1>
                <hr className="w-1/2 my-4 bg-gray-500" />
                <h2 className="text-2xl">Login</h2>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={loginHandler} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link to="/Signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Start Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
