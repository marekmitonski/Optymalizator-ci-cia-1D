// ========================================
// DATA STORAGE
// ========================================

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


// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderStockBars();
    renderElements();
    setupEventListeners();
}

function setupEventListeners() {
    const depthSlider = document.getElementById('optimizationDepth');
    depthSlider.addEventListener('input', (e) => {
        document.getElementById('depthValue').textContent = e.target.value;
    });
}


// ========================================
// UI RENDERING
// ========================================

function renderStockBars() {
    const tbody = document.getElementById('stockBarsBody');
    tbody.innerHTML = '';
    
    stockBars.forEach((bar, index) => {
        const tr = createStockBarRow(bar, index);
        tbody.appendChild(tr);
    });
    
    const addRow = createAddStockBarRow();
    tbody.appendChild(addRow);
}

function createStockBarRow(bar, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="number" value="${bar.length}" 
            onblur="updateStockBar(${index}, 'length', this.value)" 
            onkeypress="if(event.key==='Enter') this.blur()" 
            onfocus="onInputFocus()">
        </td>
        <td><input type="number" value="${bar.quantity}" 
            onblur="updateStockBar(${index}, 'quantity', this.value)" 
            onkeypress="if(event.key==='Enter') this.blur()" 
            onfocus="onInputFocus()">
        </td>
        <td class="actions">
            <button class="icon-btn remove-btn" onclick="removeStockBar(${index})" title="Usuń">
                ${getTrashIconSVG()}
            </button>
        </td>
    `;
    return tr;
}

function createAddStockBarRow() {
    const tr = document.createElement('tr');
    tr.className = 'add-row';
    tr.innerHTML = `
        <td><input type="number" id="newBarLength" placeholder="Długość (mm)" onfocus="onInputFocus()"></td>
        <td><input type="number" id="newBarQuantity" placeholder="Ilość" value="1" onfocus="onInputFocus()"></td>
        <td class="actions">
            <button class="icon-btn add-btn" onclick="addStockBar()" title="Dodaj pręt">
                ${getPlusIconSVG()}
            </button>
        </td>
    `;
    return tr;
}

function renderElements() {
    const tbody = document.getElementById('elementsBody');
    tbody.innerHTML = '';
    
    elements.forEach((elem, index) => {
        const tr = createElementRow(elem, index);
        tbody.appendChild(tr);
    });
    
    const addRow = createAddElementRow();
    tbody.appendChild(addRow);
}

function createElementRow(elem, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="number" value="${elem.length}" 
            onblur="updateElement(${index}, 'length', this.value)" 
            onkeypress="if(event.key==='Enter') this.blur()" 
            onfocus="onInputFocus()">
        </td>
        <td><input type="number" value="${elem.quantity}" 
            onblur="updateElement(${index}, 'quantity', this.value)" 
            onkeypress="if(event.key==='Enter') this.blur()" 
            onfocus="onInputFocus()">
        </td>
        <td class="actions">
            <button class="icon-btn remove-btn" onclick="removeElement(${index})" title="Usuń">
                ${getTrashIconSVG()}
            </button>
        </td>
    `;
    return tr;
}

function createAddElementRow() {
    const tr = document.createElement('tr');
    tr.className = 'add-row';
    tr.innerHTML = `
        <td><input type="number" id="newElementLength" placeholder="Długość (mm)" onfocus="onInputFocus()"></td>
        <td><input type="number" id="newElementQuantity" placeholder="Ilość" onfocus="onInputFocus()"></td>
        <td class="actions">
            <button class="icon-btn add-btn" onclick="addElement()" title="Dodaj element">
                ${getPlusIconSVG()}
            </button>
        </td>
    `;
    return tr;
}


// ========================================
// CRUD OPERATIONS - STOCK BARS
// ========================================

