import { useState } from 'react';
import './ShowModel.css'; // Assuming you have some CSS for styling

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
        <div className="show-model">
            <div className="card input-card">
                <h2>Input Card</h2>
                <input
                    type="text"
                    name="spacePhoto"
                    placeholder="Space Photo URL"
                    value={formData.spacePhoto}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="spaceName"
                    placeholder="Space Name"
                    value={formData.spaceName}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="question1"
                    placeholder="Question 1"
                    value={formData.question1}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="question2"
                    placeholder="Question 2"
                    value={formData.question2}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="headerName"
                    placeholder="Header Name"
                    value={formData.headerName}
                    onChange={handleChange}
                />
            </div>
            <div className="card display-card">
                <h2>Display Card</h2>
                <img src={formData.spacePhoto} alt="Space" />
                <h3>{formData.spaceName}</h3>
                <p>{formData.description}</p>
                <p><strong>Question 1:</strong> {formData.question1}</p>
                <p><strong>Question 2:</strong> {formData.question2}</p>
                <h4>{formData.headerName}</h4>
            </div>
        </div>
    );
};

export default ShowModel;