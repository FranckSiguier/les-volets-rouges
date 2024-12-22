import { SeparatorBanner } from "~/components/separator-banner";
import { Separator } from "~/components/ui/separator";

export default function BookPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-6">
      <div className="w-full">
        <Separator />
        <SeparatorBanner title="Réserver une table" />
        <Separator />
      </div>
      <iframe
        src="https://bookings.zenchef.com/results?rid=371318&fullscreen=1"
        width="100%"
        height="630"
        className="mx-0 my-auto block h-[630px] max-w-[600px]"
      />
    </div>
  );
}
