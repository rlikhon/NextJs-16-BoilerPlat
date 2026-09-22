'use client'; 

import { useState } from 'react';
import HeroSections from './HeroSections';
import VehicleSlider from './VehicleSlider';
import AuthModal from './auth/AuthModal';

function PublicHome() {
    const [authOpen, setAuthOpen] = useState(false);
    
    return (
        <>
            <HeroSections />
            <VehicleSlider />            
            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    );
}

export default PublicHome;