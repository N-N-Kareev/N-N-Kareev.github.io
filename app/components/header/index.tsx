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
                            onClick={() => setActiveLink(link.name)}  
                            className = {activeLink === link.name ? 'header-btn-active' : "header-btn"}
                            key={index}
                        >
                            {link.name}
                        </button>
                    )
                })
            }
        </nav>
    );
};

export default Header;