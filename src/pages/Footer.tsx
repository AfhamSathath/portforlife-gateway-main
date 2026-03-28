import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#home" className="text-xl font-serif font-bold text-gradient">
          PortForLife
        </a>

        <p className="text-sm text-muted-foreground flex items-center gap-1">
          © 2026 PortForLife. Made with AfhamSathath All rights reserved.
        </p>

        <div className="flex gap-4">
          {[
            { icon: Github, href: "https://github.com/AfhamSathath" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/afhamsathath/" },
            { icon: Twitter, href: "https://twitter.com/afhamsathath" }
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
