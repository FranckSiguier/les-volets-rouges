"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleClose = () => setOpen(false);
  const handleActiveLink = (link: string) => setActiveLink(link);

  return (
    <>
      {/* Mobile Header */}
      <header className="flex h-20 w-full items-center font-light text-accent lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <div className="relative flex w-full items-center justify-between">
              <Button variant="ghost" size="icon">
                <HamburgerMenuIcon />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 transform"
                prefetch={false}
                onClick={handleClose}
              >
                <Image
                  width={150}
                  height={150}
                  src="/logo-horizontal.png"
                  alt="Logo Restaurant"
                />
              </Link>
            </div>
          </SheetTrigger>
          <SheetContent
            className="font-light text-accent max-sm:min-w-full"
            side="left"
          >
            <Link
              href="/"
              className="flex w-full items-center justify-center"
              prefetch={false}
              onClick={handleClose}
            >
              <Image
                width={150}
                height={150}
                src="/logo-horizontal.png"
                alt="Logo Restaurant"
              />
            </Link>
            <div className="grid justify-center gap-2 py-6 text-center">
              {["menu", "vins", "blog", "contact", "book"].map((link) => (
                <Link
                  key={link}
                  href={`/${link}`}
                  className="flex w-full items-center justify-center py-2 text-lg"
                  prefetch={false}
                  onClick={handleClose}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Header */}
      <header className="hidden h-32 w-full items-center justify-between text-lg text-accent lg:flex">
        {/* Left-aligned Links */}
        <div className="flex gap-6">
          <Link
            href="/menu"
            onClick={() => handleActiveLink("menu")}
            className={`font-light underline-offset-[4px] hover:text-primary hover:underline active:underline ${activeLink === "menu" ? "underline" : ""}`}
            prefetch={false}
          >
            Menu
          </Link>
          <Link
            href="/vins"
            onClick={() => handleActiveLink("vins")}
            className={`font-light underline-offset-[4px] hover:text-primary hover:underline active:underline ${activeLink === "vins" ? "underline" : ""}`}
            prefetch={false}
          >
            Vins
          </Link>
          <Link
            href="/blog"
            onClick={() => handleActiveLink("blog")}
            className={`font-light underline-offset-[4px] hover:text-primary hover:underline active:underline ${activeLink === "blog" ? "underline" : ""}`}
            prefetch={false}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={() => handleActiveLink("contact")}
            className={`font-light underline-offset-[4px] hover:text-primary hover:underline active:underline ${activeLink === "contact" ? "underline" : ""}`}
            prefetch={false}
          >
            Contact
          </Link>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <Link href="/" prefetch={false} onClick={handleClose}>
            <Image
              width={200}
              height={200}
              src="/logo-horizontal.png"
              alt="Logo Restaurant"
            />
          </Link>
        </div>

        {/* Right-aligned Link */}
        <div className="flex gap-6 rounded-lg border border-accent p-2 font-light hover:border-secondary hover:bg-secondary hover:text-background">
          <Link href="/book" prefetch={false}>
            Réserver une table
          </Link>
        </div>
      </header>
    </>
  );
}
