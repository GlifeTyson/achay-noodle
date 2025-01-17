import { Facebook, Instagram } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-darkFlour p-4 text-playfair">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-32">
          <div>
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <p className="text-sm">
              Tại Mì A Chảy, chúng tôi đam mê phục vụ món mì thơm ngon, đích
              thực trong một không gian ấm cúng và thân thiện. Hãy đến và trải
              nghiệm sự khác biệt từ nguyên liệu chất lượng và công thức lâu
              đời.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <p className="text-sm">123 Bakery Street</p>
            <p className="text-sm">Ho Chi Minh City, Vietnam</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: info@bakery.com</p>
          </div>
          <div>
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
