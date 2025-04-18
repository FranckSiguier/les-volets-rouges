"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Routes } from "~/utils/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleClose = () => setOpen(false);
  const handleActiveLink = (link: string) => setActiveLink(link);

  return (
    <>
      {/* Mobile Header */}
      <header className="flex h-32 w-full items-center font-light text-accent lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <div className="relative flex w-full items-center justify-between">
              <Button variant="ghost" size="icon">
                <HamburgerMenuIcon />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
              <Link
                href={Routes.accueil}
                className="absolute left-1/2 -translate-x-1/2 transform"
                prefetch={false}
                onClick={handleClose}
              >
                <Image
                  width={200}
                  height={200}
                  src="/logo-navbar.png"
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
              href={Routes.accueil}
              className="flex w-full items-center justify-center"
              prefetch={false}
              onClick={handleClose}
            >
              <Image
                width={200}
                height={200}
                src="/logo-navbar.png"
                alt="Logo Restaurant"
              />
            </Link>
            <div className="grid justify-center gap-2 py-6 text-center">
              <Link
                key={"accueil"}
                href={`/`}
                className="flex w-full items-center justify-center py-2 text-lg"
                prefetch={false}
                onClick={handleClose}
              >
                Accueil
              </Link>

              <Link
                key={"menu"}
                href={`/menu`}
                className="flex w-full items-center justify-center py-2 text-lg"
                prefetch={true}
                onClick={handleClose}
              >
                Menu
              </Link>

              <Link
                key={"vins"}
                href={`/vins`}
                className="flex w-full items-center justify-center py-2 text-lg"
                prefetch={true}
                onClick={handleClose}
              >
                Vins
              </Link>

              <Link
                key={"blog"}
                href={`/blog`}
                className="flex w-full items-center justify-center py-2 text-lg"
                prefetch={true}
                onClick={handleClose}
              >
                Blog
              </Link>

              <Link
                key={"contact"}
                href={`/contact`}
                className="flex w-full items-center justify-center py-2 text-lg"
                prefetch={true}
                onClick={handleClose}
              >
                Contact
              </Link>

              <Link
                key={"reserver"}
                href={Routes.reserver}
                prefetch={true}
                onClick={handleClose}
              >
                <Button className="w-full" size="xl">
                  Réserver une table
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Header */}
      <header className="hidden h-40 w-full items-center justify-between font-cormorant text-sm text-accent md:text-lg lg:flex xl:text-xl">
        {/* Left-aligned Links */}
        <div className="flex gap-6">
          <Link
            href={Routes.accueil}
            onClick={() => handleActiveLink("accueil")}
            className={`font-light underline-offset-[4px] hover:text-primary hover:underline active:underline ${activeLink === "accueil" ? "underline" : ""}`}
            prefetch={false}
          >
            Accueil
          </Link>
          <Link
            href={Routes.menu}
            onClick={() => handleActiveLink("menu")}
            className={`font-light underline-offset-[4px] hover:text-primary hover:underline active:underline ${activeLink === "menu" ? "underline" : ""}`}
            prefetch={true}
          >
            Menu
          </Link>
          <Link
            href={Routes.vins}
            onClick={() => handleActiveLink("vins")}
            className={`font-light underline-offset-[4px] hover:text-primary hover:underline active:underline ${activeLink === "vins" ? "underline" : ""}`}
            prefetch={true}
          >
            Vins
          </Link>
          <Link
            href={Routes.blog}
            onClick={() => handleActiveLink("blog")}
            className={`font-light underline-offset-[4px] hover:text-primary hover:underline active:underline ${activeLink === "blog" ? "underline" : ""}`}
            prefetch={true}
          >
            Blog
          </Link>
          <Link
            href={Routes.contact}
            onClick={() => handleActiveLink("contact")}
            className={`font-light underline-offset-[4px] hover:text-primary hover:underline active:underline ${activeLink === "contact" ? "underline" : ""}`}
            prefetch={true}
          >
            Contact
          </Link>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <Link href={Routes.accueil} prefetch={false} onClick={handleClose}>
            <Image
              width={200}
              height={200}
              src="/logo-navbar.png"
              className="lg:hidden"
              alt="Logo Restaurant"
            />
          </Link>
          <Link href={Routes.accueil} prefetch={false} onClick={handleClose}>
            <Image
              width={300}
              height={300}
              src="/logo-navbar.png"
              className="hidden lg:block"
              alt="Logo Restaurant"
            />
          </Link>
        </div>

        {/* Right-aligned Link */}

        <Link href={Routes.reserver} prefetch={true} onClick={handleClose}>
          <Button className="w-full" size="xl">
            Réserver une table
          </Button>
        </Link>
      </header>
    </>
  );
}
