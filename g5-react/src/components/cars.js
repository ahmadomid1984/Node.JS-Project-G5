// src/components/Cars.js
import React, { useState } from 'react';
import '../css/cars.css';

const carData = {
    'BENZ': [
        { model: 'Mercedes-Benz A-Class', year: '2023', detail: 'Luxury compact sedan with advanced technology.', image: '/images/card.jpg', price: '30,000€' },
        { model: 'Mercedes-Benz C-Class', year: '2023', detail: 'Midsize luxury, performance and design.', image: '/images/card.jpg', price: '30,000€' },
        { model: 'Mercedes-Benz E-Class', year: '2023', detail: 'Sophisticated luxury sedan with superior comfort.', image: '/images/card.jpg', price: '30,000€' },
        { model: 'Mercedes-Benz S-Class', year: '2023', detail: 'The pinnacle of luxury and innovation.', image: '/images/card.jpg', price: '30,000€' },
        { model: 'Mercedes-Benz GLE', year: '2023', detail: 'Versatile midsize SUV with intelligent systems.', image: '/images/card.jpg', price: '30,000€' },
        { model: 'Mercedes-Benz GLS', year: '2023', detail: 'Full-size luxury SUV that seats seven.', image: '/images/card.jpg', price: '30,000€' },
    ],
    'BMW': [
        { model: 'BMW 3 Series', year: '2023', detail: 'Iconic sports sedan with dynamic capabilities.', image: '/images/bmw.jpg', price: '30,000€' },
        { model: 'BMW 5 Series', year: '2023', detail: 'Balanced performance and luxury in a sedan.', image: '/images/bmw.jpg', price: '30,000€' },
        { model: 'BMW X3', year: '2023', detail: 'Sporty, agile, and versatile SUV.', image: '/images/bmw.jpg', price: '30,000€' },
        { model: 'BMW X5', year: '2023', detail: 'Robust yet luxurious family SUV.', image: '/images/bmw.jpg', price: '30,000€' },
        { model: 'BMW i8', year: '2023', detail: 'Futuristic plug-in hybrid with exceptional performance.', image: '/images/bmw.jpg', price: '30,000€' },
        { model: 'BMW M4', year: '2023', detail: 'High-performance sports car with aggressive styling.', image: '/images/bmw.jpg', price: '30,000€' },
    ],
    'Toyota': [
        { model: 'Toyota Camry', year: '2023', detail: 'Reliable, spacious, and comfortable sedan.', image: '/images/toyota.jpg', price: '30,000€' },
        { model: 'Toyota Corolla', year: '2023', detail: 'Compact car known for its efficiency and durability.', image: '/images/toyota.jpg', price: '30,000€' },
        { model: 'Toyota Supra', year: '2023', detail: 'Legendary sports car with cutting-edge technology.', image: '/images/toyota.jpg', price: '30,000€' },
        { model: 'Toyota RAV4', year: '2023', detail: 'Compact SUV perfect for adventures.', image: '/images/toyota.jpg', price: '30,000€' },
        { model: 'Toyota Highlander', year: '2023', detail: 'Mid-size SUV ideal for families.', image: '/images/toyota.jpg', price: '30,000€' },
        { model: 'Toyota Yaris', year: '2023', detail: 'Economical compact car with modern features.', image: '/images/toyota.jpg', price: '30,000€' },
    ],
};

function Cars() {
    const [selectedBrand, setSelectedBrand] = useState('BENZ');

    const selectBrand = (brand) => {
        setSelectedBrand(brand);
    };

    return (
        <section className="carSection">
            <div className="carHeader">
                <img src="/images/header.png" alt="Featured Car" className="carHeaderImage" />
            </div>
            <div className="carTabs">
                {Object.keys(carData).map((brand) => (
                    <button
                        key={brand}
                        className={`tabItem ${selectedBrand === brand ? 'active' : ''}`}
                        onClick={() => selectBrand(brand)}
                    >
                        {brand}
                    </button>
                ))}
            </div>
            <div className="carGrid">
                {carData[selectedBrand].map((car, index) => (
                    <div key={index} className="carCard">
                        <img src={car.image} alt={`${car.model}`} className="carImage" />
                        <h4>{car.model} ({car.year})</h4>                        <p className="carDetails">{car.detail}</p>
                        <p className="carPrice">{car.price}</p>
                        <button>More Info</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Cars;