"use client";

import { Clock, Coffee, UtensilsCrossed } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function RestaurantHours() {
  const hours = [
    {
      days: "Mercredi - Vendredi",
      time: "12h15 - 14h",
      type: "Déjeuner",
      icon: Coffee,
    },
    {
      days: "Mardi - Samedi",
      time: "19h30 - 21h30",
      type: "Dîner",
      icon: UtensilsCrossed,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl p-4 lg:w-1/2">
      <Card className="relative overflow-hidden border border-accent text-accent">
        <div className="absolute inset-0 opacity-5" />
        <CardHeader className="relative z-10 text-center">
          <CardTitle className="font-cormorant text-4xl font-light md:text-6xl">
            Horaires d&apos;ouverture
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2">
            {hours.map((schedule) => {
              const Icon = schedule.icon;
              return (
                <div key={schedule.type} className="group">
                  <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between text-accent">
                        <Icon className="h-6 w-6" />
                        <Clock className="h-5 w-5" />
                      </div>
                      <h3 className="mb-1 text-lg font-medium">
                        {schedule.type}
                      </h3>
                      <div className="space-y-1 text-lg font-light">
                        <p>{schedule.days}</p>
                        <p>{schedule.time}</p>
                      </div>
                      <div className="from-accent-200 absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r to-primary transition-transform group-hover:scale-x-100" />
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
