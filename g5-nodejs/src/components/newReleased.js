// src/components/newReleased.js
import React from 'react';
import '../css/newReleased.css';

function NewReleased() {
    // Data for the latest released cars with unique image paths
    const latestCars = [
        { id: 1, model: 'Toyota', price: '100,000 €', image: '/images/toyota.jpg', link: 'http://example.com/toyota' },
        { id: 2, model: 'Benz 2024', price: '100,000 €', image: '/images/card.jpg', link: 'http://example.com/benz' },
        { id: 3, model: 'BMW M4', price: '100,000 €', image: '/images/bmw.jpg', link: 'http://example.com/bmw' },
    ];

    return (
        <section className="latestReleased">
            <h2 className="title">LATEST RELEASED CAR MODELS</h2>
            <div className="latestCars">
                {latestCars.map(car => (
                    <div key={car.id} className="latestCar">
                        <img src={car.image} alt={`${car.model}`} className="carImage" />
                        <h3>{car.model}</h3>
                        <p>{car.price}</p>
                        <a href={car.link} target="_blank" rel="noopener noreferrer" className="viewDetails">
                            →
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default NewReleased;
