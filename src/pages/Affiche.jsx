import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Affiche() {
    const query = useQuery();
    const matiereId = query.get('matiereId');
    const [sujets, setSujets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://172.20.10.11:8084/sujets/matiere/${matiereId}`)
            .then(response => {
                setSujets(response.data);
                setError(null);
            })
            .catch(error => {
                console.error("Il y a eu une erreur !", error);
                setError(error.response ? error.response.data : 'Erreur lors du chargement des données.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [matiereId]);

    const base64ToBlob = (base64, mimeType) => {
        try {
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: mimeType });
        } catch (error) {
            console.error("Erreur lors de la conversion base64 en Blob:", error);
            return null;
        }
    };

    const detectFileType = (base64) => {
        const signatures = {
            pdf: 'JVBERi0',
            jpeg: '/9j/4'
        };

        if (base64.startsWith(signatures.pdf)) {
            return 'pdf';
        } else if (base64.startsWith(signatures.jpeg)) {
            return 'jpeg';
        } else {
            return 'unknown';
        }
    };

    const renderSujet = (sujet) => {
        console.log(`Données du sujet ID: ${sujet.id}`, sujet);

        const fileType = sujet.fileType || detectFileType(sujet.byteimg);
        const mimeType = fileType === 'pdf' ? 'application/pdf' : 'image/jpeg';
        console.log(`Traitement du sujet ID: ${sujet.id}, Type de fichier: ${fileType}, MIME: ${mimeType}`);

        const blob = base64ToBlob(sujet.byteimg, mimeType);

        if (!blob) {
            console.error(`Erreur lors de la conversion du sujet ID: ${sujet.id}`);
            return <p>Erreur lors de la conversion des données du sujet {sujet.id}</p>;
        }

        const fileUrl = URL.createObjectURL(blob);
        const fileName = fileType === 'pdf' ? `sujet-${sujet.id}.pdf` : `sujet-${sujet.id}.jpeg`;

        console.log(`URL du fichier pour le sujet ID: ${sujet.id} - ${fileUrl}`);
        console.log(`Nom du fichier pour le sujet ID: ${sujet.id} - ${fileName}`);

        return (
            <div className="col-md-4 col-sm-6 mb-4" key={sujet.id}>
                <div className="box16">
                    {mimeType === 'application/pdf' ? (
                        <embed src={fileUrl} width="100%" height="200px" type="application/pdf" />
                    ) : (
                        <img src={fileUrl} alt={`Sujet ${sujet.id}`} className="img-fluid radius-image" />
                    )}
                    <div className="box-content">
                        <h3 className="title">{sujet.annee}</h3>
                        <ul className="social">
                            <li>
                                <a href={fileUrl} download={fileName} className="facebook">
                                    <span className="fa fa-download"></span>
                                </a>
                            </li>
                            <li>
                                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="twitter">
                                    <span className="fa fa-eye"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="w3l-team py-5 custom-width" id="team">
            <div className="call-w3 py-lg-5 py-md-4">
                <div className="container-fluid">
                    <div className="row main-cont-wthree-2 justify-content-center">
                        <div className="col-12">
                            <div className="row">
                                {loading ? (
                                    <p>Chargement des données...</p>
                                ) : error ? (
                                    <p>{error}</p>
                                ) : sujets.length > 0 ? (
                                    sujets.map(sujet => renderSujet(sujet))
                                ) : (
                                    <p>Aucun sujet trouvé pour cette matière.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Affiche;
