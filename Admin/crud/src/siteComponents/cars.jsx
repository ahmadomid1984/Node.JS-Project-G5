import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cars.css';

// Add the correct protocol (http or https) depending on your backend setup
const baseURL = 'https://node-js-project-g5-kohl.vercel.app';

function Cars() {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${baseURL}/api/cars`)
            .then(response => response.json())
            .then(data => {
                setCars(data);
                const uniqueBrands = [...new Set(data.map(item => item.brand))];
                setBrands(uniqueBrands);
            })
            .catch(error => {
                console.error("Error fetching cars:", error);
                setError("Failed to fetch cars. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
