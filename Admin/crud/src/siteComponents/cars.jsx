import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cars.css'; // Ensure your CSS path is correct


function Cars() {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://node-js-project-g5.onrender.com/cars')
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
    
    const showCarDetails = (car) => {
        navigate('/car', { state: { car } }); // Navigate to the CarDetail page along with car object
    };

    return (
        <section className="carSection">
            <div className="carHeader">
                <img src="/images/poster3.gif" alt="Featured Car" className="carHeaderImage" />
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
                    <div className="carCard">
                    <img src={`/images/${car.brand}_${car.car_name}.jpg`} alt={`${car.car_name}`} className="carImage" />
                    <div className="carCardContent">
                        <h4>{car.brand} {car.car_name} ({car.releasedDate})</h4>
                        <p className="carDetails">{car.summary}</p>
                    </div>
                    <button onClick={() => showCarDetails(car)}>More Info</button>
                    </div>  
                ))}
            </div>
        </section>
    );
}

export default Cars;
