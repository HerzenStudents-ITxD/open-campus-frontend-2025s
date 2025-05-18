import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import EventsSection from './eventsSection';
import MainSection from './mainSection';
import SpacesOverview from './SpacesOverview';

interface LocationsProps {
  className?: string;
}

const Locations: React.FC<LocationsProps> = ({ className }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div style={{ backgroundColor: '#EBE6E2' }}>
      <div className="d-flex flex-column min-vh-100">
        <EventsSection className={className} />

        <main className="flex-grow-1 container-fluid">
          <section data-aos="fade-up" className="mb-5">
            <SpacesOverview />
          </section>
        </main>

        <section data-aos="fade-up" className="mt-5">
          <MainSection className={className} />
        </section>
      </div>
    </div>
  );
};

export default Locations;