function addStockBar() {
    const lengthInput = document.getElementById('newBarLength');
    const quantityInput = document.getElementById('newBarQuantity');
    
    const length = parseInt(lengthInput.value);
    const quantity = parseInt(quantityInput.value);
    
    if (!validateInput(length, quantity, 'pręta')) return;
    
    stockBars.push({ length, quantity, id: nextStockBarId++ });
    
    lengthInput.value = '';
    quantityInput.value = '1';
    
    renderStockBars();
    invalidateResults();
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
    invalidateResults();
}


// ========================================
// CRUD OPERATIONS - ELEMENTS
// ========================================

function addElement() {
    const lengthInput = document.getElementById('newElementLength');
    const quantityInput = document.getElementById('newElementQuantity');
    
    const length = parseInt(lengthInput.value);
    const quantity = parseInt(quantityInput.value);
    
    if (!validateInput(length, quantity, 'elementu')) return;
    
    elements.push({ length, quantity, id: nextElementId++ });
    
    lengthInput.value = '';
    quantityInput.value = '';
    
    renderElements();
    invalidateResults();
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
    invalidateResults();
}


// ========================================
// VALIDATION HELPERS
// ========================================

function validateInput(length, quantity, itemType) {
    if (!length || length <= 0) {
        alert(`Wprowadź prawidłową długość ${itemType}`);
        return false;
    }
    
    if (!quantity || quantity <= 0) {
        alert('Wprowadź prawidłową ilość');
        return false;
    }
    
    return true;
}


// ========================================
// UI STATE MANAGEMENT
// ========================================

function onInputFocus() {
    hideResults();
    showRecalculationMessage();
}

