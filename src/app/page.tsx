"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import img from "../../public/Black_Full_Name-removebg-preview-cropped.svg"
import Image from "next/image";

interface Section {
  id: string;
  label: string;
  emoji: string;
}

const SECTIONS: Section[] = [
  { id: "home", label: "Home", emoji: "🏠" },
  { id: "features", label: "Services", emoji: "✨" },
  // { id: "pricing", label: "Pricing", emoji: "💸" },
  { id: "faq", label: "FAQ", emoji: "❓" },
  { id: "contact", label: "Contact", emoji: "📬" },
];

function isSandboxed(): boolean {
  if (typeof window === "undefined") return false;
  const href = window.location?.href || "";
  return href.startsWith("about:srcdoc");
}

function safeUpdateHash(id: string) {
  try {
    if (typeof window === "undefined") return;
    if (isSandboxed()) return;
    if (typeof history?.replaceState === "function") {
      const url = new URL(window.location.href);
      url.hash = id;
      history.replaceState(null, "", url.toString());
    } else {
      window.location.hash = id;
    }
  } catch (_) {}
}

function useScrollSpy(ids: string[], options: IntersectionObserverInit = {}): string {
  const [activeId, setActiveId] = useState<string>(ids[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      const onScroll = () => {
        let current = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.35) current = id;
        }
        setActiveId(current);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
        ...options,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids.join("|")]);

  return activeId;
}

interface NavLinkProps {
  id: string;
  label: string;
  emoji: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ id, label, emoji, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={[
        "relative px-3 py-2 rounded-xl transition-colors",
        isActive ? "text-white" : "text-slate-400 hover:text-slate-100",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="mr-1" aria-hidden>
        {emoji}
      </span>
      {label}
      {isActive && (
        <motion.span
          layoutId="activePill"
          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-md"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
    </button>
  );
};

export default function SmoothScrollNavbarDemo() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeId = useScrollSpy(sectionIds);
  const navRef = useRef<HTMLElement | null>(null);

  const handleNavClick = (id: string) => {
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    safeUpdateHash(id);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
        <nav
          ref={navRef}
          className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3"
          aria-label="Primary"
        >
          <div className="font-semibold tracking-tight">
            <Image src={img} height={30} alt="logo"></Image>
          </div>
          <div className="flex items-center gap-1">
            {SECTIONS.map((s) => (
              <NavLink
                key={s.id}
                id={s.id}
                label={s.label}
                emoji={s.emoji}
                isActive={activeId === s.id}
                onClick={handleNavClick}
              />
            ))}
          </div>
        </nav>
      </header>

      <section id="home" className="scroll-mt-24">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:py-28">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Smooth Scroll Navbar
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Klik item navbar untuk <em>smooth scroll</em>. Link aktif akan di-highlight otomatis saat menggulir.
          </p>
          <div className="mt-8 grid gap-4 sm:flex">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("features");
              }}
              className="rounded-2xl px-5 py-3 bg-indigo-500 hover:bg-indigo-600 transition shadow"
            >
              Lihat Features
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("pricing");
              }}
              className="rounded-2xl px-5 py-3 bg-white/10 hover:bg-white/15 transition"
            >
              Cek Pricing
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <h2 className="text-3xl sm:text-4xl font-semibold">Features</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {["Smooth scroll", "Active highlight", "Hash sync (safe)", "A11y friendly", "Framer Motion", "Tailwind only"].map((f) => (
              <li key={f} className="rounded-2xl border border-white/10 p-5">
                <div className="text-lg font-medium">{f}</div>
                <p className="mt-2 text-sm text-slate-300">
                  Deskripsi singkat fitur {f}.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <h2 className="text-3xl sm:text-4xl font-semibold">Pricing</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {["Starter", "Pro", "Enterprise"].map((tier, i) => (
              <div key={tier} className="rounded-2xl border border-white/10 p-6">
                <div className="text-xl font-semibold">{tier}</div>
                <div className="mt-2 text-3xl font-bold">${(i + 1) * 9}</div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>Feature A</li>
                  <li>Feature B</li>
                  <li>Feature C</li>
                </ul>
                <button className="mt-6 w-full rounded-xl bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-600">
                  Choose {tier}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <h2 className="text-3xl sm:text-4xl font-semibold">FAQ</h2>
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((n) => (
              <details key={n} className="group rounded-2xl border border-white/10 p-5">
                <summary className="cursor-pointer list-none font-medium marker:content-none">
                  Apa itu pertanyaan #{n}?
                </summary>
                <p className="mt-2 text-slate-300">
                  Jawaban singkat untuk pertanyaan #{n}. Tambahkan detail sesuai kebutuhan.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <h2 className="text-3xl sm:text-4xl font-semibold">Contact</h2>
          <form className="mt-6 grid gap-4 sm:max-w-md">
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none focus:border-indigo-400" placeholder="Nama" />
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none focus:border-indigo-400" placeholder="Email" />
            <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none focus:border-indigo-400" rows={4} placeholder="Pesan" />
            <button className="rounded-xl bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-600 w-fit">Kirim</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </footer>
    </div>
  );
}
