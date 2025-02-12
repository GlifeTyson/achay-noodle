"use client";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-darkFlour p-4 text-playfair">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-32">
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <p className="text-sm">
              Tại Mì A Chảy, chúng tôi đam mê phục vụ món mì thơm ngon, đích
              thực trong một không gian ấm cúng và thân thiện. Hãy đến và trải
              nghiệm sự khác biệt từ nguyên liệu chất lượng và công thức lâu
              đời.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <p className="text-sm">123 Bakery Street</p>
            <p className="text-sm">Ho Chi Minh City, Vietnam</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: info@bakery.com</p>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Theo dõi tại</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-primary transition-colors"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-primary transition-colors"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Bản đồ</h3>
            <iframe
              className="w-full h-fit"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6777.387865833141!2d106.6667118!3d10.7765578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edb11c814f9%3A0x752fa8b1239bebe3!2zUXXDoW4gTcOsIEEgQ2jhuqN5!5e1!3m2!1svi!2s!4v1739354779415!5m2!1svi!2s"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-flour/30 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Tyson Quach. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
