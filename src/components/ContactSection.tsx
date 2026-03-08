import { useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const contactInfo = [
  { icon: Mail, label: "ariyanislamraj@gmail.com" },
  { icon: MapPin, label: "Bangladesh" },
  { icon: Phone, label: "+880 1810-912990" },
];

const ContactSection = () => {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="glow-orb w-[400px] h-[400px] bg-primary bottom-[5%] left-[10%] animate-float animate-glow-pulse" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something amazing.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            {contactInfo.map((item, i) => (
              <div
                key={item.label}
                className="glass rounded-xl p-5 flex items-center gap-4 gradient-border opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-primary-foreground" />
                </div>
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 glass rounded-2xl p-8 gradient-border opacity-0 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="space-y-5">
              {(["name", "email", "message"] as const).map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-foreground mb-2 capitalize">
                    {field}
                  </label>
                  {field === "message" ? (
                    <textarea
                      id={field}
                      rows={4}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full rounded-lg bg-muted/50 backdrop-blur-sm border border-glass-border/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Your message..."
                    />
                  ) : (
                    <input
                      id={field}
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full rounded-lg bg-muted/50 backdrop-blur-sm border border-glass-border/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder={field === "email" ? "you@example.com" : "Your name"}
                    />
                  )}
                  {errors[field] && (
                    <p className="text-xs text-destructive mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              <Button variant="gradient" size="lg" className="w-full" disabled={sending}>
                {sending ? "Sending..." : (
                  <>Send Message <Send size={16} /></>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
