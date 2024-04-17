import React from 'react';
import '../css/aboutUs.css';  // Ensure this is the correct path to your CSS file

function AboutUs() {
    return (
        <div className="aboutUs">
            <section className="aboutUsHeader">
                <h1>About Our Company</h1>
                <p>Our company is a leading digital marketplace and solutions provider for the automotive industry that connects car shoppers with sellers. Launched in 2024 and headquartered in Hämeenlinna, the Company empowers shoppers with the data, resources and digital tools needed to make informed buying decisions and seamlessly connect with automotive retailers. In a rapidly changing market, our company enables dealerships and OEMs with innovative technical solutions and data-driven intelligence to better reach and influence ready-to-buy shoppers, increase inventory turn and gain market share. Recently, our company acquired Dealer Inspire®, an innovative technology company building solutions that future-proof dealerships with more efficient operations, a faster and easier car buying process, and connected digital experiences that sell and service more vehicles. We are passionate about cars and aim to deliver the best experience for car enthusiasts.</p>
            </section>
            <section className="missionBanner">
                <img src="/images/banner.jpg" alt="Our Mission Banner" />
            </section>
            <section className="team">
                <h2>Meet Our Team</h2>
                <div className="teamMembers">
                    <div className="teamMember">
                        <img src="/images/CTO.jpg" alt="CTO Name" />
                        <h3>Mäkelä Virtanen, CTO</h3>
                        <p>Mäkelä is an expert in cars selling and leads our sales & marketing section.</p>
                    </div>
                    <div className="teamMember">
                        <img src="/images/CEO2.jpg" alt="CEO Name" />
                        <h3>John Doe, CEO</h3>
                        <p>John has over 20 years of experience in the automotive industry and is a car enthusiast.</p>
                    </div>
                    <div className="teamMember">
                        <img src="/images/CTO2.jpg" alt="CTO Name" />
                        <h3>Jane Smith, CTO</h3>
                        <p>Jane is an expert in automotive technology and leads our tech innovation.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;