// ChampionOnboardingPage — implemented in Phase 3
import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/lib/i18n";
import { PreferredLanguage, UserRole } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  Camera,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type ReferralStatus = "idle" | "checking" | "valid" | "invalid";

interface FormState {
  fullNameEn: string;
  fullNameKm: string;
  fullNameFr: string;
  phoneNumber: string;
  bioEn: string;
  bioKm: string;
  bioFr: string;
  referralCode: string;
  preferredLanguage: PreferredLanguage;
}

function SectionHeader({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold font-display flex-shrink-0">
        {step}
      </div>
      <h2 className="text-lg font-display font-semibold text-foreground">
        {title}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p
          className="text-xs text-destructive"
          data-ocid="onboarding.field_error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function ChampionOnboardingPage() {
  const { t } = useTranslations();
  const { lang } = useLanguage();
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    fullNameEn: "",
    fullNameKm: "",
    fullNameFr: "",
    phoneNumber: "",
    bioEn: "",
    bioKm: "",
    bioFr: "",
    referralCode: "",
    preferredLanguage: lang as PreferredLanguage,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [referralStatus, setReferralStatus] = useState<ReferralStatus>("idle");
  const [referralChampionName, setReferralChampionName] = useState("");
  const [referralError, setReferralError] = useState("");

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const handlePhotoChange = useCallback((file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select an image file (JPG, PNG, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Photo must be smaller than 5MB");
      return;
    }
    setPhotoError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPhotoPreview(dataUrl);
      setPhotoDataUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      handlePhotoChange(file);
    },
    [handlePhotoChange],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const validateReferralCode = useCallback(
    async (code: string) => {
      if (!code.trim()) {
        setReferralStatus("idle");
        setReferralChampionName("");
        setReferralError("");
        return;
      }
      if (!actor || isFetching) return;
      setReferralStatus("checking");
      setReferralError("");
      try {
        const result = await actor.validateReferralCode(code.trim());
        if (result) {
          setReferralStatus("valid");
          const user = await actor.getUserById(result.championId);
          if (user) setReferralChampionName(user.fullNameEn);
          setReferralError("");
        } else {
          setReferralStatus("invalid");
          setReferralChampionName("");
          setReferralError(
            "This referral code was not found. Please check and try again.",
          );
        }
      } catch {
        setReferralStatus("invalid");
        setReferralError("Unable to validate code. Please try again.");
      }
    },
    [actor, isFetching],
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullNameEn.trim())
      newErrors.fullNameEn = "Full name in English is required.";
    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^[+]?[\d\s\-()]{7,20}$/.test(form.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number.";
    }
    if (!photoDataUrl) {
      setPhotoError("A photo is required to become a champion.");
    }
    if (referralStatus === "checking") {
      newErrors.referralCode =
        "Please wait for referral code validation to complete.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !!photoDataUrl;
  }, [form, photoDataUrl, referralStatus]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      if (!actor) {
        setSubmitError("Not connected to backend. Please try again.");
        return;
      }
      setIsSubmitting(true);
      setSubmitError("");
      try {
        const res = await actor.registerUser({
          fullNameEn: form.fullNameEn.trim(),
          fullNameKm: form.fullNameKm.trim() || undefined,
          fullNameFr: form.fullNameFr.trim() || undefined,
          phoneNumber: form.phoneNumber.trim(),
          avatarUrl: photoDataUrl ?? undefined,
          bioEn: form.bioEn.trim() || undefined,
          bioKm: form.bioKm.trim() || undefined,
          bioFr: form.bioFr.trim() || undefined,
          referredByCode:
            referralStatus === "valid" && form.referralCode.trim()
              ? form.referralCode.trim()
              : undefined,
          preferredLanguage: form.preferredLanguage,
          role: UserRole.champion,
        });
        if (res.__kind__ === "err") throw new Error(res.err);
        setSubmitted(true);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        if (message.toLowerCase().includes("phone")) {
          setErrors((prev) => ({
            ...prev,
            phoneNumber: "This phone number is already registered.",
          }));
        } else {
          setSubmitError(message || "Something went wrong. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, photoDataUrl, referralStatus, actor, validate],
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-md w-full"
          data-ocid="onboarding.success_state"
        >
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg text-center">
            {photoPreview && (
              <div className="mb-6">
                <img
                  src={photoPreview}
                  alt="Your champion portrait"
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/30 shadow"
                  loading="lazy"
                />
              </div>
            )}
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-9 h-9 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {t("champion_pending")}
            </h2>
            <p className="text-muted-foreground mb-3">
              A staff member will contact you with your QR code and referral
              code.
            </p>
            <p className="text-muted-foreground text-sm">
              Thank you for joining the Kampot Heritage family!
            </p>
            <div className="mt-6 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Questions? Visit our community or speak with any staff member.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Fixed close button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Back to home"
        data-ocid="onboarding.close_button"
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      {/* Hero band */}
      <div className="bg-card border-b border-border py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              <ChevronRight className="w-3 h-3" />
              {t("social_mission")}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t("champion_onboarding_title")}
            </h1>
            <p className="text-muted-foreground text-base max-w-lg mx-auto">
              Join our community of champions selling Kampot Heritage artisanal
              soap
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} noValidate data-ocid="onboarding.form">
          {/* Section 1: Your Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 mb-6 shadow-sm"
          >
            <SectionHeader step={1} title="Your Identity" />
            <div className="grid grid-cols-1 gap-4">
              <Field
                label="Your full name (English)"
                required
                error={errors.fullNameEn}
              >
                <Input
                  value={form.fullNameEn}
                  onChange={(e) => setField("fullNameEn", e.target.value)}
                  placeholder="e.g. Sophea Chan"
                  className="bg-background"
                  data-ocid="onboarding.full_name_en_input"
                />
              </Field>
              <Field label="ឈ្មោះ​ពេញ (ខ្មែរ) — optional">
                <Input
                  value={form.fullNameKm}
                  onChange={(e) => setField("fullNameKm", e.target.value)}
                  placeholder="ឧ. ចាន់ សូភា"
                  className="bg-background"
                  data-ocid="onboarding.full_name_km_input"
                />
              </Field>
              <Field
                label={t("champion_phone")}
                required
                error={errors.phoneNumber}
              >
                <Input
                  value={form.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                  placeholder="+855 12 345 678"
                  type="tel"
                  className="bg-background"
                  data-ocid="onboarding.phone_input"
                />
              </Field>
              <Field label="Preferred language">
                <Select
                  value={form.preferredLanguage}
                  onValueChange={(v) =>
                    setField("preferredLanguage", v as PreferredLanguage)
                  }
                >
                  <SelectTrigger
                    className="bg-background"
                    data-ocid="onboarding.preferred_language_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PreferredLanguage.en}>
                      English
                    </SelectItem>
                    <SelectItem value={PreferredLanguage.km}>
                      ភាសាខ្មែរ
                    </SelectItem>
                    <SelectItem value={PreferredLanguage.fr}>
                      Français
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </motion.div>

          {/* Section 2: Your Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6 mb-6 shadow-sm"
          >
            <SectionHeader step={2} title={t("champion_upload_photo")} />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handlePhotoChange(e.target.files?.[0])}
              data-ocid="onboarding.photo_file_input"
            />
            {photoPreview ? (
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-28 h-28 rounded-xl object-cover border-2 border-primary/20 shadow"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoPreview(null);
                      setPhotoDataUrl(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow hover:opacity-80 transition-opacity"
                    aria-label="Remove photo"
                    data-ocid="onboarding.photo_remove_button"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex flex-col gap-2 min-w-0">
                  <p className="text-sm text-foreground font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Photo selected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Looking great! Your photo will be shown to hotels and the
                    community.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="self-start"
                    data-ocid="onboarding.photo_change_button"
                  >
                    Change photo
                  </Button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="w-full border-2 border-dashed border-primary/30 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 text-center"
                data-ocid="onboarding.photo_dropzone"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    Upload your photo
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Drag & drop or click to browse · JPG, PNG up to 5MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="pointer-events-none"
                  data-ocid="onboarding.photo_upload_button"
                >
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  Choose photo
                </Button>
              </button>
            )}
            {photoError && (
              <p
                className="text-xs text-destructive mt-2"
                data-ocid="onboarding.photo_error_state"
              >
                {photoError}
              </p>
            )}
          </motion.div>

          {/* Section 3: Your Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-6 mb-6 shadow-sm"
          >
            <SectionHeader step={3} title={t("champion_tell_story")} />
            <p className="text-sm text-muted-foreground mb-4 -mt-2">
              Sharing your story helps hotels and customers connect with you.
              Optional but highly encouraged.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {lang === "km" ? (
                <Field label="រឿងរ៉ាវ (ខ្មែរ) — optional">
                  <Textarea
                    value={form.bioKm}
                    onChange={(e) => setField("bioKm", e.target.value)}
                    placeholder="រៀបរាប់ពីដំណើររបស់អ្នក..."
                    rows={4}
                    className="bg-background resize-none"
                    data-ocid="onboarding.bio_km_textarea"
                  />
                </Field>
              ) : lang === "fr" ? (
                <Field label="Votre histoire (Français) — optional">
                  <Textarea
                    value={form.bioFr}
                    onChange={(e) => setField("bioFr", e.target.value)}
                    placeholder="Partagez votre parcours..."
                    rows={4}
                    className="bg-background resize-none"
                    data-ocid="onboarding.bio_fr_textarea"
                  />
                </Field>
              ) : (
                <Field
                  label={`${t("champion_tell_story")} (English, optional but encouraged)`}
                >
                  <Textarea
                    value={form.bioEn}
                    onChange={(e) => setField("bioEn", e.target.value)}
                    placeholder="Share your journey — how did you come to join Kampot Heritage? What does this opportunity mean to you?"
                    rows={4}
                    className="bg-background resize-none"
                    data-ocid="onboarding.bio_en_textarea"
                  />
                </Field>
              )}
            </div>
          </motion.div>

          {/* Section 4: Your Referral */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-card rounded-2xl border border-border p-6 mb-8 shadow-sm"
          >
            <SectionHeader step={4} title="Your Referral" />
            <Field
              label="Did another champion refer you? Enter their code here (optional)"
              error={referralError || errors.referralCode}
            >
              <div className="relative">
                <Input
                  value={form.referralCode}
                  onChange={(e) => {
                    setField("referralCode", e.target.value);
                    setReferralStatus("idle");
                    setReferralChampionName("");
                    setReferralError("");
                  }}
                  onBlur={() => validateReferralCode(form.referralCode)}
                  placeholder="e.g. CHAMP-SOTHEA-042"
                  className="bg-background pr-10 font-mono text-sm tracking-wide"
                  data-ocid="onboarding.referral_code_input"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {referralStatus === "checking" && (
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                  {referralStatus === "valid" && (
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  )}
                  {referralStatus === "invalid" && (
                    <X className="w-4 h-4 text-destructive" />
                  )}
                </div>
              </div>
              {referralStatus === "valid" && referralChampionName && (
                <p className="text-xs text-accent font-medium flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Referred by {referralChampionName}
                </p>
              )}
            </Field>
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {submitError && (
              <div
                className="bg-destructive/10 border border-destructive/30 text-destructive rounded-xl p-4 mb-4 text-sm"
                data-ocid="onboarding.error_state"
              >
                {submitError}
              </div>
            )}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-5 text-center">
              <p className="text-sm text-foreground font-medium">
                {t("mission_statement")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("income_goal")}
              </p>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || isFetching}
              className="w-full h-12 text-base font-semibold font-display"
              data-ocid="onboarding.submit_button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting…
                </>
              ) : (
                t("champion_submit")
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              By submitting, you agree to be contacted by Kampot Heritage staff
              for verification.
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