function invalidateResults() {
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


// ========================================
// PROGRESS BAR MANAGEMENT
// ========================================

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


// ========================================
// OPTIMIZATION ALGORITHM - MAIN
// ========================================

async function calculate() {
    if (!validateCalculationInputs()) return;
    
    hideRecalculationMessage();
    startCalculation();
    
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const depth = parseInt(document.getElementById('optimizationDepth').value);
    optimizationResults = await optimizeCutting(depth);
    
    finishCalculation();
    displayResults();
}

function validateCalculationInputs() {
    if (elements.length === 0) {
        alert('Brak elementów do cięcia');
        return false;
    }
    
    if (stockBars.length === 0) {
        alert('Brak prętów do rozcinania');
        return false;
    }
    
    return true;
}

async function optimizeCutting(maxDepth) {
    const elementsToPlace = prepareElementsToPlace();
    const availableBars = stockBars.map(bar => ({ ...bar }));
    const usedBars = [];
    
    let currentIteration = 0;
    let totalIterations = 0;
    
    while (elementsToPlace.length > 0) {
        const bestBarIndex = findBestBarForElements(elementsToPlace, availableBars);
        
        if (bestBarIndex === -1) {
            alert('Brak dostępnych prętów! Dodaj więcej prętów lub zwiększ ich ilość.');
            return null;
        }
        
        const currentBar = await processBar(
            availableBars[bestBarIndex],
            elementsToPlace,
            maxDepth,
            currentIteration,
            totalIterations
        );
        
        availableBars[bestBarIndex].quantity--;
        usedBars.push(currentBar);
        
        updateProgress(calculateProgress(elementsToPlace));
        await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    updateProgress(100);
    
    return calculateOptimizationResults(usedBars);
}


// ========================================
// OPTIMIZATION ALGORITHM - HELPERS
// ========================================

function prepareElementsToPlace() {
    const elementsToPlace = [];
    elements.forEach(elem => {
        for (let i = 0; i < elem.quantity; i++) {
            elementsToPlace.push(elem.length);
        }
    });
    return elementsToPlace.sort((a, b) => b - a);
}

function findBestBarForElements(elementsToPlace, availableBars) {
    let bestBarIndex = -1;
    let bestWaste = Infinity;
    
    for (let i = 0; i < availableBars.length; i++) {
        if (availableBars[i].quantity > 0) {
            const barLength = availableBars[i].length;
            const largestElement = elementsToPlace[0];
            
            if (largestElement <= barLength) {
                const estimatedWaste = barLength - largestElement;
                if (estimatedWaste < bestWaste) {
                    bestWaste = estimatedWaste;
                    bestBarIndex = i;
                }
            }
        }
    }
    
    return bestBarIndex;
}

async function processBar(bar, elementsToPlace, maxDepth, currentIteration, totalIterations) {
    const currentBar = {
        length: bar.length,
        cuts: [],
        waste: bar.length
    };
    
    let remainingSpace = bar.length;
    
    while (remainingSpace > 0 && elementsToPlace.length > 0) {
        const bestFit = await findBestFitCombination(
            remainingSpace,
            elementsToPlace,
            maxDepth,
            currentIteration,
            totalIterations
        );
        
        if (!bestFit || bestFit.length === 0) break;
        
        bestFit.forEach(length => {
            currentBar.cuts.push(length);
            remainingSpace -= length;
            const index = elementsToPlace.indexOf(length);
            if (index > -1) {
                elementsToPlace.splice(index, 1);
            }
        });
        
        currentIteration += bestFit.length * 10;
    }
    
    currentBar.waste = remainingSpace;
    currentBar.cuts.sort((a, b) => b - a);
    
    return currentBar;
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

function calculateProgress(elementsToPlace) {
    const totalElements = elements.reduce((sum, e) => sum + e.quantity, 0);
    const remaining = elementsToPlace.length;
    return Math.min(95, ((totalElements - remaining) / totalElements) * 100);
}

function calculateOptimizationResults(usedBars) {
    return {
        bars: usedBars,
        totalBars: usedBars.length,
        totalWaste: usedBars.reduce((sum, bar) => sum + bar.waste, 0),
        totalUsed: usedBars.reduce((sum, bar) => bar.length - bar.waste, 0)
    };
}


// ========================================
// RESULTS DISPLAY
// ========================================

function displayResults() {
    if (!optimizationResults) return;
    
    displayBarResults();
    displayStatistics();
    
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('statisticsSection').style.display = 'block';
}

function displayBarResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    
    const colors = getColorPalette();
    
    optimizationResults.bars.forEach((bar, index) => {
        const barDiv = createBarResultElement(bar, index, colors);
        resultsContainer.appendChild(barDiv);
    });
}

function createBarResultElement(bar, index, colors) {
    const barDiv = document.createElement('div');
    barDiv.className = 'bar-result';
    
    const title = document.createElement('div');
    title.className = 'bar-title';
    title.textContent = `Pręt ${index + 1} (${bar.length}mm): ${bar.cuts.join(', ')}`;
    barDiv.appendChild(title);
    
    const visual = createBarVisual(bar, colors);
    barDiv.appendChild(visual);
    
    const details = createBarDetails(bar);
    barDiv.appendChild(details);
    
    return barDiv;
}

function createBarVisual(bar, colors) {
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
    
    return visual;
}

function createBarDetails(bar) {
    const details = document.createElement('div');
    details.className = 'bar-details';
    details.innerHTML = `Wykorzystano: ${bar.length - bar.waste}mm | Odpad: ${bar.waste}mm (${(bar.waste / bar.length * 100).toFixed(1)}%)`;
    return details;
}

function displayStatistics() {
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
}


// ========================================
// CSV IMPORT/EXPORT
// ========================================

function importCSV() {
    document.getElementById('csvFileInput').click();
}

function handleCSVImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = parseCSVContent(e.target.result);
            applyImportedData(data);
            alert('Dane zostały zaimportowane z pliku CSV');
        } catch (error) {
            alert('Błąd podczas importu pliku CSV: ' + error.message);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function parseCSVContent(content) {
    const lines = content.split('\n').filter(line => line.trim());
    let mode = null;
    const importedStockBars = [];
    const importedElements = [];
    
    lines.forEach(line => {
        line = line.trim();
        
        if (line === 'STOCK_BARS' || line === 'STOCK_BARS,') {
            mode = 'bars';
            return;
        } else if (line === 'CUT_ELEMENTS' || line === 'CUT_ELEMENTS,') {
            mode = 'elements';
            return;
        }
        
        if (mode && line && !line.startsWith('STOCK_BARS') && !line.startsWith('CUT_ELEMENTS')) {
            const cleanLine = line.replace(/,\s*$/, '');
            const parts = cleanLine.split(',').map(p => p.trim()).filter(p => p);
            
            if (parts.length >= 2) {
                const length = parseInt(parts[0]);
                const quantity = parseInt(parts[1]);
                
                if (!isNaN(length) && !isNaN(quantity) && length > 0 && quantity > 0) {
                    if (mode === 'bars') {
                        importedStockBars.push({ length, quantity, id: nextStockBarId++ });
                    } else if (mode === 'elements') {
                        importedElements.push({ length, quantity, id: nextElementId++ });
                    }
                }
            }
        }
    });
    
    return { stockBars: importedStockBars, elements: importedElements };
}

function applyImportedData(data) {
    stockBars = data.stockBars.length > 0 ? data.stockBars : [{ length: 2000, quantity: 10, id: nextStockBarId++ }];
    elements = data.elements;
    
    renderStockBars();
    renderElements();
    invalidateResults();
}

function exportCSV() {
    const csvContent = generateCSVContent();
    downloadCSV(csvContent, 'optymalizacja_ciecia.csv');
}

function generateCSVContent() {
    let csvContent = 'STOCK_BARS,\n';
    stockBars.forEach(bar => {
        csvContent += `${bar.length},${bar.quantity}\n`;
    });
    
    csvContent += 'CUT_ELEMENTS,\n';
    elements.forEach(elem => {
        csvContent += `${elem.length},${elem.quantity}\n`;
    });
    
    return csvContent;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}


// ========================================
// PDF EXPORT - MAIN
// ========================================

function exportPDF() {
    if (!optimizationResults) {
        alert('Najpierw wykonaj optymalizację, aby wygenerować PDF');
        return;
    }
    
    loadPDFLibraries().then(() => {
        generateSmartPDF();
    });
}

function loadPDFLibraries() {
    return new Promise((resolve) => {
        let scriptsLoaded = 0;
        const scriptsNeeded = 2;
        
        const checkAllLoaded = () => {
            scriptsLoaded++;
            if (scriptsLoaded === scriptsNeeded) {
                resolve();
            }
        };
        
        if (typeof html2canvas === 'undefined') {
            const script1 = document.createElement('script');
            script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script1.onload = checkAllLoaded;
            document.head.appendChild(script1);
        } else {
            checkAllLoaded();
        }
        
        if (typeof window.jspdf === 'undefined') {
            const script2 = document.createElement('script');
            script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script2.onload = checkAllLoaded;
            document.head.appendChild(script2);
        } else {
            checkAllLoaded();
        }
    });
}


// ========================================
// PDF EXPORT - GENERATION
// ========================================

async function generateSmartPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const config = getPDFConfig(pdf);
    const colors = getColorPalette();
    
    let currentY = await addPDFHeader(pdf, config);
    currentY = await addPDFBars(pdf, config, colors, currentY);
    await addPDFStatistics(pdf, config, currentY);
    
    pdf.save('plan_ciecia.pdf');
    alert('PDF został wygenerowany i pobrany!');
}

function getPDFConfig(pdf) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    return {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
        pageWidth,
        pageHeight,
        contentWidth: pageWidth,
        usableHeight: pageHeight - 20
    };
}

