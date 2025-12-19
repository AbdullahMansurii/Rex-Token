import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`relative flex items-center justify-center rounded-full overflow-hidden shadow-glow ${className}`}>
            <img
                src="/rex-logo.jpg"
                alt="REX Token Logo"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Logo;
