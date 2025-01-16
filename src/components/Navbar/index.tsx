import React from "react";
const items = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "about",
    label: "About Us",
  },
  {
    id: "menu",
    label: "Menu",
  },
  {
    id: "contact",
    label: "Contact",
  },
];
const Navbar = () => {
  return (
    <div className="flex gap-4">
      {items.map((item) => (
        <p key={item.id}> {item.label}</p>
      ))}
    </div>
  );
};

export default Navbar;
