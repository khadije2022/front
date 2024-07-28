import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Matieres() {
    const { semestre } = useParams();
    const [matieres, setMatieres] = useState([]);

    useEffect(() => {
        axios.get(`http://192.168.100.8:8084/matieres/semestre/${semestre}`)
            .then(response => {
                setMatieres(response.data);
            })
            .catch(error => {
                console.error("Il y a eu une erreur !", error);
            });
    }, [semestre]);

    return (
        <div className="training-programs-container">
            {matieres.map(matiere => (
                <div className="program-card py-5" key={matiere.id_matiere}>
                    <div className="icon">📖</div>
                    <h3>{matiere.nom}</h3>
                    <p>Les matières dans ce semestre</p>
                    <Link to={`/types/${matiere.id}`} className="read-more-link">
                        En savoir plus
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Matieres;