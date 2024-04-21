import React, { useEffect, useState } from 'react';
import '../css/cars.css';

function Cars() {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetch('/cars')
            .then(response => response.json())
            .then(data => {
                setCars(data);
                const uniqueBrands = [...new Set(data.map(item => item.brand))];
                setBrands(uniqueBrands);
            })
            .catch(error => {
                console.error("Error fetching cars:", error);
            });
    }, []);

    useEffect(() => {
        if (brands.length > 0) {
            setSelectedBrand(brands[0]);
        }
    }, [brands]);

    const selectBrand = (brand) => {
        setSelectedBrand(brand);
    };

    return (
        <section className="carSection">
            <div className="carHeader">
                <img src="/images/header.png" alt="Featured Car" className="carHeaderImage" />
            </div>
            <div className="carTabs">
                {brands.map((brand, index) => (
                    <button
                        key={index}
                        className={`tabItem ${selectedBrand === brand ? 'active' : ''}`}
                        onClick={() => selectBrand(brand)}
                    >
                        {brand}
                    </button>
                ))}
            </div>
            <div className="carGrid">
                {cars.filter(item => item.brand === selectedBrand).map(car => (
                    <div key={car.cars_id} className="carCard">
                        <img src='/images/bmw.jpg' alt={`${car.car_name}`} className="carImage" />
                        <h4>{car.car_name}</h4>
                        <p className="carDetails">{car.summary}</p>
                        <button onClick={() => console.log(`you clicked = ${car.cars_id}`)}>More Info</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Cars;
