"use client";
import Link from "next/link";
import { useState } from "react";


const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);

    const navLinks = [
        { id: "/", title: "Home" },
        { id: "/applications", title: "Applicants" },
        { id: "/stats", title: "Stats" }
    ]

    const menu = "hamburger.svg";

  return (
    <nav className="w-full py-5 px-10 background-primary text-primary">
      <div className="flex items-center">
        <ul className='list-none hidden md:flex flex-row gap-10'>
            { navLinks.map((nav) => (
            <li key={nav.id} className={`${active === nav.title ? "text-tertiary" : "text-primary"} 
                hover:text-slate-500 text-[18px] font-medium cursor-pointer`} 
                onClick={() => setActive(nav.title)}>
                <Link href={`${nav.id}`}>{ nav.title }</Link>
            </li>
            ))}
        </ul>

        <div className='md:hidden flex flex-1 justify-end items-center'>
            <img src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)} />
            <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 
                        right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                <ul className='list-none flex justify-end items-start flex-col gap-4'>
                    { navLinks.map((nav) => (
                    <li key={nav.id} className={`${active === nav.title ? "text-white" : "text-secondary"} 
                        font-medium cursor-pointer text-[16px]`} 
                        onClick={() => {setToggle(!toggle); setActive(nav.title);}}>

                        <a href={`${nav.id}`}>{nav.title}</a>
                    </li>
                    ))}
                </ul>
                </div>
          </div>
      </div>
    </nav>
  )
}

export default Navbar