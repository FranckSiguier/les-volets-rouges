/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Fragment } from "react";
import { Separator } from "./ui/separator";

export default function Marquee() {
  const openingHours = [
    "Mercredi - Vendredi : 12h15 - 14h",
    "Mardi - Samedi : 19h30 - 21h30",
  ];

  // Calculate the total width of the content
  const contentWidth =
    openingHours.reduce((acc, hours) => acc + hours.length, 0) * 14; // Increased width per character

  return (
    <div
      className="mt-6 w-full overflow-hidden py-3 text-xl font-light text-accent"
      aria-label="Horaires d'ouverture du restaurant"
    >
      <div className="w-full overflow-hidden opacity-75" aria-hidden="true">
        <Separator />
        <div
          className="inline-flex items-center whitespace-nowrap py-1 motion-reduce:animate-none motion-reduce:whitespace-normal"
          style={{ animationDuration: `${contentWidth / 40}s` }}
        >
          {[...Array(5)].map((_, index) => (
            <Fragment key={index}>
              {openingHours.map((hours, hoursIndex) => (
                <div key={hoursIndex}>
                  <span className="items-center text-xl">{hours}</span>
                  <span className="items-center px-4 text-2xl font-light text-accent">
                    |
                  </span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        <Separator className="mt-1" />
      </div>
      <div className="sr-only">
        {openingHours.map((hours, index) => (
          <p key={index}>{hours}</p>
        ))}
      </div>
    </div>
  );
}
