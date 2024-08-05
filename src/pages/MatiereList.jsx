import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const MatiereManager = () => {
  const [matieres, setMatieres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [matiere, setMatiere] = useState({
    nom: '',
    semestre: ''
  });
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    loadMatieres();
  }, []);

  const loadMatieres = async () => {
    const result = await axios.get('http://192.168.101.72:8084/matieres');
    setMatieres(result.data);
  };

  const deleteMatiere = async (id) => {
    await axios.delete(`http://192.168.101.72:8084/matieres/${id}`);
    loadMatieres();
  };

  const onInputChange = e => {
    setMatiere({ ...matiere, [e.target.name]: e.target.value });
  };

  const handleShowModal = (mode, id = null) => {
    setModalMode(mode);
    if (mode === 'edit' && id) {
      loadMatiere(id);
      setCurrentId(id);
    } else {
      setMatiere({ nom: '', semestre: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const loadMatiere = async (id) => {
    const result = await axios.get(`http://192.168.101.72:8084/matieres/${id}`);
    setMatiere(result.data);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (modalMode === 'add') {
      await axios.post('http://192.168.101.72:8084/matieres', matiere);
    } else if (modalMode === 'edit') {
      await axios.put(`http://192.168.101.72:8084/matieres/${currentId}`, matiere);
    }
    loadMatieres();
    handleCloseModal();
  };

  return (
    <div className="w3l-team py-5 custom-width">
      <div className="py-4">
        <h1>Liste des Matières</h1>
        <Button className="btn btn-primary" onClick={() => handleShowModal('add')}>Ajouter Matière</Button>
        <table className="table border shadow mt-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Semestre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {matieres.map((matiere, index) => (
              <tr key={matiere.id}>
                <th scope="row">{index + 1}</th>
                <td>{matiere.nom}</td>
                <td>{matiere.semestre}</td>
                <td>
                  <Button variant="outline-primary" className="mr-2" onClick={() => handleShowModal('edit', matiere.id)}>Modifier</Button>
                  <Button variant="danger" onClick={() => deleteMatiere(matiere.id)}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'add' ? 'Ajouter une Matière' : 'Modifier une Matière'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Group>
              <Form.Label>Nom de la matière</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={matiere.nom}
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Semestre</Form.Label>
              <Form.Control
                type="text"
                name="semestre"
                value={matiere.semestre}
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {modalMode === 'add' ? 'Ajouter Matière' : 'Modifier Matière'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MatiereManager;
