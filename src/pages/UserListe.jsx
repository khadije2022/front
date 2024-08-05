import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const UserListe = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [user, setUser] = useState({
    email: '',
    img: '',
    name: '',
    password: '',
    role: ''
  });
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get('http://192.168.101.72:8084/user_list');
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://192.168.101.72:8084/user_list/${id}`);
    loadUsers();
  };

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleShowModal = (mode, id = null) => {
    setModalMode(mode);
    if (mode === 'edit' && id) {
      loadUser(id);
      setCurrentId(id);
    } else {
      setUser({
        email: '',
        img: '',
        name: '',
        password: '',
        role: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const loadUser = async (id) => {
    const result = await axios.get(`http://192.168.101.72:8084/user_list/${id}`);
    setUser(result.data);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (modalMode === 'add') {
      await axios.post('http://192.168.101.72:8084/user_list', user);
    } else if (modalMode === 'edit') {
      await axios.put(`http://192.168.101.72:8084/user_list/${currentId}`, user);
    }
    loadUsers();
    handleCloseModal();
  };

  return (
    <div className="w3l-team py-5 custom-width">
      <div className="py-4">
        <h1>Liste des Utilisateurs</h1>
        <Button className="btn btn-primary" onClick={() => handleShowModal('add')}>Ajouter Utilisateur</Button>
        <Table className="table border shadow mt-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Image</th>
              <th scope="col">Nom</th>
              <th scope="col">Rôle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.email}</td>
                <td><img src={`data:image/jpeg;base64,${user.img}`} alt="user" style={{width: '50px', height: '50px'}} /></td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="outline-primary" className="mr-2" onClick={() => handleShowModal('edit', user.id)}>Modifier</Button>
                  <Button variant="danger" onClick={() => deleteUser(user.id)}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'add' ? 'Ajouter un Utilisateur' : 'Modifier un Utilisateur'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="img"
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mot de Passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rôle</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={user.role}
                onChange={e => onInputChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {modalMode === 'add' ? 'Ajouter Utilisateur' : 'Modifier Utilisateur'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserListe;
