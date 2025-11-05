import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency, formatDate, getRiskLevel } from '../helpers';
import { hasWatermark, canWhiteLabel } from './tierConfig';

// PDF styling constants
const COLORS = {
  primary: [51, 105, 30], // Growth Green
  secondary: [197, 225, 165], // Trust Mint
  critical: [198, 40, 40],
  high: [245, 124, 0],
  medium: [2, 119, 189],
  low: [46, 125, 50],
  gray: [117, 117, 117],
  lightGray: [245, 245, 245]
};

// Add watermark if on Free tier
const addWatermarkToPDF = (doc, tier) => {
  if (hasWatermark(tier)) {
    doc.setFontSize(40);
    doc.setTextColor(200, 200, 200);
    doc.text('VendorSoluce Free Edition', doc.internal.pageSize.width / 2, 
             doc.internal.pageSize.height / 2, { angle: 45, align: 'center' });
    doc.setTextColor(0, 0, 0); // Reset color
  }
};

// Add header to PDF
const addHeaderToPDF = (doc, title, tier, showBranding = true) => {
  const pageWidth = doc.internal.pageSize.width;
  
  // Logo/Branding area
  if (showBranding && !canWhiteLabel(tier)) {
    doc.setFillColor(...COLORS.primary);
    doc.rect(0, 0, pageWidth, 30, 'F');
    
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('VendorSoluce RiskIQ', 15, 20);
  }
  
  // Title
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(title, 15, showBranding ? 45 : 20);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.gray);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 15, showBranding ? 52 : 27);
  
  return showBranding ? 60 : 35;
};

// Add footer to PDF
const addFooterToPDF = (doc, pageNumber, tier) => {
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.gray);
  
  if (!canWhiteLabel(tier)) {
    doc.text('VendorSoluce RiskIQ - Vendor Risk Management', 15, pageHeight - 10);
  }
  
  doc.text(`Page ${pageNumber}`, pageWidth - 30, pageHeight - 10);
};

// Export single vendor to PDF
export const exportVendorToPDF = (vendor, tier = 'free') => {
  const doc = new jsPDF();
  
  let yPos = addHeaderToPDF(doc, `Vendor Risk Report: ${vendor.name}`, tier);
  
  // Vendor Information Section
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.primary);
  doc.text('Vendor Information', 15, yPos);
  yPos += 10;
  
  doc.autoTable({
    startY: yPos,
    head: [['Field', 'Value']],
    body: [
      ['Vendor Name', vendor.name],
      ['Category', vendor.category || 'N/A'],
      ['Sector', vendor.sector || 'N/A'],
      ['Location', vendor.location || 'N/A'],
      ['Contract Value', formatCurrency(vendor.contractValue || 0)],
      ['Contact', vendor.contact || 'N/A'],
      ['Data Types', vendor.dataTypes || 'N/A'],
      ['Last Assessment', formatDate(vendor.lastAssessment)]
    ],
    theme: 'grid',
    headStyles: { fillColor: COLORS.primary },
    margin: { left: 15, right: 15 }
  });
  
  yPos = doc.lastAutoTable.finalY + 15;
  
  // Risk Assessment Section
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.primary);
  doc.text('Risk Assessment', 15, yPos);
  yPos += 10;
  
  const riskLevel = getRiskLevel(vendor.riskScore);
  const riskColor = vendor.riskScore >= 80 ? COLORS.critical :
                    vendor.riskScore >= 60 ? COLORS.high :
                    vendor.riskScore >= 40 ? COLORS.medium : COLORS.low;
  
  doc.autoTable({
    startY: yPos,
    head: [['Metric', 'Value', 'Status']],
    body: [
      ['Risk Score', vendor.riskScore.toString(), riskLevel]
    ],
    theme: 'grid',
    headStyles: { fillColor: COLORS.primary },
    bodyStyles: {
      1: { textColor: riskColor, fontStyle: 'bold' }
    },
    margin: { left: 15, right: 15 }
  });
  
  yPos = doc.lastAutoTable.finalY + 15;
  
  // Notes Section
  if (vendor.notes) {
    doc.setFontSize(14);
    doc.setTextColor(...COLORS.primary);
    doc.text('Notes', 15, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const splitNotes = doc.splitTextToSize(vendor.notes, 180);
    doc.text(splitNotes, 15, yPos);
  }
  
  // Add watermark for free tier
  addWatermarkToPDF(doc, tier);
  
  // Add footer
  addFooterToPDF(doc, 1, tier);
  
  // Save PDF
  doc.save(`${vendor.name.replace(/\s+/g, '_')}_Risk_Report.pdf`);
};

