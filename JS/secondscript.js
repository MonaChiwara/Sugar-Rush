const bigBox = document.querySelector('#maindiv')
console.log('idk whats going on')
const width = 6
const boxes = []

const candy = [
    'red',
    'yellow',
    'blue',
    'green',
    'orange'
]

function gameBoard () {
    for (let i = 0; i < width*width; i++ ){
        const smallBox = document.createElement('div')
        smallBox.setAttribute('draggable', true)
        smallBox.setAttribute('id', i)
        let randomCandy = Math.floor(Math.random() * candy.length)
        smallBox.style.backgroundColor = candy[randomCandy]
        bigBox.appendChild(smallBox)
        boxes.push(smallBox)
    }
}

gameBoard()

let candyBeingDragged
let candyBeingReplaced
let boxIdBeingDragged
let boxIdBeingReplaced

boxes.forEach(smallBox => smallBox.addEventListener('dragstart', dragStart))
boxes.forEach(smallBox => smallBox.addEventListener('dragend', dragEnd))
boxes.forEach(smallBox => smallBox.addEventListener('dragover', dragOver))
boxes.forEach(smallBox => smallBox.addEventListener('dragenter', dragEnter))
boxes.forEach(smallBox => smallBox.addEventListener('dragleave', dragLeave))
boxes.forEach(smallBox => smallBox.addEventListener('dragdrop', dragDrop))

function dragStart(){
    candyBeingDragged = this.style.backgroundColor
    boxIdBeingDragged = parseInt(this.id)
}


function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {
}

function dragDrop() {
    candyBeingReplaced = this.style.backgroundColor
    boxIdBeingReplaced = parseInt(this.id)
    boxes[boxIdBeingDragged].style.backgroundImage = candyBeingReplaced
}

function dragEnd(){


}





//timer
// const startingTime = 1
// let time = startingTime * 60


// const timer = document.querySelector('#timer')

// setInterval(updateTimer, 1000) 

// function updateTimer(){
//     const minutes = Math.floor (time/60)
//     let seconds = time % 60

//     seconds = seconds < 10 ? "0" + seconds : seconds

//     timer.innerHTML = `${minutes}: ${seconds}`

//     time --

//     if (time-- < 0) {
//         clearInterval(x)
//         document.querySelector('#timer').innerHTML = "GAME OVER"
//     }


// }    

function startTimer(duration, display, callback) {
    var timer = duration,
      minutes, seconds;
  
    var myInterval = setInterval(function() {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;
  
      if (--timer < 0) {
        timer = duration;
        
        // clear the interal
        clearInterval(myInterval);
  
        // use the callback
        if(callback) {
            callback();
        }
      }
    }, 1000);
  }
  
  window.onload = function() {
    let time = 30,
      display = document.querySelector('#timer');
    startTimer(time, display, function() { Swal.fire ('TIME UP'); });
  };
  
