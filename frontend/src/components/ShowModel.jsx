import { useState } from 'react';

const ShowModel = () => {
    const [formData, setFormData] = useState({
        spacePhoto: '',
        spaceName: '',
        description: '',
        question1: '',
        question2: '',
        headerName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="show-model flex flex-col items-center space-y-8">
            <div className="card input-card bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Input Card</h2>
                <input
                    type="text"
                    name="spacePhoto"
                    placeholder="Space Photo URL"
                    value={formData.spacePhoto}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="spaceName"
                    placeholder="Space Name"
                    value={formData.spaceName}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="question1"
                    placeholder="Question 1"
                    value={formData.question1}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="question2"
                    placeholder="Question 2"
                    value={formData.question2}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="headerName"
                    placeholder="Header Name"
                    value={formData.headerName}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
            </div>
            <div className="card display-card bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Display Card</h2>
                <img src={formData.spacePhoto} alt="Space" className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-xl font-semibold mb-2">{formData.spaceName}</h3>
                <p className="mb-2">{formData.description}</p>
                <p className="mb-2"><strong>Question 1:</strong> {formData.question1}</p>
                <p className="mb-2"><strong>Question 2:</strong> {formData.question2}</p>
                <h4 className="text-lg font-medium">{formData.headerName}</h4>
            </div>
        </div>
    );
};

export default ShowModel;