import React from 'react';
import Search from './Search.jsx';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo / Title */}
                    <div className="flex-shrink-0 text-gradient font-bold text-xl tracking-wide">
                        MovieMood
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
