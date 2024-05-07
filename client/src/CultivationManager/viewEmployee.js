import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditModal from './EditModal'; // Import the EditModal component
import { useNavigate } from 'react-router-dom';
import './NICList.css'; // Import the CSS file
import './Backgroundimage.css';

const NICList = () => {
    const [NICs, setNICs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNIC, setSelectedNIC] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('nic'); // Default search type is NIC
    const navigate = useNavigate(); // Used for navigation

    useEffect(() => {
        const fetchNICs = async () => {
            try {
                const response = await axios.get('http://localhost:8070/cultivation/get-nic-list');
                setNICs(response.data);
            } catch (error) {
                console.error('Failed to fetch NIC list:', error);
            }
        };

        fetchNICs();
    }, []);

    const handleEdit = (nic, name) => {
        setSelectedNIC({ nic, name });
        setShowModal(true);
    };

    const handleSave = async (newNic, newName) => {
        try {
            await axios.put(`http://localhost:8070/cultivation/update-employee/${selectedNIC.nic}`, {
                nic: newNic,
                name: newName
            });
            setShowModal(false);
            setNICs(prevState =>
                prevState.map(nicData =>
                    nicData.nic === selectedNIC.nic ? { nic: newNic, name: newName } : nicData
                )
            );
        } catch (error) {
            console.error('Failed to update NIC data:', error);
        }
    };

    const handleDelete = async (nic) => {
        try {
            await axios.delete(`http://localhost:8070/cultivation/delete-employee/${nic}`);
            setNICs(prevState => prevState.filter(nicData => nicData.nic !== nic));
        } catch (error) {
            console.error('Failed to delete NIC data:', error);
        }
    };

    const handleAddEmployee = () => {
        navigate('/AddEmployeeModal'); // Navigate to the AddEmployeeModal page
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Filter and sort NICs based on search input and type
    const filteredNICs = NICs.filter(nicData => {
        const searchTerm = searchInput.toLowerCase();
        if (searchType === 'nic') {
            return nicData.nic.toLowerCase().includes(searchTerm);
        } else {
            // Add a check for null name
            return nicData.name && nicData.name.toLowerCase().includes(searchTerm);
        }
    }).sort((a, b) => {
        if (searchType === 'nic') {
            return a.nic.localeCompare(b.nic);
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    return (
        <div className="nic-list-container">
            <h2>Unique NIC List</h2>
            <div className="search-container">
                <input type="text" placeholder="Search..." value={searchInput} onChange={handleSearchInputChange} />
                <select value={searchType} onChange={handleSearchTypeChange}>
                    <option value="nic">NIC</option>
                    <option value="name">Name</option>
                </select>
                <button onClick={handleAddEmployee} className="add-employee-button">Add Employee</button>
            </div>
            <table className="nic-table">
                <thead>
                    <tr>
                        <th>NIC</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredNICs.map(nicData => (
                        <tr key={nicData.nic}>
                            <td>{nicData.nic}</td>
                            <td>{nicData.name}</td>
                            <td>
                                <button onClick={() => handleEdit(nicData.nic, nicData.name)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(nicData.nic)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <EditModal
                    nic={selectedNIC.nic}
                    name={selectedNIC.name}
                    onSave={handleSave}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default NICList;
