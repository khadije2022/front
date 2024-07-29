import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Matieres() {
    const { semestre } = useParams(); // Utilisation des paramètres de l'URL
    const [matieres, setMatieres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.100.8:8084/matieres/semestre/${semestre}`)
            .then(response => {
                setMatieres(response.data);
                setError(null);
            })
            .catch(error => {
                console.error("Il y a eu une erreur !", error);
                setError('Erreur lors du chargement des données.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [semestre]);

    return (
        <div className="training-programs-container">
            {loading ? (
                <p>Chargement des données...</p>
            ) : error ? (
                <p>{error}</p>
            ) : matieres.length > 0 ? (
                matieres.map(matiere => (
                    <div className="program-card py-5" key={matiere.id_matiere}>
                        <div className="icon">📖</div>
                        <h3>{matiere.nom}</h3>
                        <p>Les matières dans ce semestre</p>
                        <Link to={`/types/${matiere.id_matiere}`} className="read-more-link">
                            En savoir plus
                        </Link>
                    </div>
                ))
            ) : (
                <p>Aucune matière trouvée pour ce semestre.</p>
            )}
        </div>
    );
}

export default Matieres;
