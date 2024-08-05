import React, { useState } from "react";

function HeadLogin() {
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }

  const [checked, setChecked] = useState(currentTheme === 'dark')

  function changeTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setChecked(true)
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setChecked(false)
    }

  }
  return (
    <div>
      <header id="site-header" className="fixed-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark stroke">
            <h1>
              <a className="navbar-brand" href="/">
                <a className="navbar-brand" href="#/">
                  <img src="./assets/images/logo.png" alt="Your logo" title="Your logo" style={{ height: '35px' }} />
                </a>
                Authentification
              </a>
            </h1>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default HeadLogin;
