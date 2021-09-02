const SortModeNumber = 3
const w = 20
var msSleepingTime = 50

var canvas = " "
var tab = []
var SortModeIndex = 0
var h1 = ""

function setup() {
    //canv = createCanvas(1325,600)
    canv = createCanvas(windowWidth*0.95, windowHeight*0.95);
    canvas = document.getElementById('defaultCanvas0')
    canvas.style.border = "solid"
    canvas.style.position = "absolute"
    canvas.style.padding = "0"
    h1 = document.createElement("h1");
    document.body.appendChild(h1);
    updateTab()
    frameRate(1000);
}

function draw() {
    switch (SortModeIndex) {
        case 0:
            sort_insertion(tab)
            h1.innerHTML = "Sorted by Insertion"
            msSleepingTime = Math.floor(msSleepingTime/1)
            break;
        
        case 1:
            sort_selection(tab)
            h1.innerHTML = "Sorted by Selection"
            msSleepingTime = Math.floor(msSleepingTime/1)
            break;
        case 2:
            sort_bubble(tab)
            h1.innerHTML = "Sorted by Bubble"
            msSleepingTime = Math.floor(msSleepingTime/5)
            break;
    }
    clear();
    drawArray(tab)
    sleep(msSleepingTime)
}

function arraysEqual(a, b) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function drawArray(array) {
    for(i=0; i< array.length; i++) {
        h = array[i]*20
        x = i*w
        y=canvas.height
        fill(color(0, 0, 0));
        strokeWeight(2);
        stroke(51);
        rect(x, y, w, -h)
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function changeSortMode() {
    SortModeIndex = Math.floor(Math.random()*SortModeNumber);
}

function updateTab() {
    tab = Array.from({length: canvas.width/w}, () => {
        return Math.floor(Math.random() * 29) + 1;
    })
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
    if(arraysEqual(array, justsort(temp))) {
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
        if(!arraysEqual(res, array)) return array
    }
    return array
}

function sort_insertion(array) {
    const res = array.slice()
    temp = array.slice()
    if(arraysEqual(array, justsort(temp))) {
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
        if(!arraysEqual(res, array)) return array
    }
    return array
}

function sort_bubble(array){
    const res = array.slice()
    temp = array.slice()
    if(arraysEqual(array, justsort(temp))) {
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
            if(!arraysEqual(res, array)) return array
        }
    }
    return array;
}