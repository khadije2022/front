import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const SujetListe = () => {
  const [sujets, setSujets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [sujet, setSujet] = useState({
    annee: '',
    sujet: '',
    type: '',
    matiereIdMatiere: ''
  });
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    loadSujets();
  }, []);

  const loadSujets = async () => {
    const result = await axios.get('http://192.168.100.8:8084/sujets');
    setSujets(result.data);
  };

  const deleteSujet = async (id) => {
    await axios.delete(`http://192.168.100.8:8084/sujets/${id}`);
    loadSujets();
  };

  const onInputChange = e => {
    if (e.target.name === 'sujet') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSujet({ ...sujet, [e.target.name]: reader.result.split(',')[1] }); // Encode in Base64
      };
      reader.readAsDataURL(file);
    } else {
      setSujet({ ...sujet, [e.target.name]: e.target.value });
    }
  };

  const handleShowModal = (mode, id = null) => {
    setModalMode(mode);
    if (mode === 'edit' && id) {
      loadSujet(id);
      setCurrentId(id);
    } else {
      setSujet({
        annee: '',
        sujet: '',
        type: '',
        matiereIdMatiere: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const loadSujet = async (id) => {
    const result = await axios.get(`http://192.168.100.8:8084/sujets/${id}`);
    setSujet({
      ...result.data,
      sujet: result.data.sujetBase64
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const sujetData = {
      ...sujet,
      sujetBase64: sujet.sujet // Ensure we're sending the base64-encoded file
    };

    try {
      if (modalMode === 'add') {
        await axios.post('http://192.168.100.8:8084/sujets', sujetData);
      } else if (modalMode === 'edit') {
        await axios.put(`http://192.168.100.8:8084/sujets/${currentId}`, sujetData);
      }
      loadSujets();
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div className="containerw3l-team py-5 custom-width">
      <div className="py-4">
        <h1>Liste des Sujets</h1>
        <Button className="btn btn-primary" onClick={() => handleShowModal('add')}>Ajouter Sujet</Button>
        <Table className="table border shadow mt-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Année</th>
              <th scope="col">Sujet</th>
              <th scope="col">Type</th>
              <th scope="col">Matière ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sujets.map((sujet, index) => (
              <tr key={sujet.id}>
                <th scope="row">{index + 1}</th>
                <td>{sujet.annee}</td>
                <td><a href={`data:application/pdf;base64,${sujet.sujetBase64}`} target="_blank" rel="noopener noreferrer">Voir Sujet</a></td>
                <td>{sujet.type}</td>
                <td>{sujet.matiereIdMatiere}</td>
                <td>
                  <Button variant="outline-primary" className="mr-2" onClick={() => handleShowModal('edit', sujet.id)}>Modifier</Button>
                  <Button variant="danger" onClick={() => deleteSujet(sujet.id)}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'add' ? 'Ajouter un Sujet' : 'Modifier un Sujet'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Group>
              <Form.Label>Année</Form.Label>
              <Form.Control
                type="number"
                name="annee"
                value={sujet.annee}
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sujet</Form.Label>
              <Form.Control
                type="file"
                name="sujet"
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={sujet.type}
                onChange={e => onInputChange(e)}
              >
                <option value="Devoir">Devoir</option>
                <option value="Examen">Examen</option>
                <option value="Rattrapage_Examen">Rattrapage Examen</option>
                <option value="Rattrapage_Devoir">Rattrapage Devoir</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>ID Matière</Form.Label>
              <Form.Control
                type="number"
                name="matiereIdMatiere"
                value={sujet.matiereIdMatiere}
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              {modalMode === 'add' ? 'Ajouter Sujet' : 'Modifier Sujet'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SujetListe;
