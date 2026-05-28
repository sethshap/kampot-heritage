// Expandable floating "💬 Contact Us" FAB
// Single button, fixed bottom-right — expands upward with 4 actions

import { useEffect, useRef, useState } from "react";

const MENU_ITEMS = [
  {
    id: "whatsapp",
    emoji: "💬",
    label: "WhatsApp",
    href: "https://wa.me/85569859870",
  },
  {
    id: "telegram",
    emoji: "✈️",
    label: "Telegram",
    href: "https://t.me/sethsha",
  },
  {
    id: "message",
    emoji: "📩",
    label: "Message Us",
    action: "message" as const,
  },
] as const;

export function FloatingContactButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  function handleItem(item: (typeof MENU_ITEMS)[number]) {
    setIsOpen(false);
    if ("href" in item) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else if (item.action === "message") {
      setMsgOpen(true);
      setSent(false);
    }
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setName("");
    setContact("");
    setMessage("");
  }

  return (
    <>
      <div
        ref={wrapperRef}
        className="fixed bottom-6 right-4 flex flex-col items-end gap-2"
        style={{ zIndex: 9999 }}
      >
        {/* Expanded menu items — appear above main button */}
        {isOpen && (
          <div
            className="flex flex-col items-end gap-2 mb-1"
            role="menu"
            aria-label="Contact options"
          >
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                onClick={() => handleItem(item)}
                data-ocid={`floating.${item.id}_button`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-lg text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-150 whitespace-nowrap"
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          data-ocid="floating.contact_us_button"
          aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-xl font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="text-base leading-none">{isOpen ? "✕" : "💬"}</span>
          <span>Contact Us</span>
        </button>
      </div>

      {/* Message Us modal */}
      {msgOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-end sm:items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMsgOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMsgOpen(false);
          }}
          aria-label="Contact form"
          data-ocid="contact.dialog"
          tabIndex={-1}
        >
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-foreground">
                📩 Message Us
              </h2>
              <button
                type="button"
                onClick={() => setMsgOpen(false)}
                aria-label="Close"
                data-ocid="contact.close_button"
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
              >
                ✕
              </button>
            </div>

            {sent ? (
              <div
                className="text-center py-6 flex flex-col items-center gap-3"
                data-ocid="contact.success_state"
              >
                <span className="text-4xl">✅</span>
                <p className="font-semibold text-foreground">Message sent!</p>
                <p className="text-sm text-muted-foreground">
                  We'll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setMsgOpen(false)}
                  className="mt-2 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-150"
                  data-ocid="contact.close_button"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sophea Chan"
                    data-ocid="contact.name_input"
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="contact-contact"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    Phone or Email
                  </label>
                  <input
                    id="contact-contact"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+855 12 345 678"
                    data-ocid="contact.phone_input"
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={3}
                    data-ocid="contact.message_input"
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setMsgOpen(false)}
                    data-ocid="contact.cancel_button"
                    className="flex-1 px-4 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-ocid="contact.submit_button"
                    className="flex-1 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-150"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
