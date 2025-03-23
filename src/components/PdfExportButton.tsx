
import React from 'react';
import { FileDown, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PdfExportButtonProps {
  contentId: string;
  fileName: string;
  className?: string;
}

const PdfExportButton: React.FC<PdfExportButtonProps> = ({ contentId, fileName, className = '' }) => {
  const handleExportPdf = async () => {
    try {
      const contentElement = document.getElementById(contentId);
      
      if (!contentElement) {
        console.error(`Element with ID "${contentId}" not found`);
        return;
      }
      
      // Create a temporary clone of the element to ensure we capture everything properly
      const tempClone = contentElement.cloneNode(true) as HTMLElement;
      tempClone.style.width = `${contentElement.offsetWidth}px`;
      tempClone.style.padding = '20px';
      tempClone.style.position = 'absolute';
      tempClone.style.top = '-9999px';
      tempClone.style.left = '-9999px';
      tempClone.style.background = 'white';
      document.body.appendChild(tempClone);
      
      // Add title to the first page
      const title = document.createElement('h1');
      title.innerText = fileName.replace('.pdf', '');
      title.style.marginBottom = '20px';
      title.style.textAlign = 'center';
      title.style.color = '#333';
      title.style.fontSize = '24px';
      tempClone.insertBefore(title, tempClone.firstChild);
      
      // Add FreshCheck branding
      const brand = document.createElement('div');
      brand.style.textAlign = 'center';
      brand.style.marginBottom = '30px';
      brand.style.fontSize = '14px';
      brand.innerHTML = `
        <div style="font-size: 16px; font-weight: bold; color: #4CAF50;">FreshCheck</div>
        <div style="font-size: 12px; color: #666;">Food Safety Education Resources</div>
      `;
      tempClone.insertBefore(brand, title);
      
      // Add footer
      const footer = document.createElement('div');
      footer.style.marginTop = '30px';
      footer.style.textAlign = 'center';
      footer.style.fontSize = '12px';
      footer.style.color = '#666';
      footer.style.borderTop = '1px solid #eee';
      footer.style.paddingTop = '15px';
      footer.innerHTML = `
        <div>© ${new Date().getFullYear()} FreshCheck. Visit <span style="color: #4CAF50;">freshcheck.app</span> for more food safety resources.</div>
      `;
      tempClone.appendChild(footer);
      
      // Capture the content as an image
      const canvas = await html2canvas(tempClone, {
        scale: 1.5, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });
      
      // Clean up the temp element
      document.body.removeChild(tempClone);
      
      // Calculate dimensions
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const imgWidth = pdfWidth - 20; // Margins
      const imgHeight = imgWidth / ratio;
      
      // Add the image to the PDF
      let heightLeft = imgHeight;
      let position = 10; // Initial position
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      // Save the PDF
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-1.5" 
        onClick={handleExportPdf}
      >
        <FileDown size={16} />
        <span>Download PDF</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="gap-1.5" 
        onClick={handlePrint}
      >
        <Printer size={16} />
        <span>Print</span>
      </Button>
    </div>
  );
};

export default PdfExportButton;
