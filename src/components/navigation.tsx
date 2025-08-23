"use client";
import { useState, useEffect } from 'react';
import { usePathname,useSearchParams  } from 'next/navigation';
import Link from 'next/link';
import MenuIcon from '@/assets/images/btn_menu.svg';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };


  // 경로 변경 시 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, searchParams.toString()]);

  return (
    <header id="header" className="border-b relative z-50">
      <div className="flex justify-between items-center"> 
        <h1 className="px-3 py-2 text-xl font-bold text-center text-3xl"> 
          <Link href="/">ggYu</Link> 
        </h1> 
        <button type="button" className="px-3 py-2 w-12 h-12" onClick={toggleMenu}> 
          <img src={MenuIcon.src} alt="MenuIcon" /> 
        </button> 
      </div>
      {/* 오버레이 */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40"
          onClick={toggleMenu}
        />
      )}

      {/* 슬라이딩 메뉴 */}
      <div
        className={`absolute top-0 right-0 h-screen w-[300px] bg-white z-50 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h2 className="pt-10 px-4 text-right text-3xl mb-10 font-bold">ggYu</h2>
        <ul className="text-right">
          <li className="border-y border-slate-300">
            <Link className="block leading-10 px-4" href="/">HOME</Link>
          </li>
          <li className="border-b border-slate-300">
            <Link className="block leading-10 px-4" href={{ pathname: '/quiz', query: { name: 'country' } }}>나라 퀴즈</Link>
          </li>
          <li className="border-b border-slate-300">
            <Link className="block leading-10 px-4" href={{ pathname: '/quiz', query: { name: 'hanja' } }}>한문 퀴즈</Link>
          </li>
          <li className="border-b border-slate-300">
            <Link className="block leading-10 px-4" href={{ pathname: '/quiz', query: { name: 'capital' } }}>수도 퀴즈</Link>
          </li>
          <li className="border-b border-slate-300">
            <Link className="block leading-10 px-4" href={{ pathname: '/quiz', query: { name: 'sense' } }}>상식 퀴즈</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}