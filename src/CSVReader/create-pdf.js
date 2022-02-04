import { jsPDF } from "jspdf";
import JsBarcode from 'jsbarcode';
import { createCanvas } from "canvas";

export async function createPDF(csvArray, setIsLoading) {
    // Default export is a4 paper, portrait, using millimeters for units
    setIsLoading(true);
    const doc = new jsPDF();
    const chunks = (a) =>
        Array.from(new Array(Math.ceil(a.length / 4)), (_, i) => a.slice(i * 4, i * 4 + 4));
    const codeArray = chunks(csvArray);
    codeArray.map((page, pageIndex) => {
        if (pageIndex > 0) { doc.addPage(); }
        page.map((items, rowIndex) => {
            items.map((item, columnIndex) => {
                const jpegUrl = createCode(item.code, item.title);
                doc.addImage(jpegUrl, 'JPEG', columnIndex * 60 + 20, rowIndex * 60 + 20, 50, 40);
            })
        })
    });
    doc.save("codes.pdf");
    setIsLoading(false);
}

function createCode(code, title) {
    var canvas = createCanvas();
    JsBarcode(canvas, code, {
        "text": title
    });
    return canvas.toDataURL("image/jpeg");
}