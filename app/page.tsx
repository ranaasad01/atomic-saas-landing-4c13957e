"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Zap, Shield, BarChart, GitBranch, Bell, Check, ArrowRight, Star, ChevronDown, Activity, Clock, Users, FileText } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const features = [
  {
    icon: Zap,
    title: "Lightning-Fast Automation",
    description:
      "Build and deploy workflows in minutes, not days. Our visual builder lets you connect any app with zero code required.",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    icon: GitBranch,
    title: "Conditional Logic & Branching",
    description:
      "Create sophisticated multi-step workflows with if/else branches, loops, and dynamic data routing between your tools.",
    color: "from-indigo-400 to-violet-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 Type II certified. All data encrypted in transit and at rest. Role-based access controls for every team member.",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    icon: BarChart,
    title: "Real-Time Analytics",
    description:
      "Monitor every workflow run with detailed logs, success rates, and performance metrics on a live dashboard.",
    color: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Get alerted instantly when workflows fail or need attention. Route alerts to Slack, email, or any webhook.",
    color: "from-pink-400 to-rose-500",
    bg: "bg-pink-50",
  },
  {
    icon: Activity,
    title: "500+ Integrations",
    description:
      "Connect Salesforce, HubSpot, Stripe, Notion, Airtable, and hundreds more with pre-built, battle-tested connectors.",
    color: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: 0,
    period: "month",
    description: "Perfect for individuals and small side projects.",
    cta: "Start for Free",
    ctaHref: "#",
    highlight: false,
    features: [
      "5 active workflows",
      "1,000 tasks / month",
      "3 connected apps",
      "Community support",
      "Basic analytics",
      "1 team member",
    ],
    missing: ["Custom logic", "Priority support", "SSO / SAML", "SLA"],
  },
  {
    name: "Pro",
    price: 49,
    period: "month",
    description: "For growing teams that need power and flexibility.",
    cta: "Start 14-Day Trial",
    ctaHref: "#",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited workflows",
      "50,000 tasks / month",
      "Unlimited connected apps",
      "Priority email support",
      "Advanced analytics",
      "Up to 10 team members",
      "Conditional logic & branching",
      "Custom webhooks",
    ],
    missing: ["SSO / SAML", "SLA"],
  },
  {
    name: "Enterprise",
    price: 199,
    period: "month",
    description: "For large organizations with advanced security needs.",
    cta: "Contact Sales",
    ctaHref: "#",
    highlight: false,
    features: [
      "Unlimited workflows",
      "Unlimited tasks",
      "Unlimited connected apps",
      "Dedicated success manager",
      "Custom analytics & exports",
      "Unlimited team members",
      "Conditional logic & branching",
      "Custom webhooks",
      "SSO / SAML",
      "99.99% uptime SLA",
    ],
    missing: [],
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Operations",
    company: "Meridian Labs",
    avatar: "https://imageio.forbes.com/specials-images/imageserve/5c928fa04bbe6f52641ab341/0x0.jpg?format=jpg&crop=2124,2123,x980,y756,safe&height=416&width=416&fit=bounds",
    rating: 5,
    quote:
      "Flowmatic cut our manual data-entry time by 80%. We automated our entire lead-to-invoice pipeline in a single afternoon. I genuinely can't imagine going back.",
  },
  {
    name: "Marcus Rivera",
    role: "CTO",
    company: "Stackbloom",
    avatar: "http://tinabangel.com/wp-content/uploads/2015/04/MARCUS-RIVERA.png",
    rating: 5,
    quote:
      "We evaluated Zapier, Make, and n8n. Flowmatic won on every dimension — speed, reliability, and the best developer experience I've seen in this category.",
  },
  {
    name: "Priya Nair",
    role: "Marketing Director",
    company: "Velora Commerce",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    rating: 5,
    quote:
      "Our campaign workflows used to take a full day to set up. Now they're live in 20 minutes. The conditional branching feature alone is worth the subscription.",
  },
  {
    name: "James Okafor",
    role: "Founder",
    company: "Clearpath AI",
    avatar: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
    rating: 5,
    quote:
      "Flowmatic's reliability is exceptional. We've processed over 2 million tasks without a single missed run. The real-time logs make debugging a breeze.",
  },
  {
    name: "Lena Hoffmann",
    role: "Product Manager",
    company: "Nuance Studio",
    avatar: "https://media.licdn.com/dms/image/v2/C4E03AQFstv4njUYzMQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1662381393798?e=2147483647&v=beta&t=NBXIIew6hUTxw4E1dGoECYON7lcddIDaA0umwP9WfXU",
    rating: 5,
    quote:
      "The 500+ integrations meant we could connect our entire stack on day one. Setup was shockingly fast and the UI is genuinely beautiful to work in.",
  },
  {
    name: "Tom Whitfield",
    role: "RevOps Lead",
    company: "Orbit SaaS",
    avatar: "https://media.licdn.com/dms/image/v2/C4D03AQEBE0TXNQkMfQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1654295923553?e=2147483647&v=beta&t=OOFvOTukqygyKL8dPL9eWIbExk-bCaMBeh3phZ_QYkM",
    rating: 5,
    quote:
      "We replaced three separate tools with Flowmatic. Our ops team is happier, our error rate dropped to near zero, and we're saving $800/month on tooling.",
  },
];