async function addPDFHeader(pdf, config) {
    const headerHTML = generateHeaderHTML();
    const headerCanvas = await renderHTMLToCanvas(headerHTML);
    const headerImgHeight = (headerCanvas.height * config.contentWidth) / headerCanvas.width;
    
    const headerImg = headerCanvas.toDataURL('image/jpeg', 0.85);
    pdf.addImage(headerImg, 'JPEG', config.marginLeft, config.marginTop, config.contentWidth, headerImgHeight);
    
    return config.marginTop + headerImgHeight;
}

async function addPDFBars(pdf, config, colors, startY) {
    let currentY = startY;
    
    for (let i = 0; i < optimizationResults.bars.length; i++) {
        const bar = optimizationResults.bars[i];
        const barHTML = generateBarHTML(bar, i, colors);
        const barCanvas = await renderHTMLToCanvas(barHTML);
        const barImgHeight = (barCanvas.height * config.contentWidth) / barCanvas.width;
        
        if (currentY + barImgHeight + 20 > config.marginTop + config.usableHeight) {
            pdf.addPage();
            currentY = config.marginTop;
        }
        
        const barImg = barCanvas.toDataURL('image/jpeg', 0.85);
        pdf.addImage(barImg, 'JPEG', config.marginLeft, currentY, config.contentWidth, barImgHeight);
        currentY += barImgHeight;
    }
    
    return currentY;
}

