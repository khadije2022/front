import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMatiere = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [matiere, setMatiere] = useState({
    nom: '',
    semestre: ''
  });

  const { nom, semestre } = matiere;

  const onInputChange = e => {
    setMatiere({ ...matiere, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadMatiere();
  }, []);

  const loadMatiere = async () => {
    const result = await axios.get(`http://192.168.100.8:8084/matieres/${id}`);
    setMatiere(result.data);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://192.168.100.8:8084/matieres/${id}`, matiere);
    navigate('/hhhhh');
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Modifier une Matière</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nom de la matière"
              name="nom"
              value={nom}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Semestre"
              name="semestre"
              value={semestre}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Modifier Matière</button>
        </form>
      </div>
    </div>
  );
};

export default EditMatiere;