const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "Not at all. Flowmatic's visual drag-and-drop builder is designed for non-technical users. If you can use a spreadsheet, you can build powerful automations.",
  },
  {
    q: "What happens if I exceed my task limit?",
    a: "We'll notify you when you reach 80% of your limit. You can upgrade at any time, or we'll pause new runs until your cycle resets — we never charge surprise overages.",
  },
  {
    q: "Can I migrate from Zapier or Make?",
    a: "Yes. We offer a free migration service for Pro and Enterprise customers. Our team will help you recreate your existing workflows in Flowmatic at no extra cost.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We're SOC 2 Type II certified, GDPR compliant, and all data is encrypted with AES-256 at rest and TLS 1.3 in transit. We never sell your data.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel anytime with no penalties. Your plan stays active until the end of the billing period, and you can export all your workflow data before leaving.",
  },
  {
    q: "Do you offer annual billing discounts?",
    a: "Yes — pay annually and save 20% on any paid plan. Annual plans also include priority onboarding and a dedicated Slack channel with our support team.",
  },
];

const stats = [
  { value: "12M+", label: "Tasks automated monthly", icon: Activity },
  { value: "98.7%", label: "Workflow success rate", icon: Check },
  { value: "500+", label: "App integrations", icon: GitBranch },
  { value: "4 min", label: "Average setup time", icon: Clock },
];

