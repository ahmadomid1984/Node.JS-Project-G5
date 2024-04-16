// src/components/Cars.js
import React, { useState } from 'react';
import '../css/cars.css';

const carData = {
    'BENZ': [
        { model: 'Mercedes-Benz A-Class', detail: 'Luxury compact sedan with advanced technology.', image: '/images/card.jpg' },
        { model: 'Mercedes-Benz C-Class', detail: 'Midsize luxury, performance and design.', image: '/images/card.jpg' },
        { model: 'Mercedes-Benz E-Class', detail: 'Sophisticated luxury sedan with superior comfort.', image: '/images/card.jpg' },
        { model: 'Mercedes-Benz S-Class', detail: 'The pinnacle of luxury and innovation.', image: '/images/card.jpg' },
        { model: 'Mercedes-Benz GLE', detail: 'Versatile midsize SUV with intelligent systems.', image: '/images/card.jpg' },
        { model: 'Mercedes-Benz GLS', detail: 'Full-size luxury SUV that seats seven.', image: '/images/card.jpg' },
    ],
    'BMW': [
        { model: 'BMW 3 Series', detail: 'Iconic sports sedan with dynamic capabilities.', image: '/images/bmw.jpg' },
        { model: 'BMW 5 Series', detail: 'Balanced performance and luxury in a sedan.', image: '/images/bmw.jpg' },
        { model: 'BMW X3', detail: 'Sporty, agile, and versatile SUV.', image: '/images/bmw.jpg' },
        { model: 'BMW X5', detail: 'Robust yet luxurious family SUV.', image: '/images/bmw.jpg' },
        { model: 'BMW i8', detail: 'Futuristic plug-in hybrid with exceptional performance.', image: '/images/bmw.jpg' },
        { model: 'BMW M4', detail: 'High-performance sports car with aggressive styling.', image: '/images/bmw.jpg' },
    ],
    'Toyota': [
        { model: 'Toyota Camry', detail: 'Reliable, spacious, and comfortable sedan.', image: '/images/toyota.jpg' },
        { model: 'Toyota Corolla', detail: 'Compact car known for its efficiency and durability.', image: '/images/toyota.jpg' },
        { model: 'Toyota Supra', detail: 'Legendary sports car with cutting-edge technology.', image: '/images/toyota.jpg' },
        { model: 'Toyota RAV4', detail: 'Compact SUV perfect for adventures.', image: '/images/toyota.jpg' },
        { model: 'Toyota Highlander', detail: 'Mid-size SUV ideal for families.', image: '/images/toyota.jpg' },
        { model: 'Toyota Yaris', detail: 'Economical compact car with modern features.', image: '/images/toyota.jpg' },
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
                        <h4>{car.model}</h4>
                        <p className="carDetails">{car.detail}</p>
                        <button>More Info</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Cars;