async function addPDFStatistics(pdf, config, startY) {
    const statsHTML = generateStatisticsHTML();
    const statsCanvas = await renderHTMLToCanvas(statsHTML);
    const statsImgHeight = (statsCanvas.height * config.contentWidth) / statsCanvas.width;
    
    let currentY = startY;
    
    if (currentY + statsImgHeight > config.marginTop + config.usableHeight) {
        pdf.addPage();
        currentY = config.marginTop;
    }
    
    const statsImg = statsCanvas.toDataURL('image/jpeg', 0.85);
    pdf.addImage(statsImg, 'JPEG', config.marginLeft, currentY, config.contentWidth, statsImgHeight);
}


// ========================================
// PDF EXPORT - HTML GENERATION
// ========================================

function generateHeaderHTML() {
    const tablesHTML = generateTablesHTML();
    
    return `
        <div style="text-align: center; margin-bottom: 15px;">
            <h1 style="color: #21808d; margin: 0 0 5px 0; font-size: 22px; font-weight: bold;">
                Plan Cięcia - Optymalizator dłużycy 1D
            </h1>
            <p style="color: #666; margin: 0; font-size: 11px;">
                ${new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>
        
        ${tablesHTML}
        
        <h2 style="color: #333; font-size: 14px; border-bottom: 2px solid #21808d; padding-bottom: 3px; margin-bottom: 10px; font-weight: bold;">
            Plan cięcia
        </h2>
    `;
}

function generateTablesHTML() {
    const stockBarsTable = generateStockBarsTable();
    const elementsTable = generateElementsTable();
    
    return `
        <div style="display: flex; gap: 15px; margin-bottom: 15px;">
            <div style="flex: 1;">
                <h2 style="color: #333; font-size: 14px; border-bottom: 2px solid #21808d; padding-bottom: 3px; margin-bottom: 8px; font-weight: bold;">
                    Elementy do rozcinania
                </h2>
                ${stockBarsTable}
            </div>
            
            <div style="flex: 1;">
                <h2 style="color: #333; font-size: 14px; border-bottom: 2px solid #21808d; padding-bottom: 3px; margin-bottom: 8px; font-weight: bold;">
                    Elementy do wycięcia
                </h2>
                ${elementsTable}
            </div>
        </div>
    `;
}

