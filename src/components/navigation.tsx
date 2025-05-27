"use client";
import MenuIcon from '@/assets/images/btn_menu.svg';
import Link from 'next/link';

export default function Navigation() {
  return (
    <header id="header" className="border-b">
      <div className="flex justify-between items-center">
        <h1 className="px-3 py-2 text-xl font-bold text-center text-3xl">          
           <Link href="/">ggYu</Link>
        </h1>
        <button type="button" className="px-3 py-2 w-12 h-12">
          <img src={MenuIcon.src} alt="MenuIcon" />
        </button>
      </div>
    </header>
  );
}