// Export assessment to PDF
export const exportAssessmentToPDF = (assessment, vendor, tier = 'free') => {
  const doc = new jsPDF();
  
  let yPos = addHeaderToPDF(doc, `Assessment Report: ${assessment.vendorName}`, tier);
  
  // Assessment Overview
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.primary);
  doc.text('Assessment Overview', 15, yPos);
  yPos += 10;
  
  const avgScore = Math.round(
    (assessment.securityScore + assessment.complianceScore + 
     assessment.financialScore + assessment.operationalScore) / 4
  );
  
  doc.autoTable({
    startY: yPos,
    head: [['Field', 'Value']],
    body: [
      ['Vendor', assessment.vendorName],
      ['Assessment Type', assessment.assessmentType || 'Standard'],
      ['Date', formatDate(assessment.createdAt)],
      ['Average Score', `${avgScore}/100`],
      ['Risk Level', getRiskLevel(avgScore)]
    ],
    theme: 'grid',
    headStyles: { fillColor: COLORS.primary },
    margin: { left: 15, right: 15 }
  });
  
  yPos = doc.lastAutoTable.finalY + 15;
  
  // Score Breakdown
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.primary);
  doc.text('Score Breakdown', 15, yPos);
  yPos += 10;
  
  doc.autoTable({
    startY: yPos,
    head: [['Category', 'Score', 'Status']],
    body: [
      ['Security', `${assessment.securityScore}/100`, getRiskLevel(assessment.securityScore)],
      ['Compliance', `${assessment.complianceScore}/100`, getRiskLevel(assessment.complianceScore)],
      ['Financial', `${assessment.financialScore}/100`, getRiskLevel(assessment.financialScore)],
      ['Operational', `${assessment.operationalScore}/100`, getRiskLevel(assessment.operationalScore)]
    ],
    theme: 'grid',
    headStyles: { fillColor: COLORS.primary },
    margin: { left: 15, right: 15 }
  });
  
  yPos = doc.lastAutoTable.finalY + 15;
  
  // Findings
  if (assessment.findings) {
    doc.setFontSize(14);
    doc.setTextColor(...COLORS.primary);
    doc.text('Findings & Recommendations', 15, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const splitFindings = doc.splitTextToSize(assessment.findings, 180);
    doc.text(splitFindings, 15, yPos);
  }
  
  // Add watermark for free tier
  addWatermarkToPDF(doc, tier);
  
  // Add footer
  addFooterToPDF(doc, 1, tier);
  
  // Save PDF
  doc.save(`${assessment.vendorName.replace(/\s+/g, '_')}_Assessment.pdf`);
};

