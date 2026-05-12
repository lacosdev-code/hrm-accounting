import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

/**
 * Mendownload elemen HTML menjadi PDF
 * @param {string} elementId - ID dari elemen HTML yang ingin difoto jadi PDF
 * @param {string} fileName - Nama file output
 */
export const downloadPDF = async (elementId, fileName = 'laporan-sgd.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2, // Kualitas gambar lebih tajam
    useCORS: true,
    logging: false,
    backgroundColor: '#f8fafc' // Warna bg slate-50 agar sesuai tema
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
};

/**
 * Mendownload data array menjadi Excel
 * @param {Array} data - Data JSON array
 * @param {string} fileName - Nama file output
 */
export const downloadExcel = (data, fileName = 'data-sgd.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, fileName);
};
