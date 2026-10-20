import reviews from "../../reviews.json";

export const siteConfig = {
  name: "Fluent in German",
  teacher: "Memoona Abbas",
  contactEmail: "fluentingermana1@gmail.com",
  contactPhone: "+92 333 2431961",
  whatsappUrl: "https://wa.me/923332431961",
  portrait: "/fluent-in-german-CEO.jpeg",
  alternatePortrait: "/WhatsApp%20Image%202026-10-20%20at%2015.48.55.jpeg",
  logo: "/fluent-in-german-logo.PNG",
  courses: [
    { level: "A1", key: "a1" },
    { level: "A2", key: "a2" },
    { level: "B1", key: "b1" },
    { level: "B2", key: "b2" },
  ],
  formats: ["group", "individual"],
  schedule: [],
  testimonials: reviews.map(({ name, review }) => ({ name, quote: review, rating: 5 })),
  socialLinks: [
    { name: "Instagram", url: "https://www.instagram.com/fluentingerman_ig" },
    { name: "TikTok", url: "https://www.tiktok.com/@fluentingerman" },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61564011543207" },
    { name: "WhatsApp", url: "https://wa.me/923332431961" },
  ],
};
