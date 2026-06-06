import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";
import BookingFormDialog from "@/components/BookingFormDialog";

const AirTicketPage = () => {
  const { t, lang } = useLang();
  const { servicePages, airDestinations } = useCms();
  const sp = servicePages.airTicket;
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  return (
    <div className="py-16">
      <div className="bg-navy-gradient text-primary-foreground py-16 -mt-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Plane className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{lang === "bn" ? sp.heroTitleBn : sp.heroTitleEn}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">{lang === "bn" ? sp.heroDescBn : sp.heroDescEn}</p>
          <div className="mt-6 inline-block bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-semibold">
            {t.offers.limitedTime}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {airDestinations.map((dest) => {
            const name = lang === "bn" ? dest.nameBn : dest.nameEn;
            return (
              <Card key={dest.id} className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-40 overflow-hidden">
                  <img src={dest.image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <CardContent className="p-5 text-center">
                  <h3 className="font-bold text-lg mb-3">{name}</h3>
                  <Button variant="gold" onClick={() => { setSelectedPkg(`Air Ticket - ${name}`); setBookingOpen(true); }}>
                    {t.nav.bookNow}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <BookingFormDialog open={bookingOpen} onOpenChange={setBookingOpen} packageName={selectedPkg} />
    </div>
  );
};

export default AirTicketPage;
