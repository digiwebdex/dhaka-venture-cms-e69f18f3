import { useState } from "react";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FIELDS: { key: keyof ReturnType<typeof useCms>["contactPage"]; label: string; textarea?: boolean }[] = [
  { key: "introEn", label: "Intro Text (EN)", textarea: true },
  { key: "introBn", label: "Intro Text (BN)", textarea: true },
  { key: "officeHoursEn", label: "Office Hours (EN)" },
  { key: "officeHoursBn", label: "Office Hours (BN)" },
  { key: "mapEmbedUrl", label: "Google Maps Embed URL" },
  { key: "formTitleEn", label: "Form Title (EN)" },
  { key: "formTitleBn", label: "Form Title (BN)" },
  { key: "successTitleEn", label: "Form Success Title (EN)" },
  { key: "successTitleBn", label: "Form Success Title (BN)" },
  { key: "successDescEn", label: "Form Success Description (EN)" },
  { key: "successDescBn", label: "Form Success Description (BN)" },
];

const AdminContactPage = () => {
  const { contactPage, updateContactPage } = useCms();
  const { toast } = useToast();
  const [form, setForm] = useState({ ...contactPage });

  const save = () => { updateContactPage(form); toast({ title: "Contact page saved!" }); };

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Contact Page Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDS.map((f) => (
              <div key={f.key} className={f.key === "mapEmbedUrl" ? "md:col-span-2" : ""}>
                <label className="text-sm font-medium text-muted-foreground">{f.label}</label>
                {f.textarea ? (
                  <Textarea rows={3} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                ) : (
                  <Input value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Map: paste the <code>src</code> URL from Google Maps → Share → Embed a map (starts with <code>https://www.google.com/maps/embed?...</code>).
          </p>
          <Button onClick={save} className="bg-primary text-primary-foreground font-semibold h-11 px-8">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContactPage;
