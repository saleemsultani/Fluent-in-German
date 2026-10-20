import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Clock3,
  Globe2,
  GraduationCap,
  Menu,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { siteConfig } from "./data/siteConfig";
import { translations } from "./data/translations";
import "./styles.css";

function useCopy(language) {
  return translations[language];
}

function SectionHeading({ eyebrow, title, intro, light = false }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [activeReview, setActiveReview] = useState(0);
  const [reviewExpanded, setReviewExpanded] = useState(false);
  const [formStatusKey, setFormStatusKey] = useState("");
  const copy = useCopy(language);
  const isRtl = copy.direction === "rtl";
  const DirectionIcon = isRtl ? ArrowLeft : ArrowRight;
  const PreviousIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;
  const currentReview = siteConfig.testimonials[activeReview];
  const reviewExcerptLength = 180;
  const excerptEnd = currentReview
    ? currentReview.quote.lastIndexOf(" ", reviewExcerptLength)
    : reviewExcerptLength;
  const reviewExcerpt = currentReview
    ? currentReview.quote.slice(
        0,
        excerptEnd > reviewExcerptLength * 0.7 ? excerptEnd : reviewExcerptLength,
      ).trimEnd()
    : "";

  useEffect(() => {
    document.documentElement.lang = copy.locale;
    document.documentElement.dir = copy.direction;
    document.title = copy.metaTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy.metaDescription);
  }, [copy]);

  function toggleLevel(level) {
    setSelectedLevels((current) =>
      current.includes(level)
        ? current.filter((item) => item !== level)
        : [...current, level],
    );
  }

  function changeReview(direction) {
    setActiveReview((index) =>
      (index + direction + siteConfig.testimonials.length) % siteConfig.testimonials.length,
    );
    setReviewExpanded(false);
  }

  function submitEnquiry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || selectedLevels.length === 0) {
      setFormStatusKey("formRequired");
      return;
    }
    if (!siteConfig.contactEmail) {
      setFormStatusKey("formNotConfigured");
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(`German course enquiry — ${data.get("name")}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone") || "Not provided"}`,
        `Levels: ${selectedLevels.join(", ")}`,
        `Message: ${data.get("message") || "Not provided"}`,
      ].join("\n"),
    );
    try {
      window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
      setFormStatusKey("formSuccess");
    } catch {
      setFormStatusKey("formSendError");
    }
  }

  const navItems = [
    ["home", copy.nav.home, "#home"],
    ["about", copy.nav.about, "#about"],
    ["courses", copy.nav.courses, "#courses"],
    ["schedule", copy.nav.schedule, "#schedule"],
  ];

  return (
    <>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#home" aria-label={siteConfig.name}>
            <img src={siteConfig.logo} alt="" />
            <span>Fluent <i>in</i> German</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={`main-nav ${menuOpen ? "main-nav-open" : ""}`} aria-label={copy.mainNavLabel}>
            {navItems.map(([id, label, href]) => (
              <a key={id} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <div className="language-switch" role="group" aria-label={copy.languageLabel}>
              {["en", "de", "ur"].map((code) => (
                <button
                  className={language === code ? "language-active" : ""}
                  key={code}
                  type="button"
                  aria-pressed={language === code}
                  onClick={() => { setLanguage(code); setMenuOpen(false); }}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
              {copy.contactButton}<ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <span className="eyebrow eyebrow-gold"><span />{copy.heroEyebrow}</span>
              <h1>{copy.heroTitle}</h1>
              <p className="hero-lead">{copy.heroLead}</p>
              <div className="hero-actions">
                <a className="button button-gold" href="#courses">{copy.explore}<DirectionIcon size={17} /></a>
                <a className="button button-outline" href="#contact">{copy.contactUs}<DirectionIcon size={17} /></a>
              </div>
              <div className="hero-trust">
                {copy.trust.map((item) => <span key={item}><Check size={15} />{item}</span>)}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-wrap">
                <img
                  className="hero-image"
                  src={siteConfig.alternatePortrait}
                  alt={`${copy.teacherName}, ${copy.teacherCredential}`}
                  fetchpriority="high"
                />
                <span className="image-caption"><span className="caption-dot" />{copy.teacherTag}</span>
              </div>
              <div className="hero-name-card">
                <span className="hero-name-script">Hallo,</span>
                <strong>{copy.teacherName}</strong>
                <span>{copy.teacherCredential}</span>
              </div>
              <div className="hero-note"><BookOpen size={19} /><span>{copy.heroNote}</span></div>
              <span className="hero-orbit orbit-one" aria-hidden="true" />
              <span className="hero-orbit orbit-two" aria-hidden="true" />
            </div>
          </div>
          <a className="scroll-cue" href="#about"><ArrowDown size={15} />{copy.nav.about}</a>
        </section>

        <section className="about section-pad" id="about">
          <div className="about-layout page-width">
            <div className="about-visual">
              <div className="about-image-frame">
                <img src={siteConfig.portrait} alt={`${copy.teacherName} — ${copy.teacherCredential}`} loading="lazy" />
              </div>
              <div className="about-stamp">{copy.aboutStamp}</div>
              <div className="about-card">
                <span className="about-card-icon"><GraduationCap size={21} /></span>
                <span><strong>{copy.aboutBadgeTitle}</strong><small>{copy.aboutBadgeText}</small></span>
              </div>
            </div>
            <div className="about-content">
              <SectionHeading eyebrow={copy.aboutEyebrow} title={copy.aboutTitle} />
              <div className="about-prose">
                {copy.aboutBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="credentials">
                <div><span>{copy.qualification}</span><strong>{copy.qualificationValue}</strong></div>
                <div><span>{copy.approach}</span><strong>{copy.approachValue}</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="courses section-pad" id="courses">
          <div className="page-width">
            <SectionHeading
              eyebrow={copy.courseEyebrow}
              title={copy.courseTitle}
              intro={copy.courseIntro}
            />
            <div className="course-grid">
              {siteConfig.courses.map((course, index) => {
                const level = copy.levels[course.key];
                return (
                  <article className={`course-card ${index === 0 ? "course-card-featured" : ""}`} key={course.level}>
                    <div className="course-card-top">
                      <span className="course-level">{course.level}</span>
                      <span className="course-index">0{index + 1}</span>
                    </div>
                    <h3>{level.name}</h3>
                    <p>{level.description}</p>
                    <div className="course-formats">
                      {siteConfig.formats.map((format) => <span key={format}>{copy[format]}</span>)}
                    </div>
                    <a
                      href="#contact"
                      className="course-link"
                      onClick={() => setSelectedLevels((current) => current.includes(course.level) ? current : [...current, course.level])}
                    >
                      {copy.askAbout}<DirectionIcon size={16} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="schedule section-pad" id="schedule">
          <div className="schedule-decoration" aria-hidden="true">{copy.scheduleDecoration}</div>
          <div className="schedule-layout page-width">
            <div>
              <SectionHeading
                eyebrow={copy.scheduleEyebrow}
                title={copy.scheduleTitle}
                intro={copy.scheduleIntro}
              />
              <a className="button button-green" href="#contact">{copy.scheduleCta}<DirectionIcon size={17} /></a>
            </div>
            <div className="schedule-panel">
              {siteConfig.schedule.length ? siteConfig.schedule.map((item) => (
                <div className="schedule-item" key={`${item.days}-${item.startTime}`}>
                  <span className="schedule-icon"><Clock3 size={19} /></span>
                  <span>
                    <small>{item.level || copy.scheduleFormatValue}</small>
                    <strong>{[item.days, item.startTime, item.duration, item.availability].filter(Boolean).join(" · ")}</strong>
                  </span>
                </div>
              )) : (
                <>
                  <div className="schedule-item">
                    <span className="schedule-icon"><Clock3 size={19} /></span>
                    <span><small>{copy.scheduleAvailability}</small><strong>{copy.scheduleAvailabilityValue}</strong></span>
                  </div>
                  <div className="schedule-item">
                    <span className="schedule-icon"><BookOpen size={19} /></span>
                    <span><small>{copy.scheduleFormat}</small><strong>{copy.scheduleFormatValue}</strong></span>
                  </div>
                  <div className="schedule-item">
                    <span className="schedule-icon"><Globe2 size={19} /></span>
                    <span><small>{copy.scheduleTime}</small><strong>{copy.scheduleTimeValue}</strong></span>
                  </div>
                  <p className="schedule-note">{copy.scheduleNote}</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="testimonials section-pad" id="testimonials">
          <div className="page-width">
            <SectionHeading eyebrow={copy.testimonialEyebrow} title={copy.testimonialTitle} />
            {siteConfig.testimonials.length ? (
              <div className="testimonial-carousel" role="region" aria-roledescription="carousel" aria-label={copy.testimonialTitle}>
                  <article className="testimonial-card" aria-live="polite" key={currentReview.name}>
                    <div className="review-stars" role="img" aria-label={copy.ratingLabel}>
                      {"★".repeat(currentReview.rating)}
                    </div>
                    <p>
                      “{reviewExpanded || currentReview.quote.length <= reviewExcerptLength
                        ? currentReview.quote
                        : `${reviewExcerpt}…`}”
                    </p>
                    {currentReview.quote.length > reviewExcerptLength && (
                      <button
                        className="review-toggle"
                        type="button"
                        aria-expanded={reviewExpanded}
                        onClick={() => setReviewExpanded(!reviewExpanded)}
                      >
                        {reviewExpanded ? copy.showLess : copy.showMore}
                      </button>
                    )}
                    <strong>{currentReview.name}</strong>
                  </article>
                <div className="testimonial-controls">
                  <button type="button" aria-label={copy.previousReview} onClick={() => changeReview(-1)}>
                    <PreviousIcon size={18} />
                  </button>
                  <span aria-live="polite">{activeReview + 1} / {siteConfig.testimonials.length}</span>
                  <button type="button" aria-label={copy.nextReview} onClick={() => changeReview(1)}>
                    <NextIcon size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="testimonial-empty"><MessageCircle size={22} /><p>{copy.testimonialEmpty}</p></div>
            )}
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-layout page-width">
            <div className="contact-copy">
              <SectionHeading
                eyebrow={copy.contactEyebrow}
                title={copy.contactTitle}
                intro={copy.contactIntro}
                light
              />
              <div className="contact-details">
                <div className="contact-detail">
                  <span className="contact-detail-icon"><Send size={17} /></span>
                  <span><small>{copy.contactEmailLabel}</small><a href={`mailto:${siteConfig.contactEmail}`}><strong>{siteConfig.contactEmail}</strong></a></span>
                </div>
                <div className="contact-detail">
                  <span className="contact-detail-icon"><MessageCircle size={17} /></span>
                  <span><small>{copy.contactWhatsAppLabel}</small><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer"><strong>{siteConfig.contactPhone}</strong></a></span>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitEnquiry} noValidate>
              <div className="form-row">
                <label>{copy.formName}<input autoComplete="name" name="name" required placeholder={copy.formName} /></label>
                <label>{copy.formEmail}<input autoComplete="email" name="email" type="email" required placeholder={copy.formEmail} /></label>
              </div>
              <label>{copy.formPhone}<input autoComplete="tel" name="phone" type="tel" placeholder={copy.formPhone} /></label>
              <fieldset className="level-fieldset">
                <legend>{copy.formLevels} <span aria-hidden="true">*</span></legend>
                <div className="level-options">
                  {siteConfig.courses.map((course) => (
                    <label className={`level-option ${selectedLevels.includes(course.level) ? "level-option-selected" : ""}`} key={course.level}>
                      <input
                        type="checkbox"
                        name="levels"
                        value={course.level}
                        checked={selectedLevels.includes(course.level)}
                        onChange={() => toggleLevel(course.level)}
                      />
                      <span>{course.level}</span>
                      {selectedLevels.includes(course.level) && <Check size={14} />}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label>{copy.formMessage}<textarea name="message" rows="3" placeholder={copy.formMessagePlaceholder} /></label>
              <button type="submit" className="button button-gold form-submit">{copy.formSubmit}<DirectionIcon size={17} /></button>
              <p className="form-status" role="status" aria-live="polite">{formStatusKey ? copy[formStatusKey] : ""}</p>
            </form>
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <div className="footer-main page-width">
          <div className="footer-brand">
            <a className="brand brand-footer" href="#home"><img src={siteConfig.logo} alt="" /><span>Fluent <i>in</i> German</span></a>
            <p>{copy.footerNote}</p>
          </div>
          <div className="footer-links">
            <nav className="footer-nav" aria-label={copy.mainNavLabel}>
              {navItems.map(([id, label, href]) => <a key={id} href={href}>{label}</a>)}
              <a href="#contact">{copy.footerContact}</a>
            </nav>
            <div className="footer-contact">
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">{siteConfig.contactPhone}</a>
            </div>
            <div className="footer-social">
              {siteConfig.socialLinks.filter((item) => item.url).map((item) => (
                <a href={item.url} key={item.name} target="_blank" rel="noreferrer">{item.name}<ArrowUpRight size={14} /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom page-width">
          <span>© {new Date().getFullYear()} {siteConfig.name}. {copy.footerRights}</span>
          <a href="#home">{copy.nav.home}<ArrowUpRight size={14} /></a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>,
);
