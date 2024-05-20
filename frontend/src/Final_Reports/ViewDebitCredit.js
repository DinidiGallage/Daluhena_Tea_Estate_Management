// ViewDebitCredit.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewDebitCredit() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = () => {
        axios.get('http://localhost:8080/employeeSalary/getDebitCredit')
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    };

    return (
        <div>
            <div>
                <h3>Uploaded PDFs:</h3>
                {files.map(file => (
                    <div key={file._id}>
                        <embed src={`http://localhost:8080/employeeSalary/getDebitCredit/${file.pdfFileName}`} width="500" height="600" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewDebitCredit;
