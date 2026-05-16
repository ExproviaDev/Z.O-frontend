"use client";

import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { FiAward, FiCheckCircle, FiCheck, FiDownload, FiLoader } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// 🔥 DEBUG_MODE (আপনার দরকার হলে true করতে পারেন)
const DEBUG_MODE = false; 

const CertificateCard = ({
  userName,
  date,
  validationId,
  title = "Participation Certificate",
  subtitle = "Round 1: Quiz Olympiad",
  templatePath = "/certificates_round_1.pdf",
  accentClass = "bg-indigo-600",
  description = "",
}) => {
  // Convert Greek/Cyrillic "lookalike" letters to their Latin equivalents.
  // Many users paste names where A/T/M/O etc. are actually Greek or Cyrillic
  // characters (Α/Τ/Μ/О). Helvetica can't render those, so the PDF would show
  // empty boxes. We normalize them here so the certificate looks correct.
  const HOMOGLYPH_MAP = {
    // Greek uppercase → Latin
    'Α': 'A', 'Β': 'B', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Ι': 'I', 'Κ': 'K',
    'Μ': 'M', 'Ν': 'N', 'Ο': 'O', 'Ρ': 'P', 'Τ': 'T', 'Υ': 'Y', 'Χ': 'X',
    // Greek lowercase → Latin
    'α': 'a', 'ε': 'e', 'ι': 'i', 'κ': 'k', 'ν': 'v', 'ο': 'o',
    'ρ': 'p', 'τ': 't', 'υ': 'y', 'χ': 'x',
    // Cyrillic uppercase → Latin
    'А': 'A', 'В': 'B', 'Е': 'E', 'К': 'K', 'М': 'M', 'Н': 'H', 'О': 'O',
    'Р': 'P', 'С': 'C', 'Т': 'T', 'Х': 'X', 'У': 'Y',
    // Cyrillic lowercase → Latin
    'а': 'a', 'е': 'e', 'к': 'k', 'м': 'm', 'о': 'o', 'р': 'p', 'с': 'c',
    'т': 't', 'х': 'x', 'у': 'y',
    // Fullwidth / special spaces
    '\u00A0': ' ', '\u2002': ' ', '\u2003': ' ', '\u200B': '',
  };

  const normalizeName = (str) => {
    if (!str) return '';
    const nfkc = str.normalize('NFKC');
    let out = '';
    for (const ch of nfkc) {
      out += HOMOGLYPH_MAP[ch] ?? ch;
    }
    return out;
  };

  const [downloadState, setDownloadState] = useState("idle"); // idle | generating | downloading | done
  const loading = downloadState !== "idle";
  const certificateName = normalizeName(userName || "").toUpperCase();

  const isFellowshipTemplate = templatePath === "/fellowship_certificates.pdf";

  // After normalization, anything left outside the WinAnsi range is something
  // we can't render with the built-in Helvetica font (e.g. Bengali).
  const needsUnicodeFont = (str) => /[^\u0000-\u00FF]/.test(str);

  const buildFileName = () => {
    const safeName = certificateName
      .replace(/[^A-Z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "_");
    const safeTitle = String(title || "certificate")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    return `${safeTitle || "certificate"}_${safeName || "participant"}.pdf`;
  };

  const downloadPdf = async () => {
    if (loading) return;
      if (!certificateName) { toast.error("User name missing!"); return; }
    setDownloadState("generating");
    let hasDownloaded = false;

    try {
      const existingPdfBytes = await fetch(templatePath).then(res => {
        if (!res.ok) throw new Error(`TEMPLATE_MISSING:${templatePath}`);
        return res.arrayBuffer();
      });

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);

      // Date & validation ID are always plain ASCII — always render them with
      // Helvetica so they look consistent regardless of the user's name.
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Pick the font used for the user's name. If, after homoglyph
      // normalization, the name still contains non-Latin characters
      // (e.g. real Bengali), load the Bengali font for just the name.
      let nameFont = font;
      if (needsUnicodeFont(certificateName)) {
        const bengaliFontBytes = await fetch('/NotoSansBengali-Bold.ttf').then(r => r.arrayBuffer());
        nameFont = await pdfDoc.embedFont(bengaliFontBytes);
      }

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // ==========================================
      // 👇 আপনার ফিক্স করা পজিশন কনফিগারেশন 👇
      // ==========================================
      const nameYPosition = isFellowshipTemplate ? 515 : 300;
      const nameFontSize = isFellowshipTemplate ? 42 : 32;

      // Fellowship vs Round1/Round2 আলাদা করে সহজে টিউন করা যাবে
      const dateXPosition = isFellowshipTemplate ? 330 : 110;
      const dateYPosition = isFellowshipTemplate ? 928 : 65;
      const idXPosition = isFellowshipTemplate ? 330 : (width / 6);
      const idYPosition = isFellowshipTemplate ? 942 : 550;
      const idFontSize = isFellowshipTemplate ? 9 : 11;
      // ==========================================


      // ১. নাম বসানো
      const nameWidth = nameFont.widthOfTextAtSize(certificateName, nameFontSize);
      firstPage.drawText(certificateName, {
        x: (width / 1.85) - (nameWidth / 2),
        y: nameYPosition,
        size: nameFontSize,
        font: nameFont,
        color: rgb(0.12, 0.12, 0.12),
      });

      // ২. তারিখ বসানো
      firstPage.drawText(date, {
        x: dateXPosition,
        y: dateYPosition,
        size: isFellowshipTemplate ? 10 : 14,
        font: isFellowshipTemplate ? fontRegular : font,
        color: isFellowshipTemplate ? rgb(0.2, 0.2, 0.2) : rgb(0, 0, 0),
      });

      // ৩. 🔥 ভ্যালিডেশন আইডি বসানো
      if (validationId) {
          const idText = `${validationId}`;
          const idWidth = fontRegular.widthOfTextAtSize(idText, idFontSize);
          
          firstPage.drawText(idText, {
            x: isFellowshipTemplate ? idXPosition : idXPosition - (idWidth / 2),
            y: idYPosition, 
            size: idFontSize,
            font: fontRegular,
            color: isFellowshipTemplate ? rgb(0.2, 0.2, 0.2) : rgb(0, 0, 0),
          });
      }

      if (DEBUG_MODE) {
         // ... Debug logic
      }

      // ৪. পিডিএফ জেনারেশন + direct download
      setDownloadState("downloading");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = buildFileName();
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(pdfUrl);

      setDownloadState("done");
      hasDownloaded = true;
      toast.success("Certificate downloaded successfully!");
      setTimeout(() => setDownloadState("idle"), 1500);

    } catch (error) {
      console.error("PDF Error:", error);
      if (error?.message?.startsWith("TEMPLATE_MISSING:")) {
        toast.error("Certificate is being prepared. Please check back soon!");
      } else {
        toast.error("Could not generate certificate. Please try again.");
      }
    } finally {
      if (!hasDownloaded) {
        setDownloadState("idle");
      }
    }
  };

  return (
    <div className="group w-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
      <div className="relative flex flex-col md:flex-row">
        {/* Left luxury band */}
        <div className={`${accentClass} relative md:w-[270px] px-6 py-6 md:py-7 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/15" />
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
          <div className="relative z-10">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/35 bg-white/20 backdrop-blur-sm">
              <FiAward className="text-2xl text-white" />
            </div>
            <h3 className="text-lg font-black leading-tight">{title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/90">{subtitle}</p>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 px-6 py-5 md:px-7 md:py-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
              <FiCheckCircle className="text-xl text-emerald-500" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Awarded To</p>
                <p className="truncate text-base font-black text-slate-800 md:text-lg">{certificateName}</p>
              </div>
            </div>

            {validationId && (
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Certificate ID</p>
                <p className="font-mono text-[11px] font-bold text-slate-700">{validationId}</p>
              </div>
            )}
          </div>

          {description && (
            <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-slate-600">
              {description}
            </p>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={downloadPdf}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {downloadState === "generating" ? (
                <>
                  <FiLoader className="animate-spin" /> Generating...
                </>
              ) : downloadState === "downloading" ? (
                <>
                  <FiDownload className="animate-bounce" /> Downloading...
                </>
              ) : downloadState === "done" ? (
                <>
                  <FiCheck /> Downloaded
                </>
              ) : (
                <>
                  <FiDownload /> Download Certificate
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;