const logos = [
  "Stripe",
  "Notion",
  "Salesforce",
  "HubSpot",
  "Slack",
  "Airtable",
  "Shopify",
  "Intercom",
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeInUp}
      className="border border-slate-200 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900 text-base">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-slate-400"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-slate-600 leading-relaxed text-sm">{a}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [billingAnnual, setBillingAnnual] = useState(false);

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 bg-gradient-to-b from-slate-50 via-indigo-50/40 to-white">
        {/* Background blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-violet-200/30 blur-3xl" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.div variants={scaleIn} className="inline-flex mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5" />
              Now with AI-powered workflow suggestions
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-6"
          >
            {APP_TAGLINE.split(",")[0]},
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Effortlessly.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {APP_NAME} connects your apps, automates your busywork, and keeps
            your team focused on what actually matters — all without writing a
            single line of code.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-slate-700 font-semibold text-base border border-slate-200 shadow-sm hover:border-indigo-300 hover:text-indigo-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              See How It Works
            </motion.a>
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="mt-5 text-sm text-slate-500"
          >
            No credit card required · Free forever plan · Cancel anytime
          </motion.p>
        </motion.div>

        {/* Trusted logos */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="relative z-10 mt-20 w-full max-w-4xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-slate-400 font-bold text-lg tracking-tight opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-1">
                  <stat.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3"
            >
              Everything you need
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5"
            >
              Built for teams who move fast
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              From simple two-step automations to complex multi-branch
              pipelines, {APP_NAME} scales with your ambitions.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat) => (
              <motion.div
                key={feat.title}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center mb-5`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg bg-gradient-to-br ${feat.color} flex items-center justify-center`}
                  >
                    <feat.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3"
            >
              Simple by design
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5"
            >
              Up and running in minutes
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 max-w-xl mx-auto"
            >
              Three steps is all it takes to automate your first workflow.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connector line */}
            <div
              aria-hidden
              className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-indigo-200 via-violet-300 to-indigo-200"
            />

            {[
              {
                step: "01",
                icon: GitBranch,
                title: "Choose a trigger",
                desc: "Pick the event that kicks off your workflow — a new form submission, a Stripe payment, a Slack message, or anything else.",
              },
              {
                step: "02",
                icon: Zap,
                title: "Add your actions",
                desc: "Chain together actions across 500+ apps. Filter, transform, and route data exactly how your business needs it.",
              },
              {
                step: "03",
                icon: Activity,
                title: "Go live instantly",
                desc: "Hit publish and your workflow runs automatically. Monitor every execution in real time from your dashboard.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-indigo-200 text-indigo-600 text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3"
            >
              Loved by thousands
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5"
            >
              Real teams, real results
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 max-w-xl mx-auto"
            >
              Join over 14,000 teams who've automated millions of tasks with{" "}
              {APP_NAME}.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
              >
                <StarRating count={t.rating} />
                <p className="text-slate-700 text-sm leading-relaxed flex-1">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-indigo-100"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3"
            >
              Transparent pricing
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5"
            >
              Plans that grow with you
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 max-w-xl mx-auto mb-8"
            >
              Start free, upgrade when you're ready. No hidden fees, no
              surprise charges.
            </motion.p>

            {/* Billing toggle */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-3 bg-slate-100 rounded-full p-1"
            >
              <button
                onClick={() => setBillingAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  !billingAnnual
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  billingAnnual
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Annual
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          >
            {pricingTiers.map((tier) => {
              const displayPrice =
                tier.price === 0
                  ? 0
                  : billingAnnual
                  ? Math.round(tier.price * 0.8)
                  : tier.price;

              return (
                <motion.div
                  key={tier.name}
                  variants={scaleIn}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`relative rounded-3xl p-8 flex flex-col border transition-shadow duration-300 ${
                    tier.highlight
                      ? "bg-gradient-to-b from-indigo-600 to-violet-700 border-transparent shadow-2xl shadow-indigo-300 text-white"
                      : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-bold shadow-sm whitespace-nowrap">
                      {tier.badge}
                    </span>
                  )}

                  <div className="mb-6">
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        tier.highlight ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        tier.highlight ? "text-indigo-200" : "text-slate-500"
                      }`}
                    >
                      {tier.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-5xl font-extrabold tracking-tight ${
                          tier.highlight ? "text-white" : "text-slate-900"
                        }`}
                      >
                        ${displayPrice}
                      </span>
                      <span
                        className={`text-sm mb-2 ${
                          tier.highlight ? "text-indigo-200" : "text-slate-500"
                        }`}
                      >
                        / {tier.period}
                      </span>
                    </div>
                    {billingAnnual && tier.price > 0 && (
                      <p
                        className={`text-xs mt-1 ${
                          tier.highlight ? "text-indigo-200" : "text-slate-400"
                        }`}
                      >
                        Billed annually (${tier.price * 12 * 0.8}/yr)
                      </p>
                    )}
                  </div>

                  <motion.a
                    href={tier.ctaHref}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`block text-center py-3 px-6 rounded-full font-semibold text-sm mb-8 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      tier.highlight
                        ? "bg-white text-indigo-700 hover:bg-indigo-50 focus-visible:ring-white"
                        : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-100 focus-visible:ring-indigo-500"
                    }`}
                  >
                    {tier.cta}
                  </motion.a>

                  <ul className="space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            tier.highlight
                              ? "text-indigo-200"
                              : "text-indigo-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            tier.highlight ? "text-indigo-100" : "text-slate-700"
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                    {tier.missing.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 opacity-40"
                      >
                        <span
                          className={`w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center text-lg leading-none ${
                            tier.highlight ? "text-indigo-300" : "text-slate-400"
                          }`}
                        >
                          –
                        </span>
                        <span
                          className={`text-sm line-through ${
                            tier.highlight ? "text-indigo-200" : "text-slate-400"
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-sm text-slate-500 mt-8"
          >
            All plans include a 14-day free trial. No credit card required to
            start.
          </motion.p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3"
            >
              Got questions?
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5"
            >
              Frequently asked
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600"
            >
              Everything you need to know before you get started.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-3"
          >
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 sm:p-16 text-center shadow-2xl shadow-indigo-200"
          >
            {/* Decorative blobs */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
            </div>

            <motion.div variants={fadeInUp} className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Start automating today
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
                Your team deserves better
                <br />
                than copy-paste.
              </h2>
              <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-10">
                Join 14,000+ teams who've reclaimed hours every week with{" "}
                {APP_NAME}. Set up your first automation in under 4 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-indigo-700 font-semibold text-base shadow-lg hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold text-base border border-white/30 hover:bg-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Talk to Sales
                </motion.a>
              </div>
              <p className="mt-5 text-indigo-300 text-sm">
                No credit card · Free forever plan · 14-day Pro trial
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}