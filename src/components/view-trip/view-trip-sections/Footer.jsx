import React from "react";
import html2pdf from "html2pdf.js";

const Footer = () => {
  const downloadPDF = () => {
    const element = document.body;
    html2pdf()
      .from(element)
      .set({
        margin: 0,
        filename: "TravelGuide.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1.5, useCORS: true },
        jsPDF: { unit: "in", format: [11.69, 6.56], orientation: "landscape" },
      })
      .save();
  };

  return (
    <footer className="bg-slate-800 text-white text-center py-6 mt-10">
      <button
        onClick={downloadPDF}
        className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-full mb-4 transition"
      >
        📄 Download PDF
      </button>
      <p className="text-sm">&copy; 2024 TripWise. All rights reserved.</p>
      <p className="text-xs text-gray-300">
        Designed & Developed by Raghav Goyal
      </p>
    </footer>
  );
};

export default Footer;
