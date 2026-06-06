import { useState } from "react";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ServicePageHero, ServicePagesContent } from "@/data/defaultData";

type PageKey = keyof ServicePagesContent;

const SECTIONS: { key: PageKey; label: string }[] = [
  { key: "hajjUmrah", label: "Hajj & Umrah" },
  { key: "tourPackages", label: "Tour Packages" },
  { key: "airTicket", label: "Air Ticket" },
  { key: "hotelBooking", label: "Hotel Booking" },
  { key: "visaProcessing", label: "Visa Processing" },
];

const FIELDS: { key: keyof ServicePageHero; label: string; textarea?: boolean }[] = [
  { key: "heroTitleEn", label: "Hero Title (EN)" },
  { key: "heroTitleBn", label: "Hero Title (BN)" },
  { key: "heroDescEn", label: "Hero Description (EN)", textarea: true },
  { key: "heroDescBn", label: "Hero Description (BN)", textarea: true },
  { key: "sectionTitleEn", label: "Section Title (EN) — optional" },
  { key: "sectionTitleBn", label: "Section Title (BN) — optional" },
  { key: "sectionSubtitleEn", label: "Section Subtitle (EN) — optional", textarea: true },
  { key: "sectionSubtitleBn", label: "Section Subtitle (BN) — optional", textarea: true },
];

const AdminServicePages = () => {
  const { servicePages, updateServicePages, airDestinations, addAirDestination, updateAirDestinations, deleteAirDestination } = useCms();
  const { toast } = useToast();
  const [form, setForm] = useState<ServicePagesContent>({ ...servicePages });
  const [destForm, setDestForm] = useState({ id: "", nameEn: "", nameBn: "", image: "" });

  const setField = (page: PageKey, field: keyof ServicePageHero, value: string) => {
    setForm({ ...form, [page]: { ...form[page], [field]: value } });
  };

  const save = () => { updateServicePages(form); toast({ title: "Service pages saved!" }); };

  const updateDest = (id: string, field: "nameEn" | "nameBn" | "image", value: string) => {
    updateAirDestinations(airDestinations.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const addDest = () => {
    if (!destForm.nameEn) return;
    addAirDestination({ ...destForm, id: Date.now().toString() });
    setDestForm({ id: "", nameEn: "", nameBn: "", image: "" });
    toast({ title: "Destination added!" });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h2 className="font-bold text-xl">Service Pages Content</h2>

      {SECTIONS.map(({ key, label }) => (
        <Card key={key}>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg">{label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIELDS.map((f) => (
                <div key={f.key} className={f.textarea ? "md:col-span-1" : ""}>
                  <label className="text-sm font-medium text-muted-foreground">{f.label}</label>
                  {f.textarea ? (
                    <Textarea rows={3} value={form[key][f.key]} onChange={(e) => setField(key, f.key, e.target.value)} />
                  ) : (
                    <Input value={form[key][f.key]} onChange={(e) => setField(key, f.key, e.target.value)} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={save} className="bg-primary text-primary-foreground font-semibold h-11 px-8">
        Save Service Pages
      </Button>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Air Ticket — Destinations</h3>
          <div className="space-y-3">
            {airDestinations.map((d) => (
              <div key={d.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr_auto] gap-3 items-end border-b pb-3">
                <div>
                  <label className="text-xs text-muted-foreground">Name (EN)</label>
                  <Input value={d.nameEn} onChange={(e) => updateDest(d.id, "nameEn", e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Name (BN)</label>
                  <Input value={d.nameBn} onChange={(e) => updateDest(d.id, "nameBn", e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Image URL</label>
                  <Input value={d.image} onChange={(e) => updateDest(d.id, "image", e.target.value)} />
                </div>
                <Button size="sm" variant="destructive" onClick={() => deleteDestination(d.id)}>✕</Button>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Add Destination</h4>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr_auto] gap-3 items-end">
              <Input placeholder="Name (EN)" value={destForm.nameEn} onChange={(e) => setDestForm({ ...destForm, nameEn: e.target.value })} />
              <Input placeholder="Name (BN)" value={destForm.nameBn} onChange={(e) => setDestForm({ ...destForm, nameBn: e.target.value })} />
              <Input placeholder="Image URL" value={destForm.image} onChange={(e) => setDestForm({ ...destForm, image: e.target.value })} />
              <Button onClick={addDest}>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  function deleteDestination(id: string) {
    deleteAirDestination(id);
    toast({ title: "Destination removed" });
  }
};

export default AdminServicePages;
