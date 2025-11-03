"use client";
import React from "react";
import Link from "next/link";
import Logo from "@/assets/images/logo.gif";

export default function Header() {
  return (
    <header id="header" className="relative z-50">
      <div className="text-center">
        <h1 className="pt-8 font-bold text-center text-5xl sm:pt-12">
          <Link href="/">
            <img
              src={Logo.src}
              className="inline-block max-w-24 sm:max-w-34"
              alt="ggYu"
            />
          </Link>
        </h1>
        <p className="mt-6 text-gray-500">
          안녕하세요! 즐거운 퀴즈 세상 ggYu입니다.
        </p>
      </div>
    </header>
  );
}
