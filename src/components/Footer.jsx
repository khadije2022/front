import React from "react";

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div>
      {/* footer */}
      <section className="w3l-footer-29-main">
        
        {/* copyright */}
        <section className="w3l-copyright text-center">
          <div className="container">
            <p className="copy-footer-29">
              © 2024 Archive Supnum. 
              <a rel="noreferrer" href="http://www.supnum.mr" target="_blank">
                SUPNUM
              </a>
            </p>
          </div>

          {/* move top */}
          <button onClick={topFunction} id="movetop" title="Go to top">
            &#10548;
          </button>

          {/* /move top */}
        </section>
        {/* //copyright */}
      </section>
      {/* //footer */}
    </div>
  );
}

export default Footer;
