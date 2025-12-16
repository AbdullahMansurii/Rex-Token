import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-800 shadow-glow ${className}`}>
            {/* Abstract R / Token Symbol */}
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[60%] h-[60%] text-white"
            >
                <path
                    d="M15 4H9C6.79086 4 5 5.79086 5 8V16C5 18.2091 6.79086 20 9 20H15C17.2091 20 19 18.2091 19 16V8C19 5.79086 17.2091 4 15 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-50"
                />
                <path
                    d="M10 8H13C14.1046 8 15 8.89543 15 10C15 11.1046 14.1046 12 13 12H10V8Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10 12H12L15 16"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10 16V12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default Logo;