function generateStockBarsTable() {
    let rows = '';
    stockBars.forEach((bar, idx) => {
        const bgColor = idx % 2 === 0 ? '#f9f9f9' : '#ffffff';
        rows += `
            <tr style="background: ${bgColor};">
                <td style="border: 1px solid #ddd; padding: 3px;">${bar.length}mm</td>
                <td style="border: 1px solid #ddd; padding: 3px;">${bar.quantity}</td>
            </tr>
        `;
    });
    
    return `
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
            <thead>
                <tr style="background: #21808d; color: white;">
                    <th style="border: 1px solid #ddd; padding: 4px; text-align: left;">Długość</th>
                    <th style="border: 1px solid #ddd; padding: 4px; text-align: left;">Ilość</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function generateElementsTable() {
    let rows = '';
    elements.forEach((elem, idx) => {
        const bgColor = idx % 2 === 0 ? '#f9f9f9' : '#ffffff';
        rows += `
            <tr style="background: ${bgColor};">
                <td style="border: 1px solid #ddd; padding: 3px;">${elem.length}mm</td>
                <td style="border: 1px solid #ddd; padding: 3px;">${elem.quantity}</td>
            </tr>
        `;
    });
    
    return `
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
            <thead>
                <tr style="background: #21808d; color: white;">
                    <th style="border: 1px solid #ddd; padding: 4px; text-align: left;">Długość</th>
                    <th style="border: 1px solid #ddd; padding: 4px; text-align: left;">Ilość</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function generateBarHTML(bar, index, colors) {
    let cutsHTML = '';
    
    bar.cuts.forEach((cut, cutIndex) => {
        const width = (cut / bar.length * 100).toFixed(2);
        const color = colors[cutIndex % colors.length];
        cutsHTML += `
            <div style="width: ${width}%; height: 100%; background: ${color}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 9px; border-right: 1px solid white;">
                ${cut}mm
            </div>
        `;
    });
    
    if (bar.waste > 0) {
        const wasteWidth = (bar.waste / bar.length * 100).toFixed(2);
        cutsHTML += `<div style="width: ${wasteWidth}%; height: 100%; background: #ccc;"></div>`;
    }
    
    return `
        <div style="margin-bottom: 12px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background: #f9f9f9;">
            <div style="font-size: 11px; font-weight: bold; color: #21808d; margin-bottom: 5px;">
                Pręt ${index + 1} (${bar.length}mm): ${bar.cuts.join(', ')}
            </div>
            <div style="width: 100%; height: 30px; background: #e5e5e5; display: flex; border-radius: 3px; overflow: hidden; margin-bottom: 5px;">
                ${cutsHTML}
            </div>
            <div style="font-size: 9px; color: #666;">
                Wykorzystano: ${bar.length - bar.waste}mm | Odpad: ${bar.waste}mm (${(bar.waste / bar.length * 100).toFixed(1)}%)
            </div>
        </div>
    `;
}

function generateStatisticsHTML() {
    const totalLength = optimizationResults.bars.reduce((sum, bar) => sum + bar.length, 0);
    const utilization = (optimizationResults.totalUsed / totalLength * 100).toFixed(1);
    
    return `
        <div style="background: #f5f7fa; padding: 12px; border-radius: 6px; border: 2px solid #21808d; margin-top: 10px;">
            <h2 style="color: #333; font-size: 14px; margin: 0 0 8px 0; font-weight: bold;">Statystyki</h2>
            <div style="font-size: 11px; display: flex; gap: 20px;">
                <div><strong>Liczba prętów:</strong> ${optimizationResults.totalBars}</div>
                <div><strong>Odpad:</strong> ${optimizationResults.totalWaste}mm</div>
                <div><strong>Wykorzystanie:</strong> <span style="color: #22c55e; font-weight: bold;">${utilization}%</span></div>
            </div>
        </div>
    `;
}


// ========================================
// PDF EXPORT - RENDERING HELPERS
// ========================================

async function renderHTMLToCanvas(html) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '800px';
    container.style.padding = '15px';
    container.style.background = 'white';
    container.style.fontFamily = 'Arial, sans-serif';
    
    container.innerHTML = html;
    document.body.appendChild(container);
    
    const canvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    });
    
    document.body.removeChild(container);
    
    return canvas;
}


// ========================================
// UTILITY FUNCTIONS
// ========================================

function getColorPalette() {
    return [
        '#3b82f6', '#f59e0b', '#22c55e', '#ef4444', 
        '#9333ea', '#f97316', '#ec4899', '#06b6d4'
    ];
}

function getTrashIconSVG() {
    return `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    `;
}

function getPlusIconSVG() {
    return `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/>
        </svg>
    `;
}