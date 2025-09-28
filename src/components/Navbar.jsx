import { cn } from "../lib/utils";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { toast } from "react-toastify";
import { FiClock } from "react-icons/fi";

import React, { useRef, useState, useEffect } from "react";

const MainNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobileNavRef = useRef(null);

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Leaderboard",
      link: "/leaderboard",
    },
    {
      name: "Tasks",
      link: "/tasks",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (link) => {
<<<<<<< HEAD

    
    if (link === "/tasks") {
      handleTasksComingSoon();
      return;
    }
=======
>>>>>>> 4184ba750b67e1a862295d84c4989f67da40e3a3
    navigate(link);
    setIsMobileMenuOpen(false);
  };

  const handleTasksClick = () => {
    navigate('/tasks');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full">
      <style jsx global>{`
        .custom-toast .Toastify__progress-bar {
          background: white !important;
        }
      `}</style>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo onClick={() => navigate("/")} />
          <NavItems
            items={navItems}
            onItemClick={(link) => navigate(link)}
            currentPath={location.pathname}
          />
          <div className="flex items-center gap-4">
            {/* <NavbarButton variant="secondary">Login</NavbarButton> */}
            <NavbarButton variant="primary" onClick={handleTasksClick}>
              View Tasks
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav ref={mobileNavRef}>
          <MobileNavHeader>
            <NavbarLogo onClick={() => navigate("/")} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <button
                key={`mobile-link-${idx}`}
                onClick={() => handleNavigation(item.link)}
                className="relative text-[#1C1538] text-left w-full"
              >
                <span className="block">{item.name}</span>
              </button>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={handleTasksClick}
                variant="primary"
                className="w-full mt-3"
              >
                View Tasks
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // Using fixed positioning to ensure the navbar sticks to the top
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  );
};

const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(113, 82, 222, 0.1), 0 1px 1px rgba(113, 82, 222, 0.05), 0 0 0 1px rgba(113, 82, 222, 0.08), 0 0 4px rgba(113, 82, 222, 0.1), 0 16px 68px rgba(113, 82, 222, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-2xl bg-transparent px-4 py-2 lg:flex mt-1",
        visible && "!bg-white/90",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const NavItems = ({ items, className, onItemClick, currentPath }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-[#1C1538] transition duration-200 hover:text-[#7152DE] lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <button
          onMouseEnter={() => setHovered(idx)}
          onClick={() => onItemClick(item.link)}
          className={`relative px-4 py-2 text-[#1C1538] hover:text-[#7152DE] transition-colors duration-200 cursor-pointer ${
            currentPath === item.link ? "text-[#7152DE]" : ""
          } ${(item.link === "/leaderboard" || item.link === "/tasks") ? "opacity-100" : ""}`}
          key={`link-${idx}`}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-[#7152DE]/10"
            />
          )}
          <span className="relative z-20 font-semibold">{item.name}</span>
        </button>
      ))}
    </motion.div>
  );
};

const MobileNav = React.forwardRef(({ children, className, visible }, ref) => {
  return (
    <motion.div
      ref={ref}
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(113, 82, 222, 0.1), 0 1px 1px rgba(113, 82, 222, 0.05), 0 0 0 1px rgba(113, 82, 222, 0.08), 0 0 4px rgba(113, 82, 222, 0.1), 0 16px 68px rgba(113, 82, 222, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "10px",
        paddingLeft: visible ? "12px" : "10px",
        borderRadius: visible ? "2rem" : "1rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
      }}
      className={cn(
        "mt-1 relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white/90 px-0 py-2 lg:hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
});

const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{
            type: "tween",
            duration: 0.15,
            ease: "easeOut",
          }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(113,82,222,0.1)]",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MobileNavToggle = ({ isOpen, onClick }) => {
  return isOpen ? (
    <HiX className="text-[#1C1538] w-6 h-6 cursor-pointer" onClick={onClick} />
  ) : (
    <HiMenuAlt3 className="text-[#1C1538] w-6 h-6 cursor-pointer" onClick={onClick} />
  );
};

const NavbarLogo = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative z-20 mr-4 flex items-center space-x-2 text-sm font-normal cursor-pointer"
    >
      <img
        src="/logos/mvp_title.webp"
        alt="MVP 6.0"
        className="h-8 w-auto"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(113, 82, 222, 0.1))"
        }}
      />
    </button>
  );
};

const NavbarButton = ({
  as: Tag = "button",
  children,
  className,
  variant = "primary",
  onClick,
  ...props
}) => {
  const baseStyles =
    "px-4 py-1.5 rounded-full font-semibold relative cursor-pointer hover:-translate-y-0.5 transition-all duration-300 inline-block text-center text-sm";

  const variantStyles = {
    primary:
      "bg-[#7152DE] text-white border-2 border-[#7152DE] hover:bg-[#4B3791] hover:border-[#4B3791] shadow-md",
    secondary:
      "bg-transparent border-2 border-[#7152DE] text-[#7152DE] hover:bg-[#7152DE] hover:text-white",
  };

  return (
    <Tag
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MainNavbar;

export {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
};
