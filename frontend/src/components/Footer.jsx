const Footer = () => {
    return (
        <footer className="flex flex-col items-center justify-center w-full py-6 mt-10 border-t border-black-800 text-center bg-Fuchsia-400">
            <div className="max-w-6xl w-full px-4 md:px-8">
                <p className="text-gray-600 font-normal">
                    &copy; {new Date().getFullYear()} Testimonial
                </p>
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 mt-4">
                    <li>
                        <a
                            href="#"
                            className="text-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            About Us
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            License
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contribute
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contact Us
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
