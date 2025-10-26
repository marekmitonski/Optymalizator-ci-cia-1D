// Data Storage
let stockBars = [
    { length: 2000, quantity: 10, id: 1 }
];

let elements = [
    { length: 900, quantity: 2, id: 1 },
    { length: 180, quantity: 2, id: 2 },
    { length: 95, quantity: 2, id: 3 }
];

let nextStockBarId = 2;
let nextElementId = 4;
let optimizationResults = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderStockBars();
    renderElements();

    // Depth slider
    document.getElementById('optimizationDepth').addEventListener('input', (e) => {
        document.getElementById('depthValue').textContent = e.target.value;
    });
});

// Render Functions
function renderStockBars() {
    const tbody = document.getElementById('stockBarsBody');
    tbody.innerHTML = '';

    // Existing bars
    stockBars.forEach((bar, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="number" value="${bar.length}" onblur="updateStockBar(${index}, 'length', this.value)" onkeypress="if(event.key==='Enter') this.blur()" onfocus="onInputFocus()"></td>
            <td><input type="number" value="${bar.quantity}" onblur="updateStockBar(${index}, 'quantity', this.value)" onkeypress="if(event.key==='Enter') this.blur()" onfocus="onInputFocus()"></td>
            <td class="actions">
                <button class="icon-btn remove-btn" onclick="removeStockBar(${index})" title="Usuń">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Add row
    const addTr = document.createElement('tr');
    addTr.className = 'add-row';
    addTr.innerHTML = `
        <td><input type="number" id="newBarLength" placeholder="Długość (mm)" onfocus="onInputFocus()"></td>
        <td><input type="number" id="newBarQuantity" placeholder="Ilość" value="1" onfocus="onInputFocus()"></td>
        <td class="actions">
            <button class="icon-btn add-btn" onclick="addStockBar()" title="Dodaj pręt">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/>
                </svg>
            </button>
        </td>
    `;
    tbody.appendChild(addTr);
}

function renderElements() {
    const tbody = document.getElementById('elementsBody');
    tbody.innerHTML = '';

    // Existing elements
    elements.forEach((elem, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="number" value="${elem.length}" onblur="updateElement(${index}, 'length', this.value)" onkeypress="if(event.key==='Enter') this.blur()" onfocus="onInputFocus()"></td>
            <td><input type="number" value="${elem.quantity}" onblur="updateElement(${index}, 'quantity', this.value)" onkeypress="if(event.key==='Enter') this.blur()" onfocus="onInputFocus()"></td>
            <td class="actions">
                <button class="icon-btn remove-btn" onclick="removeElement(${index})" title="Usuń">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Add row
    const addTr = document.createElement('tr');
    addTr.className = 'add-row';
    addTr.innerHTML = `
        <td><input type="number" id="newElementLength" placeholder="Długość (mm)" onfocus="onInputFocus()"></td>
        <td><input type="number" id="newElementQuantity" placeholder="Ilość" onfocus="onInputFocus()"></td>
        <td class="actions">
            <button class="icon-btn add-btn" onclick="addElement()" title="Dodaj element">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/>
                </svg>
            </button>
        </td>
    `;
    tbody.appendChild(addTr);
}

// CRUD Operations
function addStockBar() {
    const lengthInput = document.getElementById('newBarLength');
    const quantityInput = document.getElementById('newBarQuantity');

    const length = parseInt(lengthInput.value);
    const quantity = parseInt(quantityInput.value);

    if (!length || length <= 0) {
        alert('Wprowadź prawidłową długość pręta');
        return;
    }

    if (!quantity || quantity <= 0) {
        alert('Wprowadź prawidłową ilość');
        return;
    }

    stockBars.push({ length, quantity, id: nextStockBarId++ });
    lengthInput.value = '';
    quantityInput.value = '1';
    renderStockBars();
    hideResults();
    showRecalculationMessage();
}

function updateStockBar(index, field, value) {
    const numValue = parseInt(value);

    if (!numValue || numValue <= 0) {
        alert('Wartość musi być większa od zera');
        renderStockBars();
        return;
    }

    stockBars[index][field] = numValue;
    renderStockBars();
}

function removeStockBar(index) {
    stockBars.splice(index, 1);
    renderStockBars();
    hideResults();
    showRecalculationMessage();
}

function addElement() {
    const lengthInput = document.getElementById('newElementLength');
    const quantityInput = document.getElementById('newElementQuantity');

    const length = parseInt(lengthInput.value);
    const quantity = parseInt(quantityInput.value);

    if (!length || length <= 0) {
        alert('Wprowadź prawidłową długość elementu');
        return;
    }

    if (!quantity || quantity <= 0) {
        alert('Wprowadź prawidłową ilość');
        return;
    }

    elements.push({ length, quantity, id: nextElementId++ });
    lengthInput.value = '';
    quantityInput.value = '';
    renderElements();
    hideResults();
    showRecalculationMessage();
}

function updateElement(index, field, value) {
    const numValue = parseInt(value);

    if (!numValue || numValue <= 0) {
        alert('Wartość musi być większa od zera');
        renderElements();
        return;
    }

    elements[index][field] = numValue;
    renderElements();
}

function removeElement(index) {
    elements.splice(index, 1);
    renderElements();
    hideResults();
    showRecalculationMessage();
}

// UI State Management
function onInputFocus() {
    hideResults();
    showRecalculationMessage();
}

function hideResults() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('statisticsSection').style.display = 'none';
}

function showRecalculationMessage() {
    document.getElementById('recalculationMessage').style.display = 'block';
}

function hideRecalculationMessage() {
    document.getElementById('recalculationMessage').style.display = 'none';
}

// Progress Bar
function startCalculation() {
    const btn = document.getElementById('calculateBtn');
    const btnProgress = document.getElementById('btnProgress');
    const btnText = document.getElementById('btnText');

    btn.classList.add('calculating');
    btn.disabled = true;

    btnProgress.style.width = '0%';
    btnText.textContent = 'Optymalizacja... 0%';
}

function updateProgress(percentage) {
    const btnProgress = document.getElementById('btnProgress');
    const btnText = document.getElementById('btnText');

    btnProgress.style.width = percentage + '%';
    btnText.textContent = `Optymalizacja... ${Math.round(percentage)}%`;
}

function finishCalculation() {
    const btn = document.getElementById('calculateBtn');
    const btnProgress = document.getElementById('btnProgress');
    const btnText = document.getElementById('btnText');

    btnProgress.style.width = '100%';
    btnText.textContent = 'Gotowe!';

    setTimeout(() => {
        btn.classList.remove('calculating');
        btn.disabled = false;
        btnProgress.style.width = '0%';
        btnText.textContent = 'OBLICZ OPTYMALIZACJĘ';
    }, 1000);
}

// Optimization Algorithm
async function calculate() {
    if (elements.length === 0) {
        alert('Brak elementów do cięcia');
        return;
    }

    if (stockBars.length === 0) {
        alert('Brak prętów do rozcinania');
        return;
    }

    hideRecalculationMessage();
    startCalculation();

    // Small delay to allow UI to update
    await new Promise(resolve => setTimeout(resolve, 50));

    const depth = parseInt(document.getElementById('optimizationDepth').value);
    optimizationResults = await optimizeCutting(depth);

    finishCalculation();
    displayResults();
}

async function optimizeCutting(maxDepth) {
    // Create a list of all elements to place
    let elementsToPlace = [];
    elements.forEach(elem => {
        for (let i = 0; i < elem.quantity; i++) {
            elementsToPlace.push(elem.length);
        }
    });

    // Sort descending
    elementsToPlace.sort((a, b) => b - a);

    // Clone stock bars for tracking
    let availableBars = stockBars.map(bar => ({ ...bar }));

    let usedBars = [];
    let totalIterations = 0;
    let currentIteration = 0;

    while (elementsToPlace.length > 0) {
        // Find best bar type to use
        let bestBarIndex = -1;
        let bestWaste = Infinity;

        for (let i = 0; i < availableBars.length; i++) {
            if (availableBars[i].quantity > 0) {
                // Estimate waste for this bar length
                const barLength = availableBars[i].length;
                const largestElement = elementsToPlace[0];

                if (largestElement <= barLength) {
                    // Simple heuristic: prefer bars that minimize initial waste
                    const estimatedWaste = barLength - largestElement;
                    if (estimatedWaste < bestWaste) {
                        bestWaste = estimatedWaste;
                        bestBarIndex = i;
                    }
                }
            }
        }

        if (bestBarIndex === -1) {
            alert('Brak dostępnych prętów! Dodaj więcej prętów lub zwiększ ich ilość.');
            return null;
        }

        // Use this bar
        const barLength = availableBars[bestBarIndex].length;
        availableBars[bestBarIndex].quantity--;

        let currentBar = {
            length: barLength,
            cuts: [],
            waste: barLength
        };

        let remainingSpace = barLength;

        // Place elements on this bar
        while (remainingSpace > 0 && elementsToPlace.length > 0) {
            const bestFit = await findBestFitCombination(
                remainingSpace,
                elementsToPlace,
                maxDepth,
                currentIteration,
                totalIterations
            );

            if (!bestFit || bestFit.length === 0) break;

            // Add elements to bar
            bestFit.forEach(length => {
                currentBar.cuts.push(length);
                remainingSpace -= length;
                const index = elementsToPlace.indexOf(length);
                if (index > -1) {
                    elementsToPlace.splice(index, 1);
                }
            });

            currentIteration += bestFit.length * 10;

            // Update progress
            const progress = Math.min(95, ((elements.reduce((sum, e) => sum + e.quantity, 0) - elementsToPlace.length) / 
                                          elements.reduce((sum, e) => sum + e.quantity, 0)) * 100);
            updateProgress(progress);

            await new Promise(resolve => setTimeout(resolve, 0));
        }

        currentBar.waste = remainingSpace;
        currentBar.cuts.sort((a, b) => b - a); // Sort cuts descending
        usedBars.push(currentBar);
    }

    updateProgress(100);

    return {
        bars: usedBars,
        totalBars: usedBars.length,
        totalWaste: usedBars.reduce((sum, bar) => sum + bar.waste, 0),
        totalUsed: usedBars.reduce((sum, bar) => bar.length - bar.waste, 0)
    };
}

async function findBestFitCombination(space, available, maxDepth, currentIter, totalIter) {
    let bestCombination = null;
    let bestWaste = space;

    function tryCombo(combo, startIdx, depth) {
        if (depth > maxDepth) return;

        const sum = combo.reduce((a, b) => a + b, 0);

        if (sum <= space) {
            const waste = space - sum;
            if (waste < bestWaste) {
                bestWaste = waste;
                bestCombination = [...combo];
            }

            if (depth < maxDepth && waste > 0) {
                for (let i = startIdx; i < available.length; i++) {
                    if (available[i] <= waste) {
                        tryCombo([...combo, available[i]], i + 1, depth + 1);
                    }
                }
            }
        }
    }

    for (let i = 0; i < available.length; i++) {
        if (available[i] <= space) {
            tryCombo([available[i]], i + 1, 1);
        }
    }

    return bestCombination;
}

// Display Results
function displayResults() {
    if (!optimizationResults) return;

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    const colors = [
        '#3b82f6', '#f59e0b', '#22c55e', '#ef4444', 
        '#9333ea', '#f97316', '#ec4899', '#06b6d4'
    ];

    optimizationResults.bars.forEach((bar, index) => {
        const barDiv = document.createElement('div');
        barDiv.className = 'bar-result';

        const title = document.createElement('div');
        title.className = 'bar-title';
        title.textContent = `Pręt ${index + 1} (${bar.length}mm): ${bar.cuts.join(', ')}`;
        barDiv.appendChild(title);

        // Visual representation
        const visual = document.createElement('div');
        visual.className = 'bar-visual';

        bar.cuts.forEach((cut, cutIndex) => {
            const segment = document.createElement('div');
            segment.className = 'cut-segment';
            segment.style.width = (cut / bar.length * 100) + '%';
            segment.style.background = colors[cutIndex % colors.length];
            segment.textContent = cut + 'mm';
            visual.appendChild(segment);
        });

        if (bar.waste > 0) {
            const wasteSegment = document.createElement('div');
            wasteSegment.className = 'waste-segment';
            wasteSegment.style.width = (bar.waste / bar.length * 100) + '%';
            visual.appendChild(wasteSegment);
        }

        barDiv.appendChild(visual);

        const details = document.createElement('div');
        details.className = 'bar-details';
        details.innerHTML = `Wykorzystano: ${bar.length - bar.waste}mm | Odpad: ${bar.waste}mm (${(bar.waste / bar.length * 100).toFixed(1)}%)`;
        barDiv.appendChild(details);

        resultsContainer.appendChild(barDiv);
    });

    document.getElementById('resultsSection').style.display = 'block';

    // Statistics
    const statsContainer = document.getElementById('statisticsContainer');
    const totalLength = optimizationResults.bars.reduce((sum, bar) => sum + bar.length, 0);
    const utilization = (optimizationResults.totalUsed / totalLength * 100).toFixed(1);

    statsContainer.innerHTML = `
        <ul>
            <li><strong>Liczba użytych prętów:</strong> ${optimizationResults.totalBars}</li>
            <li><strong>Odpad całkowity:</strong> ${optimizationResults.totalWaste} mm</li>
            <li><strong>Wykorzystanie materiału:</strong> ${utilization}%</li>
        </ul>
    `;

    document.getElementById('statisticsSection').style.display = 'block';
}

// CSV Import/Export Functions
function importCSV() {
    document.getElementById('csvFileInput').click();
}

function handleCSVImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            const lines = content.split('\n').filter(line => line.trim());

            let mode = null;
            stockBars = [];
            elements = [];

            lines.forEach(line => {
                line = line.trim();

                // Sprawdź nagłówki (z przecinkiem lub bez) - arkusze często dodają przecinek
                if (line === 'STOCK_BARS' || line === 'STOCK_BARS,') {
                    mode = 'bars';
                    return; // Pomiń linię nagłówka
                } else if (line === 'CUT_ELEMENTS' || line === 'CUT_ELEMENTS,') {
                    mode = 'elements';
                    return; // Pomiń linię nagłówka
                }

                // Przetwarzaj dane tylko gdy jesteśmy w trybie bars lub elements
                if (mode && line && !line.startsWith('STOCK_BARS') && !line.startsWith('CUT_ELEMENTS')) {
                    // Usuń przecinek końcowy jeśli istnieje i rozdziel
                    const cleanLine = line.replace(/,\s*$/, ''); // Usuń końcowy przecinek
                    const parts = cleanLine.split(',').map(p => p.trim()).filter(p => p);

                    if (parts.length >= 2) {
                        const length = parseInt(parts[0]);
                        const quantity = parseInt(parts[1]);

                        if (!isNaN(length) && !isNaN(quantity) && length > 0 && quantity > 0) {
                            if (mode === 'bars') {
                                stockBars.push({ length, quantity, id: nextStockBarId++ });
                            } else if (mode === 'elements') {
                                elements.push({ length, quantity, id: nextElementId++ });
                            }
                        }
                    }
                }
            });

            if (stockBars.length === 0) {
                stockBars = [{ length: 2000, quantity: 10, id: nextStockBarId++ }];
            }

            renderStockBars();
            renderElements();
            hideResults();
            showRecalculationMessage();

            alert('Dane zostały zaimportowane z pliku CSV');
        } catch (error) {
            alert('Błąd podczas importu pliku CSV: ' + error.message);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function exportCSV() {
    let csvContent = 'STOCK_BARS,\n';
    stockBars.forEach(bar => {
        csvContent += `${bar.length},${bar.quantity}\n`;
    });

    csvContent += 'CUT_ELEMENTS,\n';
    elements.forEach(elem => {
        csvContent += `${elem.length},${elem.quantity}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'optymalizacja_ciecia.csv';
    link.click();
}

// PDF Export Function using jsPDF library
function exportPDF() {
    if (!optimizationResults) {
        alert('Najpierw wykonaj optymalizację, aby wygenerować PDF');
        return;
    }

    // Dynamicznie załaduj bibliotekę jsPDF jeśli jeszcze nie jest załadowana
    if (typeof window.jspdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => generatePDFDocument();
        document.head.appendChild(script);
    } else {
        generatePDFDocument();
    }
}

function generatePDFDocument() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const colors = [
        [59, 130, 246], [245, 158, 11], [34, 197, 94], [239, 68, 68],
        [147, 51, 234], [249, 115, 22], [236, 72, 153], [6, 182, 212]
    ];

    let yPos = 20;

    // Nagłówek
    doc.setFontSize(18);
    doc.setTextColor(33, 128, 141);
    doc.text('Plan Cięcia - Optymalizator dłużycy 1D', 105, yPos, { align: 'center' });

    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Data: ${new Date().toLocaleDateString('pl-PL')}`, 105, yPos, { align: 'center' });

    yPos += 15;

    // Elementy do rozcinania
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Elementy do rozcinania', 14, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setDrawColor(200);
    doc.setFillColor(240, 240, 240);
    doc.rect(14, yPos, 90, 7, 'F');
    doc.text('Długość (mm)', 16, yPos + 5);
    doc.text('Ilość', 70, yPos + 5);
    yPos += 7;

    stockBars.forEach(bar => {
        doc.setFillColor(255, 255, 255);
        doc.rect(14, yPos, 90, 6);
        doc.text(String(bar.length), 16, yPos + 4);
        doc.text(String(bar.quantity), 70, yPos + 4);
        yPos += 6;
    });

    yPos += 10;

    // Elementy do wycięcia
    doc.setFontSize(14);
    doc.text('Elementy do wycięcia', 14, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFillColor(240, 240, 240);
    doc.rect(14, yPos, 90, 7, 'F');
    doc.text('Długość (mm)', 16, yPos + 5);
    doc.text('Ilość (szt.)', 70, yPos + 5);
    yPos += 7;

    elements.forEach(elem => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFillColor(255, 255, 255);
        doc.rect(14, yPos, 90, 6);
        doc.text(String(elem.length), 16, yPos + 4);
        doc.text(String(elem.quantity), 70, yPos + 4);
        yPos += 6;
    });

    yPos += 10;

    // Plan cięcia
    doc.addPage();
    yPos = 20;

    doc.setFontSize(14);
    doc.text('Plan cięcia', 14, yPos);
    yPos += 10;

    optimizationResults.bars.forEach((bar, index) => {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        // Tytuł pręta
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`Pręt ${index + 1} (${bar.length}mm)`, 14, yPos);
        yPos += 6;

        // Cięcia tekstem
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Cięcia: ${bar.cuts.join(', ')}`, 14, yPos);
        yPos += 8;

        // Graficzna reprezentacja
        const barWidth = 180;
        const barHeight = 12;
        let xPos = 14;

        // Obramowanie pręta
        doc.setDrawColor(150);
        doc.rect(xPos, yPos, barWidth, barHeight);

        // Segmenty cięć
        bar.cuts.forEach((cut, cutIndex) => {
            const segmentWidth = (cut / bar.length) * barWidth;
            const color = colors[cutIndex % colors.length];

            doc.setFillColor(color[0], color[1], color[2]);
            doc.rect(xPos, yPos, segmentWidth, barHeight, 'F');

            // Linia oddzielająca
            if (cutIndex < bar.cuts.length - 1 || bar.waste > 0) {
                doc.setDrawColor(255);
                doc.setLineWidth(0.5);
                doc.line(xPos + segmentWidth, yPos, xPos + segmentWidth, yPos + barHeight);
            }

            // Tekst z rozmiarem
            if (segmentWidth > 15) {
                doc.setTextColor(255);
                doc.setFontSize(8);
                doc.text(cut + 'mm', xPos + segmentWidth / 2, yPos + barHeight / 2 + 2, { align: 'center' });
            }

            xPos += segmentWidth;
        });

        // Odpad (jeśli istnieje)
        if (bar.waste > 0) {
            const wasteWidth = (bar.waste / bar.length) * barWidth;
            doc.setFillColor(200, 200, 200);
            doc.rect(xPos, yPos, wasteWidth, barHeight, 'F');
        }

        yPos += barHeight + 5;

        // Szczegóły
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text(`Wykorzystano: ${bar.length - bar.waste}mm | Odpad: ${bar.waste}mm (${(bar.waste / bar.length * 100).toFixed(1)}%)`, 14, yPos);
        yPos += 12;
    });

    // Statystyki
    doc.addPage();
    yPos = 20;

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Statystyki', 14, yPos);
    yPos += 10;

    const totalLength = optimizationResults.bars.reduce((sum, bar) => sum + bar.length, 0);
    const utilization = (optimizationResults.totalUsed / totalLength * 100).toFixed(1);

    doc.setFontSize(11);
    doc.text(`Liczba użytych prętów: ${optimizationResults.totalBars}`, 14, yPos);
    yPos += 8;
    doc.text(`Odpad całkowity: ${optimizationResults.totalWaste} mm`, 14, yPos);
    yPos += 8;
    doc.text(`Wykorzystanie materiału: ${utilization}%`, 14, yPos);

    // Zapisz PDF
    doc.save('plan_ciecia.pdf');
}
