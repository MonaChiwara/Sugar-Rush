// ==== TIMER ====

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
    display = document.querySelector('#timerOne');
  startTimer(time, display, function() { Swal.fire ('TIME UP, NEXT PLAYER'); });
};
  


const bigBox = document.querySelector('#maindiv')
const width = 6
const boxes = []
const scoreBoard = document.querySelector('#scoreOne')
let score = 0


const candy = [
    'red',
    'yellow',
    'blue',
    'green',
    'orange',
    'purple',
    'pink',
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
boxes.forEach(smallBox => smallBox.addEventListener('drop', dragDrop))

function dragStart(e){
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
    this.style.backgroundColor = ''
}

function dragDrop(e) {
    candyBeingReplaced = this.style.backgroundColor
    boxIdBeingReplaced = parseInt(this.id)
    this.style.backgroundColor = candyBeingDragged
    boxes[boxIdBeingDragged].style.backgroundColor = candyBeingReplaced
}


function dragEnd() {

}

// for row of Three
function checkRowForThree() {
  for (i = 0; i < 34; i ++) {
    let rowOfThree = [i, i+1, i+2]
    let decidedColor = boxes[i].style.backgroundColor
    const isBlank = boxes[i].style.backgroundColor === ''

    if(rowOfThree.every(index => boxes[index].style.backgroundColor === decidedColor && !isBlank)) {
      score += 3
      scoreBoard.innerHTML = score
      rowOfThree.forEach(index => {
      boxes[index].style.backgroundColor = ''
      })
    }
  }
}
checkRowForThree()

// for row of Three
function checkColumnForThree() {
  for (i = 0; i < 24; i ++) {
    let columnOfThree = [i, i+width, i+width*2]
    let decidedColor = boxes[i].style.backgroundColor
    const isBlank = boxes[i].style.backgroundColor === ''

   
    if(columnOfThree.every(index => boxes[index].style.backgroundColor === decidedColor && !isBlank)) {
      score += 3
      scoreBoard.innerHTML = score
      columnOfThree.forEach(index => {
      boxes[index].style.backgroundColor = ''
      })
    }
  }
}
checkColumnForThree()

window.setInterval(function(){
  checkRowForThree()
  checkColumnForThree()
  }, 100)






  

  



