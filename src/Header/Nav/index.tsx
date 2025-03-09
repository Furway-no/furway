"use client";

import React, { useState } from "react";
import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import Link from "next/link";
import { SearchIcon, MenuIcon, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = data?.navItems || [];

  return (
    <nav className="flex items-center gap-4">
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <MenuIcon className="w-6 h-6 text-primary" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6">
            <ul className="flex flex-col gap-4 mt-6">
              {navItems.map(({ link }, i) => (
                <li key={i} onClick={() => setIsOpen(false)}>
                  <CMSLink {...link} appearance="link" />
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-3">
        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" />
        ))}
      </div>

      {/* Search Icon */}
      {/*
      <Link href="/search" className="ml-auto lg:ml-0">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 h-5 text-primary" />
      </Link>
      */}
    </nav>
  );
};