// Export dashboard summary to PDF
export const exportDashboardToPDF = (vendors, assessments, tier = 'free') => {
  const doc = new jsPDF();
  
  let yPos = addHeaderToPDF(doc, 'Executive Dashboard Report', tier);
  
  // Executive Summary
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.primary);
  doc.text('Executive Summary', 15, yPos);
  yPos += 10;
  
  const critical = vendors.filter(v => v.riskScore >= 80).length;
  const high = vendors.filter(v => v.riskScore >= 60 && v.riskScore < 80).length;
  const medium = vendors.filter(v => v.riskScore >= 40 && v.riskScore < 60).length;
  const low = vendors.filter(v => v.riskScore < 40).length;
  
  const totalContractValue = vendors.reduce((sum, v) => sum + (v.contractValue || 0), 0);
  const avgRiskScore = vendors.length > 0 
    ? Math.round(vendors.reduce((sum, v) => sum + v.riskScore, 0) / vendors.length)
    : 0;
  
  doc.autoTable({
    startY: yPos,
    head: [['Metric', 'Value']],
    body: [
      ['Total Vendors', vendors.length.toString()],
      ['Total Assessments', assessments.length.toString()],
      ['Average Risk Score', `${avgRiskScore}/100`],
      ['Total Contract Value', formatCurrency(totalContractValue)],
      ['Critical Risk Vendors', critical.toString()],
      ['High Risk Vendors', high.toString()],
      ['Medium Risk Vendors', medium.toString()],
      ['Low Risk Vendors', low.toString()]
    ],
    theme: 'grid',
    headStyles: { fillColor: COLORS.primary },
    margin: { left: 15, right: 15 }
  });
  
  yPos = doc.lastAutoTable.finalY + 15;
  
  // Risk Distribution
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.primary);
  doc.text('Risk Distribution', 15, yPos);
  yPos += 10;
  
  doc.autoTable({
    startY: yPos,
    head: [['Risk Level', 'Count', 'Percentage']],
    body: [
      ['Critical (80-100)', critical.toString(), `${Math.round((critical / vendors.length) * 100) || 0}%`],
      ['High (60-79)', high.toString(), `${Math.round((high / vendors.length) * 100) || 0}%`],
      ['Medium (40-59)', medium.toString(), `${Math.round((medium / vendors.length) * 100) || 0}%`],
      ['Low (0-39)', low.toString(), `${Math.round((low / vendors.length) * 100) || 0}%`]
    ],
    theme: 'grid',
    headStyles: { fillColor: COLORS.primary },
    margin: { left: 15, right: 15 }
  });
  
  // Add new page for vendor details if needed
  if (vendors.length > 0) {
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(14);
    doc.setTextColor(...COLORS.primary);
    doc.text('Top Risk Vendors', 15, yPos);
    yPos += 10;
    
    const topRiskVendors = [...vendors]
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 10);
    
    doc.autoTable({
      startY: yPos,
      head: [['Vendor', 'Category', 'Risk Score', 'Level', 'Contract Value']],
      body: topRiskVendors.map(v => [
        v.name,
        v.category || 'N/A',
        v.riskScore.toString(),
        getRiskLevel(v.riskScore),
        formatCurrency(v.contractValue || 0)
      ]),
      theme: 'grid',
      headStyles: { fillColor: COLORS.primary },
      margin: { left: 15, right: 15 }
    });
    
    addFooterToPDF(doc, 2, tier);
  }
  
  // Add watermark for free tier
  addWatermarkToPDF(doc, tier);
  
  // Add footer to first page
  addFooterToPDF(doc, 1, tier);
  
  // Save PDF
  doc.save(`VendorSoluce_Dashboard_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Export all vendors to PDF
export const exportAllVendorsToPDF = (vendors, tier = 'free') => {
  const doc = new jsPDF();
  
  let yPos = addHeaderToPDF(doc, 'Vendor Risk Portfolio Report', tier);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Total Vendors: ${vendors.length}`, 15, yPos);
  yPos += 10;
  
  doc.autoTable({
    startY: yPos,
    head: [['Vendor', 'Category', 'Risk Score', 'Level', 'Contract Value', 'Last Assessment']],
    body: vendors.map(v => [
      v.name,
      v.category || 'N/A',
      v.riskScore.toString(),
      getRiskLevel(v.riskScore),
      formatCurrency(v.contractValue || 0),
      formatDate(v.lastAssessment)
    ]),
    theme: 'grid',
    headStyles: { fillColor: COLORS.primary },
    margin: { left: 15, right: 15 },
    didDrawPage: (data) => {
      addFooterToPDF(doc, doc.internal.getNumberOfPages(), tier);
    }
  });
  
  // Add watermark for free tier
  addWatermarkToPDF(doc, tier);
  
  // Save PDF
  doc.save(`All_Vendors_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};

