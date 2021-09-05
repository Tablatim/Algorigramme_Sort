const SortModeNumber = 3 // 3 : Selection, Insertion, Bubble
const w = 10 //collums width => number of collumns
var msSleepingTime = 50
const collumnsColor = "rgb(51, 51, 51)"
const changedCollumnsColor = "rgb(255, 0, 0)"

// Global Var :
var canvas = " "
var tab = []
var SortModeIndex = 0
var h1 = ""
var speedSlider = ""
var resetBtn = ""

function setup() {
    canv = createCanvas(windowWidth*0.985, windowHeight*0.85);
        canvas = document.getElementById('defaultCanvas0')
        canvas.style.border = "solid"
        canvas.style.position = "absolute"
        canvas.style.padding = "0"
    main = document.querySelector('main')
    h1 = document.createElement("h1");
        h1.style.margin = "0"
        document.body.appendChild(h1);
    h1.after(main)
    speedSlider = document.createElement("input");
        speedSlider.type = "range"
        speedSlider.min = 0
        speedSlider.max = 200
        speedSlider.value = speedSlider.max - msSleepingTime
        speedSlider.setAttribute("oninput", "updateSleepingTime()");
        document.body.appendChild(speedSlider);
    speedSlider.after(main)
    resetBtn = document.createElement("input");
        resetBtn.type = "submit"
        resetBtn.value = "Reset speed (150)"
        resetBtn.style.display = "none"
        resetBtn.style.margin = 0
        resetBtn.setAttribute("onclick", "speedSlider.value = 150; msSleepingTime = 50");
        document.body.appendChild(resetBtn);
    resetBtn.after(main)
    updateTab()
    frameRate(1000);
}

// drawing method
function draw() {
    previousTab = tab.slice()
    if(msSleepingTime != 50) {
        resetBtn.style.display = ""
    } else {
        resetBtn.style.display = "none"
    }
    switch (SortModeIndex) {
        case 0:
            sort_insertion(tab)
            h1.innerHTML = `Sorted by <u>Insertion</u> (speed: ${speedSlider.max - msSleepingTime})`
            localMsSleepingTime = Math.floor(msSleepingTime/1)
            break;
        
        case 1:
            sort_selection(tab)
            h1.innerHTML = `Sorted by <u>Selection</u> (speed: ${speedSlider.max - msSleepingTime})`
            localMsSleepingTime = Math.floor(msSleepingTime/1)
            break;
        case 2:
            sort_bubble(tab)
            h1.innerHTML = `Sorted by <u>Bubble</u> (speed: ${speedSlider.max - msSleepingTime})`
            localMsSleepingTime = Math.floor(msSleepingTime/5)
            break;
    }
    clear();
    drawArray(tab, previousTab)
    sleep(localMsSleepingTime)
}

function drawArray(array, previousTab) {
    for(i=0; i< array.length; i++) {
        h = array[i]*20
        x = i*w
        y = canvas.height
        r = findDifferencesIndex(array, previousTab)
        if(r.includes(i)) {
            fill(changedCollumnsColor);
        } else {
            fill(collumnsColor);
        }
        strokeWeight(2);
        stroke(0);
        rect(x, y, w, -h)
    }
}

// update var

function updateSleepingTime() {
    msSleepingTime = speedSlider.max - speedSlider.value
}

function changeSortMode() {
    //SortModeIndex = Math.floor(Math.random()*SortModeNumber);
    SortModeIndex += 1
    SortModeIndex %= SortModeNumber
}

function updateTab() {
    tab = Array.from({length: canvas.width/w}, () => {
        return Math.floor(Math.random() * canvas.height/21) + 1;
    })
}

// usefull method / functions :

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function isArraysEqual(array1, array2) {
    for (var i = 0; i < array1.length; ++i) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
}

function findDifferencesIndex(array1, array2) {
    r = []
    for(m=0; m<array1.length; m++) {
        if(array1[m] != array2[m]){
            r.push(m)
        }
    }
    return r
}

// Sorting algorithms :

function justsort(array) {
    for(var i = 0; i < array.length; i++){
        var min = i; 
        for(var j = i+1; j < array.length; j++){
            if(array[j] < array[min]){
                min = j; 
            }
        }
        var tmp = array[i];
        array[i] = array[min];
        array[min] = tmp;
    }
    return array;
}

function sort_selection(array) {
    const res = array.slice()
    temp = array.slice()
    if(isArraysEqual(array, justsort(temp))) {
        updateTab()
        changeSortMode()
        sleep(msSleepingTime*4)
        return tab
    }
    for(var i = 0; i < array.length; i++){
        var min = i; 
        for(var j = i+1; j < array.length; j++){
            if(array[j] < array[min]){
                min = j;
            }
        }
        var tmp = array[i];
        array[i] = array[min];
        array[min] = tmp;
        if(!isArraysEqual(res, array)) return array
    }
    return array
}

function sort_insertion(array) {
    const res = array.slice()
    temp = array.slice()
    if(isArraysEqual(array, justsort(temp))) {
        updateTab()
        changeSortMode()
        sleep(msSleepingTime*4)
        return tab
    }
    var len = array.length;       
    var tmp, i, j;                  
    
    for(i = 1; i < len; i++) {
        tmp = array[i]
        j = i - 1
        while (j >= 0 && array[j] > tmp) {
            array[j+1] = array[j]
            j--
        }
        array[j+1] = tmp
        if(!isArraysEqual(res, array)) return array
    }
    return array
}

function sort_bubble(array){
    const res = array.slice()
    temp = array.slice()
    if(isArraysEqual(array, justsort(temp))) {
        updateTab()
        changeSortMode()
        sleep(msSleepingTime*4)
        return tab
    }
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (array[j] > array[j + 1]) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
            if(!isArraysEqual(res, array)) return array
        }
    }
    return array;
}
