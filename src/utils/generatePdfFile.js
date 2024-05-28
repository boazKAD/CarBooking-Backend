import PDFDocument from "pdfkit-table";
import { getTotalPriceOfCartItem } from "./calculation";
import invoiceData from "../controller/Subscription/SubsDeliveryNote/SubsDeliveryNote";
export const buildPdf = (dataCallback, endCallback, dataQuotation) => {
  const doc = new PDFDocument({ bufferPages: true, size: "A4" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.image("src/assets/images/samphone.jpeg", {
    fit: [150, 150],
    align: "right",
    valign: "right",
    x: doc.page.width - 200 - 325,
    y: 30,
  });
  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.text("SAMPHONE RWANDA LTD");
  doc.font("Helvetica");
  doc.fontSize(8);
  doc.text("TCB Builidng, 3rd Floor B, Kiyovu Cell,");
  doc.text("Nyarugenge Sector,");
  doc.text("Kigali, City of Kigali 0000, Rw");
  doc.text("www.samphone.co");
  doc.text("VAT Agency Registration No.: 112620773");
  doc.text("Govt. UID 112620773");
  doc.text("---------------------------------------");
  doc.moveDown();
  doc.moveDown();

  doc.font("Helvetica-Bold");
  doc.fontSize(9);
  doc.text(`Supplier: `);
  doc.font("Helvetica");
  doc.text(`${dataQuotation.supplier.name}`);
  doc.text(`${dataQuotation.supplier.email}`);
  doc.text(`${dataQuotation.supplier.address}`);

  // doc.font('Helvetica-Bold').fontSize(9).text('SHIP TO: ', centerX, centerY);
  // doc.font('Helvetica').text(text, centerX, centerY + 15);

  doc.moveDown();
  doc.font("Helvetica-Bold");
  doc.text(`Confirmation Deadline: `);
  doc.font("Helvetica");
  doc.text(`${dataQuotation.confirmationDate}`);
  doc.moveDown();

  const listOfProducts = dataQuotation.quotation.listOfProducts;

  const prs = listOfProducts.map((data) => {
    return [
      data?.product?.brand,
      data?.product?.model,
      data?.specification.map((el) => el[1] && `${el[0]}: ${el[1]}`).join(", "),
      data?.quantity,
    ];
  });

  const table = {
    headers: ["Brand", "Model", "Description", "Quantity"],
    rows: prs,
  };

  doc.font("Helvetica");
  doc.fontSize(14);
  doc.table(table, {
    widths: [50, 100, 200, 50],
  });

  const centerX = doc.page.width - 240;
  const centerY = 167;
  const text =
    "SAMPHONE RWANDA LTD\nTCB Builidng, 3rd Floor B, Kiyovu Cell, Nyarugenge Sector\nKigali, City of Kigali 0000\nRw";
  doc.font("Helvetica-Bold").fontSize(9).text("SHIP TO: ", centerX, centerY);
  doc.font("Helvetica").text(text, centerX, centerY + 12);

  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.text("Request For Quotation", doc.page.width - 240, 70);
  doc.font("Helvetica-Bold");
  doc.fontSize(9);
  doc.text(dataQuotation.quotation.quotationId, doc.page.width - 240, 85);

  doc.end();
};

export const pOPdf = (dataCallback, endCallback, dataPo) => {
  const doc = new PDFDocument({ bufferPages: true, size: "A4" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.image("src/assets/images/samphone.jpeg", {
    fit: [150, 150],
    align: "right",
    valign: "right",
    x: doc.page.width - 200 - 325,
    y: 30,
  });
  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.text("SAMPHONE RWANDA LTD");
  doc.font("Helvetica");
  doc.fontSize(8);
  doc.text("TCB Builidng, 3rd Floor B, Kiyovu Cell,");
  doc.text("Nyarugenge Sector,");
  doc.text("Kigali, City of Kigali 0000, Rw");
  doc.text("www.samphone.co");
  doc.text("VAT Agency Registration No.: 112620773");
  doc.text("Govt. UID 112620773");
  doc.text("---------------------------------------");
  doc.moveDown();
  doc.moveDown();

  doc.font("Helvetica-Bold");
  doc.fontSize(9);
  doc.text(`Supplier: `);
  doc.font("Helvetica");
  doc.text(`${dataPo.supplier.email}`);
  doc.text(`${dataPo.supplier.name}`);
  doc.text(`${dataPo.supplier.address}`);

  // doc.font('Helvetica-Bold').fontSize(9).text('SHIP TO: ', centerX, centerY);
  // doc.font('Helvetica').text(text, centerX, centerY + 15);

  doc.moveDown();
  doc.moveDown();
  doc.moveDown();

  const listOfProducts = dataPo.listOfProducts;

  const prs = listOfProducts.map((data) => {
    return [
      data?.quotationItem?.product?.brand,
      data?.quotationItem?.product?.model,
      data?.quotationItem?.specification
        .map((el) => el[1] && `${el[0]}: ${el[1]}`)
        .join(", "),
      data?.quantity,
      (+data?.priceUnit).toLocaleString(),
      (data?.quantity * +data?.priceUnit).toLocaleString(),
    ];
  });

  const table = {
    headers: [
      "Brand",
      "Model",
      "Description",
      "Quantity",
      "UnitPrice",
      "TotalPrice",
    ],
    rows: prs,
  };

  doc.font("Helvetica");
  doc.fontSize(14);
  doc.table(table, {
    widths: [50, 100, 200, 50, 100],
  });

  const centerX = doc.page.width - 240;
  const centerY = 167;
  const text =
    "SAMPHONE RWANDA LTD\nTCB Builidng, 3rd Floor B, Kiyovu Cell, Nyarugenge Sector\nKigali, City of Kigali 0000\nRw";
  doc.font("Helvetica-Bold").fontSize(9).text("SHIP TO: ", centerX, centerY);
  doc.font("Helvetica").text(text, centerX, centerY + 12);

  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.text("Purchase Order", doc.page.width - 240, 70);
  doc.font("Helvetica-Bold");
  doc.fontSize(9);
  doc.text(dataPo.pOrderID, doc.page.width - 240, 85);

  doc.end();
};

export const TrnsPdf = (dataCallback, endCallback, dataTrns) => {
  const doc = new PDFDocument({ bufferPages: true, margin: 30, size: "A4" });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("Transaction Invoice")
    .moveDown(1)
    .font("Helvetica")
    .fontSize(8)
    .font("Helvetica-Bold")
    .text(`${dataTrns.customer.name}`)
    .font("Courier-Bold");
  doc.text(`${dataTrns.customer.phone}`);
  doc.text(`${dataTrns.customer.email}`);
  doc.moveDown();
  doc.moveDown();
  // console.log(dataTrns);

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text("INVOICE")
    .text("DATE")
    .text("PAID BY")
    .text("SHOP");

  doc
    .font("Times-Bold")
    .fontSize(10)
    .translate(doc.page.width - 540, -45)
    .text(`${dataTrns.cartId}`)
    .text(`${dataTrns.createdAt.toString().split("GMT")[0]}`)
    .text(`${dataTrns.channel}`)
    .text
    // `${
    //   dataTrns.shopStockItem?.shop?.channel?.name
    //     ? dataTrns.shopStockItem.shop.channel.name
    //     : ""
    // }`
    ();
  doc
    .save()
    .translate(doc.page.width - 325, -120)
    .image("src/assets/images/samphone.jpeg", {
      fit: [150, 150],
      align: "right",
    })
    .moveDown(2)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("SAMPHONE RWANDA LTD", {
      height: 650,
    })
    .font("Helvetica")
    .fontSize(10)
    .text("TCB Building, 3rd Floor , Nyarugenge District")
    .text("TEL: 0792573848")
    .text("EMAIL: invoice@samphone.co")
    .text("TIN: 112620773")
    .text("CASHIER: SAMPHONE RWANDA Ltd(112620773)");
  const listOfProducts = dataTrns.list;

  const prs = listOfProducts.map((data) => {
    // console.log(data?.shopStockItem?.requestedItem?.product?.product?.model);
    return [
      data?.shopStockItem?.requestedItem?.product?.product?.model,
      data?.shopStockItem?.requestedItem?.product?.specification
        .map((el) => el[1] && `${el[0]}: ${el[1]}`)
        .join(", "),
      1,

      (+data?.payment?.amount).toLocaleString(),
      (+data?.payment?.amount).toLocaleString(),
      "0.00%",
    ];
  });

  const table = {
    headers: [
      "product",
      "Description",
      "Quantity",
      "Price/unit(Rwf)",
      "TotalPrice(Rwf)",
      "Tax",
    ],
    rows: prs,
  };

  doc
    .font("Helvetica")
    .fontSize(14)
    .translate(doc.page.width - 915, 90)
    .table(table, {
      widths: [50, 50, 200, 50],
    });

  doc
    .translate(doc.page.width - 250, 90)
    .font("Helvetica")
    .text(
      `Untexed Amount                   ${getTotalPriceOfCartItem(
        listOfProducts
      ).toLocaleString()}`
    )
    .moveDown(1)
    .text("VAT 0%: _______________ 0.00")
    // .divider(true)
    .moveDown(1)
    .text(
      `Total:                                     ${getTotalPriceOfCartItem(
        listOfProducts
      ).toLocaleString()}`
    )
    .moveDown(4);

  doc.end();
};

export const InvPDF = (dataCallback, endCallback, invoiceData) => {
  const doc = new PDFDocument({ bufferPages: true, margin: 30, size: "A4" });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  // Add content to the PDF
  doc.font("Helvetica-Bold").fontSize(20).text("INVOICE", 100, 100);
  doc
    .font("Helvetica")
    .fontSize(12)
    .text("Invoice Number ", 300, 120)
    .text("Invoice Date ", 300, 132)
    .text("Due Date ", 300, 142);
  doc
    .font("Courier")
    .fontSize(12)
    .text("INV-0012 ", 450, 120)
    .text("12/5/2023 ", 450, 132)
    .text("12/5/2023 ", 450, 142);
  doc.moveTo(100, 160).lineTo(530, 160).stroke();
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Billing Information ", 100, 170)
    .text("Shipping Information ", 300, 170);
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Billing Information ", 100, 170)
    .text("Shipping Information ", 300, 170);
  doc
    .font("Helvetica")
    .fontSize(14)
    .text("Company ", 100, 195)
    .text("Company ", 300, 195);
  doc
    .font("Courier")
    .fontSize(12)
    .text("Samphone", 100, 220)
    .text("MTN", 300, 220);
  doc
    .font("Helvetica")
    .fontSize(14)
    .text("Address ", 100, 240)
    .text("Address ", 300, 240)

    .text("Email ", 100, 280)
    .text("Email ", 300, 280)

    .text("Contact ", 100, 320)
    .text("Contact ", 300, 320);

  doc
    .font("Courier")
    .fontSize(12)
    .text("Kigali City - Nyarugenge", 100, 260)
    .text("Kigali City - Kimihurura", 300, 260)

    .text("samphone@gmail.com", 100, 300)
    .text("mtn@gmail.com", 300, 300)

    .text("+250 781212121", 100, 340)
    .text("+250 781212121", 300, 340);
  doc.lineWidth(0.2);
  doc.moveTo(100, 380).lineTo(530, 380).dash(3, { space: 2 }).stroke();

  doc.font("Helvetica-Bold").fontSize(14).text("Products", 100, 400);

  const tableHeaders = ["Description", "Quantity", "Unit Price ", " Amount"];
  const tableRows = [
    ["Iphone 13pro ", "2", "900,000", "1,800,000"],

    ["Samsung S32  ", "3", "200,000", "4,000,000"],
    // Add more rows as needed
  ];

  const startX = 100;
  const startY = 420;
  const columnWidths = [150, 100, 100, 100];
  const rowHeight = 30;

  const totalTableWidth = 430; // Total width available for the table
  const headerColumnWidths = columnWidths.map(
    (width) =>
      (width / columnWidths.reduce((sum, w) => sum + w, 0)) * totalTableWidth
  );

  let currentX = startX; // Initialize the current X position for drawing content

  // Draw headers with background color and text color
  for (let i = 0; i < tableHeaders.length; i++) {
    doc
      .rect(currentX, startY, headerColumnWidths[i], rowHeight)
      .fillColor("#333") // Background color
      .fill()
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#fff") // Text color
      .text(tableHeaders[i], currentX + 5, startY + 5);

    currentX += headerColumnWidths[i]; // Move to the next column
  }

  // Calculate the new startY value for drawing rows
  // Calculate the new startY value for drawing rows
  const rowsStartY = startY + rowHeight;

  // Draw rows and lines
  for (let rowIdx = 0; rowIdx < tableRows.length; rowIdx++) {
    const row = tableRows[rowIdx];
    currentX = startX; // Reset the current X position for each row

    // Calculate the y-coordinate for vertically centering the text
    const textY = rowsStartY + rowIdx * rowHeight + rowHeight / 2;

    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      doc
        .font("Helvetica")
        .fontSize(14)
        .fillColor("#000") // Reset text color
        .text(
          row[colIdx],
          currentX,
          textY,
          {
            align: "left",
            baseline: "middle",
            width: headerColumnWidths[colIdx],
          } // Limit text width
        );

      currentX += headerColumnWidths[colIdx]; // Move to the next column
    }
  }
  doc.moveTo(100, 550).lineTo(530, 550).dash(3, { space: 2 }).stroke();

  doc
    .font("Helvetica")
    .fontSize(14)
    .text("Subtotal", 380, 560)
    .text("Taxes", 400, 580)
    .font("Helvetica-Bold")
    .text("2,200,000", 460, 560)
    .text("0%", 500, 580);

  doc.moveTo(100, 630).lineTo(530, 630).dash(3, { space: 2 }).stroke();

  doc.font("Helvetica-Bold").fontSize(14).text("Additional Notes", 100, 640);
  doc.moveTo(100, 710).lineTo(530, 710).dash(3, { space: 2 }).stroke();
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Terms and Conditions", 100, 720);
  doc
    .font("Helvetica")
    .fontSize(14)
    .text("No Additional Notes", 300, 640)
    .text("Related to payment, cancellation, refund policies, etc.", 110, 740);
  // End the document and invoke the callbacks
  doc.end();
};

export const subsDeliveryNotePDF = (
  dataCallback,
  endCallback,
  accountData,
  invoiceData,
  order,
  list,
  orderList
) => {
  const doc = new PDFDocument({ bufferPages: true, size: "A4", margin: 50 });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.image("src/assets/images/Samphone logo.png", {
    fit: [150, 150],
    align: "right",
    valign: "right",
    x: doc.page.width - 220 - 325,
    y: 30,
  });
  doc.moveDown();
  doc.moveDown();

  doc.font("Helvetica-Bold");
  doc.fontSize(13);
  doc.text("SAMPHONE RWANDA LTD");
  doc.moveDown();
  doc.font("Helvetica");
  doc.fontSize(11);
  doc.text("TIN: 112620773");
  doc.text("TCB BUILDING, 3RD FLOOR B");
  doc.text("KN 70 ST, NYARUGENGE");
  doc.text("Po Box 1059");
  doc.text("KIGALI - RWANDA");
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();

  doc.save().translate(doc.page.width - 350, -177);
  doc.fontSize(11);

  doc.moveDown();
  doc.moveDown();

  doc.text("Order Date: ");
  doc.moveDown();

  doc.text("PO #  ");
  doc.text("Delivery Note # ");
  doc.text("Customer ID: ");
  doc.text("Despatch Date:");
  doc.text("Delivery Method:");

  doc.restore();

  doc.save().translate(doc.page.width - 240, -318);
  doc.fontSize(12);
  doc.fillColor("blue").text("Delivery Note");
  doc.fillColor("black");
  doc.fontSize(11);
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();

  doc.text("November 11th 2023");
  doc.moveDown();

  doc.text(`${order.SOID}`);
  doc.text(`${invoiceData.SDNID}`);
  doc.text(`${accountData?.accountID}`);
  doc.text("January 18, 2024");
  doc.text("Ground freight (Car)");
  doc.restore();
  // address
  doc.save().translate(doc.page.width - 596, -300);
  doc.font("Helvetica");
  doc.fontSize(12);
  doc.fillColor("#002d70").text("Shipping Address");
  doc.fillColor("black");
  doc.moveDown();
  doc.fontSize(10);
  doc.text(`${accountData?.customerDetails?.name}`);
  doc.text("Company Reg: 14455/KIG");
  doc.text("TIN/VAT: 100019148 ");
  doc.text(`${accountData?.customerDetails?.address}`);
  doc.text("Po Box 264 ");
  doc.text(`${accountData?.customerDetails?.tel}`);
  doc.restore();

  doc.save().translate(doc.page.width - 350, -394);
  doc.font("Helvetica");
  doc.fontSize(12);
  doc.fillColor("#002d70").text("Invoice Address");
  doc.fillColor("black");
  doc.moveDown();
  doc.fontSize(10);
  doc.text(`${accountData?.customerDetails?.name}`);
  doc.text("Company Reg: 14455/KIG");
  doc.text("TIN/VAT: 100019148");
  doc.text(`${accountData?.customerDetails?.address}`);
  doc.text("Po Box 264 ");
  doc.text(`${accountData?.customerDetails?.tel}`);
  doc.moveDown();
  doc.restore();
  const table = {
    // title: "Title",
    // subtitle: "Subtitle",
    headers: [
      { label: "No", property: "name", width: 40, renderer: null },
      {
        label: "Description",
        property: "description",
        minWidth: 200,
        width: 200,
        renderer: null,
      },
      {
        label: "Ordered",
        property: "qtyOrdered",
        width: 70,
        renderer: null,
        align: "right",
      },
      {
        label: "Delivered",
        property: "qtyDelivered",
        width: 70,
        renderer: null,
        align: "right",
      },
      {
        label: "Outstanding",
        property: "qtyRemaining",
        width: 80,
        renderer: null,
        align: "right",
      },
    ],
    // complex data
    datas: orderList,
    
  };
  // orderList?.forEach(row => {
  //   table.rows.push(row);
  // });
  doc.translate(doc.page.width - 595, 280).table(table, {
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
    prepareRow: () => doc.font("Helvetica").fontSize(10),
  });
  doc.moveDown();
  doc.save().translate(doc.page.width - 565, -10);
  doc.font("Helvetica");
  doc.fontSize(8);
  doc.text(
    "Notice must be given to us of any goods not received within 10 days taken from the date of despatch stated on invoice."
  );
  doc.save().translate(doc.page.width - 535, 0);
  doc.text(
    "Any Shortage or damage must be notified within 72 hours of receipt of goods."
  );
  doc.save().translate(doc.page.width - 610, 0);
  doc.text(
    "Complaints can only be accepted if made in writing within 30 days of receipt of goods"
  );
  doc.save().translate(doc.page.width - 570, 0);
  doc.text("No goods may be returned without prior authorisation from company");
  doc.save().translate(doc.page.width - 570, 0);
  doc.font("Helvetica-Bold");
  doc.fontSize(10);
  doc.moveDown();
  doc.text("  Thank you for your business!");

  doc.restore();
  doc.moveDown();
  doc.save().translate(doc.page.width - 690, 0);
  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.text("Prepare by ");
  doc.moveDown();
  doc.moveDown();
  doc.font("Helvetica");
  doc.fontSize(10);
  doc.text("Name _______________________");
  doc.moveDown();
  doc.text("Position _______________________");
  doc.moveDown();
  doc.text("Signature  _______________________");
  doc.moveDown();
  doc.text("Date   _______________________");
  doc.moveDown();
  doc.moveDown();
  doc.text("Signature ");

  doc.save().translate(doc.page.width - 340, -160);
  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.text("Received by ");
  doc.moveDown();
  doc.moveDown();
  doc.font("Helvetica");
  doc.fontSize(10);
  doc.text("Name _______________________");
  doc.moveDown();
  doc.text("Position _______________________");
  doc.moveDown();
  doc.text("Signature  _______________________");
  doc.moveDown();
  doc.text("Date   _______________________");
  doc.moveDown();
  doc.moveDown();
  doc.text("Signature ");
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();

  doc.restore();

  doc.save().translate(doc.page.width - 570, -150);
  doc.font("Helvetica");
  doc.fontSize(8);
  doc.text(
    "Should you have any enquiries concerning this delivery note, please contact GILBERT MURASIRA. on +250-785-093-107 "
  );
  doc.save().translate(doc.page.width - 520, 0);
  doc.text("TCB BUILDING KN70 KIGALI - RWANDA, ST, PO BOX 1059");
  doc.text("E-mail: info@samphonegroup.co Web: www.samphonegroup.com");

  doc.save().translate(doc.page.width - 710, 530);
  doc.moveTo(100, 100).lineTo(500, 100).lineWidth(0.2).stroke();

  doc.addPage();
  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  const table2 = {
    headers: ["No", "Brand", "Model", "Storage", "IMEI"],
    rows: [],
  };

  list?.forEach((row) => {
    table2.rows.push(row);
  });

  doc.translate(doc.page.width - 595, 0).table(table2, {
    widths: [90, 90, 200, 50],
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
    prepareRow: (row, i) => doc.font("Helvetica").fontSize(12),
  });

  doc.end();
};
