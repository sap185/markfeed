

const Profile = () => {
    return (
        <div className="flex flex-col justify-center items-center min-screen">
            <h1 className="text-4xl font-semibold text-gray-500 leading-tight mb-10">Profile</h1>
            <div className="flex flex-col gap-6 w-full max-w-md items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
                    <img
                        src="../../public/istockphoto-480386986-612x612.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                    <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2">Click on the circle to Select a picture.</p>

                <div className="w-full">
                    <label className="text-xl font-semibold text-gray-800">Name  : </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        required
                        className="border border-gray-300 rounded-md p-2 w-full mt-2"
                    />
                </div>

                {/* Save Button */}
                <button
                    type="button"
                    className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Save Profile
                </button>
            </div>
        </div>
    );
}


const Dashboard = () => {
    return (
        <div className="flex flex-col justify-center items-center min-screen">
            <h1 className="text-4xl font-semibold text-gray-500 leading-tight">Dashboard</h1>
            <hr className="border-2 border-gray-500 my-4 w-1/2" />
            <h3 className="text-2xl font-semibold text-gray-500 leading-tight">Working on the way !</h3>
        </div>
    );
}

const Integrations = () => {
    const tiers = [
        {
            name: 'Hobby',
            id: 'tier-hobby',
            href: '#',
            priceMonthly: '$29',
            description: "The perfect plan if you're just getting started with our product.",
            features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
            featured: false,
        },
        {
            name: 'Enterprise',
            id: 'tier-enterprise',
            href: '#',
            priceMonthly: '$99',
            description: 'Dedicated support and infrastructure for your company.',
            features: [
                'Unlimited products',
                'Unlimited subscribers',
                'Advanced analytics',
                'Dedicated support representative',
                'Marketing automations',
                'Custom integrations',
            ],
            featured: true,
        },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white px-6 py-16">
            <div className="text-center max-w-4xl">
                <p className="mt-2 text-4xl font-semibold text-gray-900">
                    Choose the right plan for you
                </p>
                <p className="mt-4 text-lg text-gray-600">
                    Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
                    loyalty, and driving sales.
                </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className={classNames(
                            tier.featured ? 'bg-gray-900 text-white' : 'bg-gray-50',
                            'rounded-lg p-6 shadow-md ring-1 ring-gray-200'
                        )}
                    >
                        <h3 className="text-lg font-semibold">{tier.name}</h3>
                        <p className="mt-2 text-3xl font-bold">{tier.priceMonthly}</p>
                        <p className="mt-2 text-gray-600">{tier.description}</p>
                        <ul className="mt-4 space-y-2 text-sm">
                            {tier.features.map((feature) => (
                                <li key={feature} className="flex items-center">
                                    <span className="h-5 w-5 inline-flex items-center justify-center bg-indigo-500 text-white rounded-full">
                                        ✓
                                    </span>
                                    <span className="ml-3">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <a
                            href={tier.href}
                            className={classNames(
                                tier.featured
                                    ? 'mt-4 inline-block bg-indigo-500 text-white hover:bg-indigo-600'
                                    : 'mt-4 inline-block bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
                                'px-4 py-2 rounded-md text-sm font-medium text-center'
                            )}
                        >
                            Get started today
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Profile, Dashboard, Integrations };
