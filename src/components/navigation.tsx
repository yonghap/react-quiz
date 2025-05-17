"use client";
import MenuIcon from '@/assets/images/btn_menu.svg';

export default function Navigation() {
  return (
    <header id="header" className="border-b">
      <div className="flex justify-between">
        <h1 className="p-2 text-xl font-bold text-center text-3xl">
          <span>ggYu</span>
        </h1>
        <button type="button" className="p-2 w-10 h-10">
          <img src={MenuIcon.src} alt="MenuIcon" />
        </button>
      </div>
    </header>
  );
}
