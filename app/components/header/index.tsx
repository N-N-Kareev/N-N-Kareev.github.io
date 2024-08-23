'use-client';

import { useState } from "react";

const Header = (props: any) => {

    const { linList, currentLink } = props;

    const [activeLink, setActiveLink] = useState(currentLink)

    return (
        <nav className="header">
            {
            linList.map((link: any, index: number) => {
                   
                   return (
                        <button 
                            onClick={() => setActiveLink(link)}  
                            className = {activeLink === link ? 'header-btn-active' : "header-btn"}
                            key={index}
                        >
                            {link}
                        </button>
                    )
                })
            }
        </nav>
    );
};

export default Header;