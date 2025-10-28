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
    
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const depth = parseInt(document.getElementById('optimizationDepth').value);
    optimizationResults = await optimizeCutting(depth);
    
    finishCalculation();
    displayResults();
}

async function optimizeCutting(maxDepth) {
    let elementsToPlace = [];
    elements.forEach(elem => {
        for (let i = 0; i < elem.quantity; i++) {
            elementsToPlace.push(elem.length);
        }
    });
    
    elementsToPlace.sort((a, b) => b - a);
    
    let availableBars = stockBars.map(bar => ({ ...bar }));
    let usedBars = [];
    let totalIterations = 0;
    let currentIteration = 0;
    
    while (elementsToPlace.length > 0) {
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
        
        if (bestBarIndex === -1) {
            alert('Brak dostępnych prętów! Dodaj więcej prętów lub zwiększ ich ilość.');
            return null;
        }
        
        const barLength = availableBars[bestBarIndex].length;
        availableBars[bestBarIndex].quantity--;
        
        let currentBar = {
            length: barLength,
            cuts: [],
            waste: barLength
        };
        
        let remainingSpace = barLength;
        
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
            
            const progress = Math.min(95, ((elements.reduce((sum, e) => sum + e.quantity, 0) - elementsToPlace.length) / 
                                          elements.reduce((sum, e) => sum + e.quantity, 0)) * 100);
            updateProgress(progress);
            
            await new Promise(resolve => setTimeout(resolve, 0));
        }
        
        currentBar.waste = remainingSpace;
        currentBar.cuts.sort((a, b) => b - a);
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

// CSV Import/Export
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

// PDF Export Function using jsPDF with html2canvas
function exportPDF() {
    if (!optimizationResults) {
        alert('Najpierw wykonaj optymalizację, aby wygenerować PDF');
        return;
    }
    
    loadPDFLibraries().then(() => {
        generatePDFFromHTML();
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

async function generatePDFFromHTML() {
    const { jsPDF } = window.jspdf;
    
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '800px';
    container.style.padding = '20px';
    container.style.background = 'white';
    container.style.fontFamily = 'Arial, sans-serif';
    
    const colors = [
        '#3b82f6', '#f59e0b', '#22c55e', '#ef4444', 
        '#9333ea', '#f97316', '#ec4899', '#06b6d4'
    ];
    
    let html = `
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #21808d; margin: 0 0 10px 0; font-size: 28px; font-weight: bold;">
                Plan Cięcia - Optymalizator dłużycy 1D
            </h1>
            <p style="color: #666; margin: 0; font-size: 14px;">
                Data: ${new Date().toLocaleDateString('pl-PL', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}
            </p>
        </div>
    `;
    
    html += `
        <div style="margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 20px; border-bottom: 3px solid #21808d; padding-bottom: 8px; margin-bottom: 15px; font-weight: bold;">
                Elementy do rozcinania
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                <thead>
                    <tr style="background: #21808d; color: white;">
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 14px;">Długość (mm)</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 14px;">Ilość</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    stockBars.forEach((bar, idx) => {
        const bgColor = idx % 2 === 0 ? '#f9f9f9' : '#ffffff';
        html += `
            <tr style="background: ${bgColor};">
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">${bar.length}</td>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">${bar.quantity}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    html += `
        <div style="margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 20px; border-bottom: 3px solid #21808d; padding-bottom: 8px; margin-bottom: 15px; font-weight: bold;">
                Elementy do wycięcia
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                <thead>
                    <tr style="background: #21808d; color: white;">
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 14px;">Długość (mm)</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 14px;">Ilość (szt.)</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    elements.forEach((elem, idx) => {
        const bgColor = idx % 2 === 0 ? '#f9f9f9' : '#ffffff';
        html += `
            <tr style="background: ${bgColor};">
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">${elem.length}</td>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">${elem.quantity}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
    document.body.appendChild(container);
    
    const canvas1 = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    });
    
    document.body.removeChild(container);
    
    const container2 = document.createElement('div');
    container2.style.position = 'absolute';
    container2.style.left = '-9999px';
    container2.style.width = '800px';
    container2.style.padding = '20px';
    container2.style.background = 'white';
    container2.style.fontFamily = 'Arial, sans-serif';
    
    let html2 = `
        <div style="margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 20px; border-bottom: 3px solid #21808d; padding-bottom: 8px; margin-bottom: 20px; font-weight: bold;">
                Plan cięcia
            </h2>
        </div>
    `;
    
    optimizationResults.bars.forEach((bar, index) => {
        html2 += `
            <div style="margin-bottom: 25px; padding: 15px; border: 2px solid #ddd; border-radius: 8px; background: #f9f9f9;">
                <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold; color: #21808d;">
                    Pręt ${index + 1} (${bar.length}mm)
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #555;">
                    <strong>Cięcia:</strong> ${bar.cuts.join(', ')}
                </p>
                <div style="width: 100%; height: 50px; background: #e5e5e5; display: flex; border-radius: 6px; overflow: hidden; margin-bottom: 10px; border: 1px solid #ccc;">
        `;
        
        bar.cuts.forEach((cut, cutIndex) => {
            const width = (cut / bar.length * 100).toFixed(2);
            const color = colors[cutIndex % colors.length];
            html2 += `
                <div style="width: ${width}%; height: 100%; background: ${color}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 13px; border-right: 2px solid white; box-sizing: border-box;">
                    ${cut}mm
                </div>
            `;
        });
        
        if (bar.waste > 0) {
            const wasteWidth = (bar.waste / bar.length * 100).toFixed(2);
            html2 += `
                <div style="width: ${wasteWidth}%; height: 100%; background: #ccc; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #666;">
                    odpad
                </div>
            `;
        }
        
        html2 += `
                </div>
                <p style="margin: 0; font-size: 12px; color: #666;">
                    ✓ Wykorzystano: <strong>${bar.length - bar.waste}mm</strong> | 
                    ✗ Odpad: <strong>${bar.waste}mm (${(bar.waste / bar.length * 100).toFixed(1)}%)</strong>
                </p>
            </div>
        `;
    });
    
    container2.innerHTML = html2;
    document.body.appendChild(container2);
    
    const canvas2 = await html2canvas(container2, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    });
    
    document.body.removeChild(container2);
    
    const container3 = document.createElement('div');
    container3.style.position = 'absolute';
    container3.style.left = '-9999px';
    container3.style.width = '800px';
    container3.style.padding = '20px';
    container3.style.background = 'white';
    container3.style.fontFamily = 'Arial, sans-serif';
    
    const totalLength = optimizationResults.bars.reduce((sum, bar) => sum + bar.length, 0);
    const utilization = (optimizationResults.totalUsed / totalLength * 100).toFixed(1);
    
    let html3 = `
        <div style="margin-top: 40px;">
            <h2 style="color: #333; font-size: 20px; border-bottom: 3px solid #21808d; padding-bottom: 8px; margin-bottom: 20px; font-weight: bold;">
                Statystyki
            </h2>
            <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 25px; border-radius: 10px; border: 2px solid #21808d;">
                <div style="margin-bottom: 15px; font-size: 15px;">
                    <strong style="color: #21808d;">📊 Liczba użytych prętów:</strong> 
                    <span style="font-size: 18px; font-weight: bold;">${optimizationResults.totalBars}</span>
                </div>
                <div style="margin-bottom: 15px; font-size: 15px;">
                    <strong style="color: #21808d;">📏 Odpad całkowity:</strong> 
                    <span style="font-size: 18px; font-weight: bold;">${optimizationResults.totalWaste} mm</span>
                </div>
                <div style="font-size: 15px;">
                    <strong style="color: #21808d;">✅ Wykorzystanie materiału:</strong> 
                    <span style="font-size: 18px; font-weight: bold; color: #22c55e;">${utilization}%</span>
                </div>
            </div>
        </div>
    `;
    
    container3.innerHTML = html3;
    document.body.appendChild(container3);
    
    const canvas3 = await html2canvas(container3, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    });
    
    document.body.removeChild(container3);
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const img1 = canvas1.toDataURL('image/png');
    const imgHeight1 = (canvas1.height * pageWidth) / canvas1.width;
    pdf.addImage(img1, 'PNG', 0, 0, pageWidth, Math.min(imgHeight1, pageHeight));
    
    pdf.addPage();
    const img2 = canvas2.toDataURL('image/png');
    const imgHeight2 = (canvas2.height * pageWidth) / canvas2.width;
    
    if (imgHeight2 <= pageHeight) {
        pdf.addImage(img2, 'PNG', 0, 0, pageWidth, imgHeight2);
    } else {
        let currentY = 0;
        let remainingHeight = imgHeight2;
        
        while (remainingHeight > 0) {
            if (currentY > 0) {
                pdf.addPage();
            }
            
            const heightToAdd = Math.min(pageHeight, remainingHeight);
            const sourceY = (currentY / imgHeight2) * canvas2.height;
            const sourceHeight = (heightToAdd / imgHeight2) * canvas2.height;
            
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas2.width;
            tempCanvas.height = sourceHeight;
            const tempCtx = tempCanvas.getContext('2d');
            
            tempCtx.drawImage(canvas2, 0, sourceY, canvas2.width, sourceHeight, 0, 0, canvas2.width, sourceHeight);
            
            const tempImg = tempCanvas.toDataURL('image/png');
            pdf.addImage(tempImg, 'PNG', 0, 0, pageWidth, heightToAdd);
            
            currentY += heightToAdd;
            remainingHeight -= heightToAdd;
        }
    }
    
    pdf.addPage();
    const img3 = canvas3.toDataURL('image/png');
    const imgHeight3 = (canvas3.height * pageWidth) / canvas3.width;
    pdf.addImage(img3, 'PNG', 0, 0, pageWidth, Math.min(imgHeight3, pageHeight));
    
    pdf.save('plan_ciecia.pdf');
    
    alert('PDF został wygenerowany i pobrany!');
}