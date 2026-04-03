const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateInvoicePDF(invoiceData, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = buildInvoiceHTML(invoiceData);
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
}

function buildInvoiceHTML(data) {
  return `
  <html>
    <head>
      <style>
        body { font-family: Arial; font-size: 12px; }
        .header { display: flex; justify-content: space-between; align-items: center; }
        .title { font-size: 18px; font-weight: bold; }
        .badge { background: green; color: white; padding: 4px 8px; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        .total-row { font-weight: bold; }
        .footer { margin-top: 40px; font-size: 10px; }
        .terms { margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <img src="https://www.freepnglogos.com/uploads/logo-3d-png/3d-company-logos-design-logo-online-2.png" width="150" />
          <p>
            TRUXCARGO PRIVATE LIMITED<br/>
            CIN: U63000DL2021PTC391262<br/>
            PAN : AAJCT667J<br/>
            GST : 07AAJCT667J1Z0<br/>
            TAN : DELT20019G<br/>
            ORIGINAL FOR RECIPIENT
          </p>
        </div>
        <div style="text-align:right;">
          <p class="title">TAX INVOICE <span class="badge">Paid</span></p>
          <p>
            Address:<br/>
            Unit No. 801-802, 8th Floor,<br/>
            Plot No B-5, KLJ Tower North,<br/>
            Netaji Subhash Palace Pitampura,<br/>
            New Delhi 110034<br/>
            +91 9315033113
          </p>
          <p>
            Invoice No: ${data.invoiceNo}<br/>
            Invoice Date: ${data.generatedDate}
          </p>
        </div>
      </div>

      <p><strong>Bill To:</strong><br/>
      ${data.courierDetails.name}<br/>
      ${data.courierDetails.address}<br/>
      GST: ${data.courierDetails.gst}</p>

      <table>
        <thead>
          <tr>
            <th>Item</th><th>Description</th><th>SAC</th>
            <th>Unit Cost</th><th>Quantity</th><th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>B2B Services</td>
            <td>B2B Services for the date from ${data.dateRange.from} to ${data.dateRange.to}</td>
            <td>996718</td>
            <td>${data.subtotal.toFixed(2)}</td>
            <td>1</td>
            <td>${data.subtotal.toFixed(2)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr><td colspan="5">Sub Total</td><td>${data.subtotal.toFixed(2)}</td></tr>
          <tr><td colspan="5">IGST @18%</td><td>${data.gst.toFixed(2)}</td></tr>
          <tr class="total-row"><td colspan="5">Total</td><td>${data.total.toFixed(2)}</td></tr>
        </tfoot>
      </table>

      <div class="terms">
        <p><strong>Terms :</strong><br/>
        Please make all cheques/DD payable to TRUXCARGO PRIVATE LIMITED<br/>
        Remittance to be made to the following accounts:<br/>
        A/C Holder Name: TRUXCARGO PRIVATE LIMITED<br/>
        A/C Number: 50200064974239<br/>
        IFSC Code: HDFC0001562
        </p>
        <p>Please download the charge calculator from given link: <a href="#">Invoice Report</a></p>
      </div>

      <div class="footer">
        <p><strong>Head Office:</strong> Ground Floor, Plot No. 27-28, KH No. 6/12, Gali No. 14, Bhatta Road, Swaroop Nagar, New Delhi-110042</p>
      </div>
    </body>
  </html>
  `;
}

module.exports = { generateInvoicePDF };
