'use-client';

import Image from "next/image";
import { useState } from "react";
import css from "./header.module.css";

const Header = (props: any) => {

    const { linList, currentLink } = props;

    const [activeLink, setActiveLink] = useState(currentLink)

    function gotToCategory(id: string) {
        setActiveLink(id);
        const content =  document.getElementById(id);
        if(content) {
            window.scrollTo({
                top: content.offsetTop - 70,
                behavior: 'smooth'
              });
        }
    }

    return (
        <nav className={css.header}>
            {
            linList.map((link: any, index: number) => {
                   
                   return (
                       <div key={index}>
                         <button 
                            onClick={() => gotToCategory(link.name)}  
                            className = {activeLink === link.name ? css.active : css.btn}
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