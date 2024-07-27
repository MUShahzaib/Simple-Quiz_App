function downloadResults(){
    const results = this.document.getElementById("container");
            console.log(results);
            // console.log(window);
            var opt = {
                margin: 1,
                filename: 'myresults.pdf',
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(results).set(opt).save();
}