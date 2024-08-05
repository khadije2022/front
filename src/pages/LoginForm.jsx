import React from 'react';

const LoginForm = () => {
  return (
    <div className="container w3l-team py-5 custom-width">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Connexion</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Entrez votre email" />
                </div>
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input type="password" className="form-control" placeholder="Entrez votre mot de passe" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Connexion</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
