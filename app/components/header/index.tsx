'use-client';

import Image from "next/image";
import { useState } from "react";

const Header = (props: any) => {

    const { linList, currentLink } = props;

    const [activeLink, setActiveLink] = useState(currentLink)

    return (
        <nav className="header">
            {
            linList.map((link: any, index: number) => {
                   
                   return (
                       <div key={index}>
                         <button 
                            onClick={() => setActiveLink(link.name)}  
                            className = {activeLink === link.name ? 'header-btn-active' : "header-btn"}
                        >
                            <Image src={link.icon} alt="" width={20} height={20}/>
                            <p>{link.name}</p>
                        </button>
                       </div>
                    )
                })
            }
        </nav>
    );
};

export default Header;