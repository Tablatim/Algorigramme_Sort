const SortModeNumber = 3 // 3 : Selection, Insertion, Bubble
const w = 10 //collums width => number of collumns
const collumnsColor = "rgb(51, 51, 51)"
const changedCollumnsColor = "rgb(255, 0, 0)"
const constSleepingTime = 50
var doChangeAfter = true

// Global Var :
var wH, wW = 0
var msSleepingTime = constSleepingTime
var canvas = " "
var tab = []
var SortModeIndex = 0
var h1 = ""
var speedSlider = ""
var resetBtn = ""
var checkDoChangeAfter = ""

function setup() {
    canv = createCanvas(windowWidth*0.985, windowHeight*0.8);
        canvas = document.getElementById('defaultCanvas0')
        canvas.style.border = "solid"
        canvas.style.position = "absolute"
        canvas.style.padding = "0"
    main = document.querySelector('main')
    wH, wW = windowHeight, windowWidth
    main.style.textAlign = "initial"
    h1 = document.createElement("h1");
        h1.style.margin = "0"
        document.body.appendChild(h1);
    h1.after(main)
    labelSpeedSlider = document.createElement("label");
        labelSpeedSlider.for = "speedSlider"
        labelSpeedSlider.style.margin = "0px 0px 0px 10px"
        labelSpeedSlider.innerHTML = "Speed :"
    document.body.appendChild(labelSpeedSlider);
    speedSlider = document.createElement("input");
        speedSlider.type = "range"
        speedSlider.min = 0
        speedSlider.max = 200
        speedSlider.value = speedSlider.max - msSleepingTime
        speedSlider.setAttribute("id", "speedSlider");
        speedSlider.setAttribute("oninput", "updateSleepingTime()");
        document.body.appendChild(speedSlider);
    speedSlider.after(main)
    resetBtn = document.createElement("input");
        resetBtn.type = "submit"
        resetBtn.value = `Reset speed (${speedSlider.max - msSleepingTime})`
        resetBtn.style.display = "none"
        resetBtn.style.margin = 0
        resetBtn.setAttribute("onclick", `speedSlider.value = ${speedSlider.max - msSleepingTime}; msSleepingTime = ${constSleepingTime}`);
        document.body.appendChild(resetBtn);
    resetBtn.after(main)
    nextSortMode = document.createElement("input");
        nextSortMode.type = "submit"
        nextSortMode.value = `Next Sort Mode`
        nextSortMode.style.margin = 0
        nextSortMode.style.margin = 0
        nextSortMode.setAttribute("onclick", `changeSortMode()`);
        document.body.appendChild(nextSortMode);
    nextSortMode.after(main)
    labelCheckDoChangeAfter = document.createElement("label");
        labelCheckDoChangeAfter.for = "doChangeAfter"
        labelCheckDoChangeAfter.style.margin = "0px 0px 0px 10px"
        labelCheckDoChangeAfter.innerHTML = "| Change sorting mode after sorting :"
    document.body.appendChild(labelCheckDoChangeAfter);
    labelCheckDoChangeAfter.addEventListener('click', event => {
        doChangeAfter = !doChangeAfter
    })
    checkDoChangeAfter = document.createElement("input");
        checkDoChangeAfter.type = "checkbox"
        checkDoChangeAfter.label = `Next Sort Mode`
        checkDoChangeAfter.style.margin = "0px 0px 0px 8px"
        checkDoChangeAfter.style.padding = "10px"
        checkDoChangeAfter.checked = doChangeAfter
        checkDoChangeAfter.setAttribute("id", `doChangeAfter`);
        checkDoChangeAfter.setAttribute("onclick", `doChangeAfter = !doChangeAfter`);
        document.body.appendChild(checkDoChangeAfter);
    checkDoChangeAfter.after(main)
    h2 = document.createElement("h3");
        h2.style.margin = "0"
        h2.style.padding = "0"
        h2.innerHTML = "Space for pause, N key for next sort mode"
        document.body.appendChild(h2);
    h2.after(main)
    updateTab()
    frameRate(1000);
}

// drawing methods
function draw() {
    checkDoChangeAfter.checked = doChangeAfter
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
    SortModeIndex += 1
    SortModeIndex %= SortModeNumber
}

function updateTab() {
    tab = Array.from({length: canvas.width/w}, () => {
        return Math.floor(Math.random() * canvas.height/21) + 1;
    })
}

// useful methods / functions :
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

// Events :
document.addEventListener("keypress", function(event) {
    if (event.code == "Space") {
      alert('Pause, click "OK" or Space key to continue.');
    }else if (event.code === "KeyN") {
      changeSortMode()
    }
});

window.addEventListener('resize', function(event){
    resizeCanvas(windowWidth*0.985, windowHeight*0.8);
    if(wW > windowWidth)
        tab = tab.slice(0, canvas.width/w)
    else if(wW < windowWidth) {
        newlength = canvas.width/w
        for(i = tab.length; i<newlength; i++) {
            tab.push(Math.floor(Math.random() * canvas.height/21) + 1)
        }
    }
});



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
        if(doChangeAfter) changeSortMode()
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
        if(doChangeAfter) changeSortMode()
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
        if(doChangeAfter) changeSortMode()
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
