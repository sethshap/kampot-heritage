import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { makeApi } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";
import { PreferredLanguage, UserRole } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const labels = {
  en: {
    title: "Hotel Registration",
    subtitle:
      "Register to order Kampot Heritage artisanal soap for your property",
    businessName: "Business Name",
    phone: "Phone Number",
    language: "Preferred Language",
    submit: "Register & Continue",
    required: "Required",
    phoneError: "This phone number is already registered.",
    generalError: "Registration failed. Please try again.",
  },
  km: {
    title: "ចុះឈ្មោះសណ្ឋាគារ",
    subtitle: "ចុះឈ្មោះដើម្បីបញ្ជាទិញសាប៊ូដៃដែលមានប្រថាប់តាំងប្រពៃណីខ្មែរ",
    businessName: "ឈ្មោះអាជីវកម្ម",
    phone: "លេខទូរស័ព្ទ",
    language: "ភាសាដែលចូលចិត្ត",
    submit: "ចុះឈ្មោះ & បន្ត",
    required: "ត្រូវការ",
    phoneError: "លេខទូរស័ព្ទនេះត្រូវបានចុះឈ្មោះរួចហើយ។",
    generalError: "ការចុះឈ្មោះបរាជ័យ។ សូមព្យាយាមម្ដងទៀត។",
  },
  fr: {
    title: "Inscription Hôtel",
    subtitle:
      "Inscrivez-vous pour commander du savon artisanal Kampot Heritage pour votre établissement",
    businessName: "Nom de l'entreprise",
    phone: "Numéro de téléphone",
    language: "Langue préférée",
    submit: "S'inscrire & Continuer",
    required: "Requis",
    phoneError: "Ce numéro de téléphone est déjà enregistré.",
    generalError: "L'inscription a échoué. Veuillez réessayer.",
  },
};

export default function HotelRegistration() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { actor, isFetching } = useActor(createActor);
  const l = labels[lang];

  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [prefLang, setPrefLang] = useState<PreferredLanguage>(
    PreferredLanguage.en,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor || isFetching) return;
    setLoading(true);
    setError(null);
    try {
      const api = makeApi(actor);
      const userId = await api.registerUser({
        fullNameEn: businessName,
        phoneNumber: phone,
        preferredLanguage: prefLang,
        role: UserRole.hotel,
      });
      localStorage.setItem("hotel_user_id", userId.toString());
      localStorage.setItem("hotel_user_name", businessName);
      navigate("/hotel/select-champion");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (
        msg.toLowerCase().includes("phone") ||
        msg.toLowerCase().includes("already")
      ) {
        setError(l.phoneError);
      } else {
        setError(l.generalError);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      {/* Close button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Back to home"
        data-ocid="hotel.register.close_button"
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <Card className="w-full max-w-md border-border shadow-md">
        <CardHeader className="text-center pb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🏨</span>
          </div>
          <CardTitle className="font-display text-2xl text-foreground">
            {l.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{l.subtitle}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="business-name"
                className="text-foreground font-medium"
              >
                {l.businessName} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="business-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder="Kampot River Lodge"
                className="border-input"
                data-ocid="hotel.register.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-foreground font-medium">
                {l.phone} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+855 12 345 678"
                className="border-input"
                data-ocid="hotel.register.phone_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground font-medium">
                {l.language}
              </Label>
              <Select
                value={prefLang}
                onValueChange={(v) => setPrefLang(v as PreferredLanguage)}
              >
                <SelectTrigger data-ocid="hotel.register.language_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PreferredLanguage.en}>English</SelectItem>
                  <SelectItem value={PreferredLanguage.km}>ភាសាខ្មែរ</SelectItem>
                  <SelectItem value={PreferredLanguage.fr}>Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && (
              <p
                className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2"
                data-ocid="hotel.register.error_state"
              >
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !businessName || !phone}
              data-ocid="hotel.register.submit_button"
            >
              {loading ? "..." : l.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
