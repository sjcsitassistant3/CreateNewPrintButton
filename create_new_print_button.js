// This function is specifically written for creating class lists postings which do not include parents'info for confidential purpose

function createPrintButtonForClassListPost(parent, divName, header)
{
    const printButton = document.createElement('button');
    printButton.textContent = "print(简化版)";
    printButton.id = "printbtn";
    parent.appendChild(printButton);

    printButton.addEventListener('click', () => {

        const cloneDiv = document.getElementById(divName).cloneNode(true);

        // Remove all TFOOT sections from the copied div
        cloneDiv.querySelectorAll('tfoot').forEach(tfoot => tfoot.remove());

        const btn = cloneDiv.querySelector('button');
        if (btn) btn.remove();

        // Remove columns 1,2,5,6,7,8,10
        const colsToRemove = [9, 7, 6, 5, 4, 1, 0]; 

        cloneDiv.querySelectorAll('table').forEach(table => {

            // ----- Process second THEAD row only -----
            const theadRows = table.querySelectorAll('thead tr');

            if (theadRows.length > 1) {
                const headerRow = theadRows[1];

                colsToRemove.forEach(colIdx => {
                    if (headerRow.cells.length > colIdx) {
                        headerRow.deleteCell(colIdx);
                    }
                });
            }

            // ----- Process TBODY -----
            table.querySelectorAll('tbody tr').forEach(row => {
                colsToRemove.forEach(colIdx => {
                    if (row.cells.length > colIdx) {
                        row.deleteCell(colIdx);
                    }
                });
            });
        });

    const a = window.open('', '', 'height=800,width=1200');

    a.document.write('<html>');
    a.document.write('<body>');
    a.document.write(cloneDiv.innerHTML);
    a.document.write('</body></html>');

    a.document.close();
    a.print();
});
}

// In SJCSAdmin app, in index-js.html:
// 1) Copy this createPrintButtonForClassListPost Function to the end of the index-js.html file
// 2) In Line 1602, change 
//    createPrintButton(document.getElementById('studentListDiv'), 'studentListDiv',"");
//    to
//    createPrintButtonForClassListPost(document.getElementById('studentListDiv'), 'studentListDiv',"")

