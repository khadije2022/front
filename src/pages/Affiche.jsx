import React, { useState } from 'react';

function Affiche() {
    const [selectedType, setSelectedType] = useState('Recherche');
    const [selectedYear, setSelectedYear] = useState('2023');
    const [currentPage, setCurrentPage] = useState(1);

    const types = ['Recherche', 'Devoir', 'Examen', 'Rattrapage'];
    const years = ['2021', '2022', '2023', '2024'];
    const itemsPerPage = 3;
    const data = [
        { year: '2023', img: 'assets/images/team1.jpg' },
        { year: '2022', img: 'assets/images/team2.jpg' },
        { year: '2024', img: 'assets/images/team3.jpg' },
        { year: '2021', img: 'assets/images/team4.jpg' },
        // ... Ajoutez plus de données si nécessaire
    ];

    const filteredData = data.filter(item => item.year === selectedYear);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <section className="w3l-team py-5 custom-width" id="team">
            <div className="call-w3 py-lg-5 py-md-4">
                <div className="container-fluid">
                    <div className="row main-cont-wthree-2 justify-content-center">
                        <div className="col-12 mb-4">
                            <div className="d-flex justify-content-center mb-4">
                                <div className="select-container">
                                    <select className="form-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                                        {types.map(type => (
                                            <option key={type} className="form-select" value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <select className="form-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                                        {years.map(year => (
                                            <option key={year} className="form-select" value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                {displayedData.map((item, index) => (
                                    <div key={index} className="col-md-4 col-sm-6 mb-4">
                                        <div className="box16">
                                            <a href="#url">
                                                <img src={item.img} alt="" className="img-fluid radius-image" />
                                            </a>
                                            <div className="box-content">
                                                <h3 className="title">
                                                    <a href="#url">{item.year}</a>
                                                </h3>
                                                <ul className="social">
                                                    <li>
                                                        <a href="#link" className="facebook">
                                                            <span className="fa fa-download"></span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#link" className="twitter">
                                                            <span className="fa fa-eye"></span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="d-flex justify-content-center">
                                <nav>
                                    <ul className="pagination">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Affiche;
