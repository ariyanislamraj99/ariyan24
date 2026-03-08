import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileAvatar from "@/assets/vcard-photo.jpg";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const contactInfo = [
  { icon: Mail, label: "ariyanislamraj@gmail.com" },
  { icon: Phone, label: "+880 1810-912990" },
  { icon: MapPin, label: "Bangladesh" },
];

const ProfileSidebar = () => {
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Ariyan Islam Raj
TEL:+8801810912990
EMAIL:ariyanislamraj@gmail.com
ADR:;;Bangladesh
TITLE:Full-Stack Developer
END:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ariyan-islam-raj.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <aside className="hidden lg:flex lg:w-[320px] lg:min-h-screen lg:fixed lg:left-0 lg:top-0 lg:bottom-0 z-40 glass-strong lg:border-r lg:border-glass-border/10 overflow-y-auto scrollbar-thin">
      <div className="flex flex-col items-center p-8 py-10 w-full">
        {/* Avatar */}
        <div className="relative mb-5">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden gradient-border p-[3px]">
            <img
              src={profileAvatar}
              alt="Ariyan Islam Raj"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-background shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        </div>

        {/* Name & Title */}
        <h1 className="text-xl lg:text-2xl font-display font-bold text-foreground text-center mb-1">
          Ariyan Islam <span className="gradient-text">Raj</span>
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-5">
          Full-Stack Developer
        </p>

        {/* Role badge */}
        <div className="glass rounded-full px-4 py-1.5 mb-6">
          <span className="text-xs font-medium gradient-text">Available for Hire</span>
        </div>

        {/* Contact Info */}
        <div className="w-full space-y-3 mb-6">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass-subtle transition-all duration-300 hover:bg-glass/60"
            >
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                <item.icon size={14} className="text-primary-foreground" />
              </div>
              <span className="text-xs text-foreground truncate">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex gap-3 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-glass-glow transition-all duration-300"
              aria-label={link.label}
            >
              <link.icon size={16} />
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button variant="gradient" size="sm" className="w-full" asChild>
            <a href="#contact">
              <Mail size={14} className="mr-2" />
              Hire Me
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleDownloadVCard}
          >
            <Download size={14} className="mr-2" />
            Download vCard
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
