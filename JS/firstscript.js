// // === START PAGE ===
// const instructions = document.querySelector('#instructions')

// instructions.addEventListener('click', displayInstructions)

// function displayInstructions(){
//   console.log('hi')
//   // Swal.fire ('Clear the candies by swiping the candies in any direction to create sets of 3 matching candies. Each player has 30 seconds. The player with the highest score, wins.')
// }



// ==== TIMER ====

function startTimer(duration, display, callback) {
  let timer = duration,
    minutes, seconds;

  let myInterval = setInterval(function() {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
      
      clearInterval(myInterval);

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
    'url(images/red.png)',
    'url(images/yellow.png)',
    'url(images/blue.png)',
    'url(images/green.png)',
    'url(images/orange.png)',
    'url(images/purple.png)',
    'url(images/pink.png)',
]




function gameBoard () {
    for (let i = 0; i < width*width; i++ ){
        const smallBox = document.createElement('div')
        smallBox.setAttribute('draggable', true)
        smallBox.setAttribute('id', i)
        let randomCandy = Math.floor(Math.random() * candy.length)
        smallBox.style.backgroundImage = candy[randomCandy]
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
    candyBeingDragged = this.style.backgroundImage
    boxIdBeingDragged = parseInt(this.id)
}

function dragOver(e) {
  e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {
    this.style.backgroundImage = ''
}

function dragDrop(e) {
    candyBeingReplaced = this.style.backgroundImage
    boxIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = candyBeingDragged
    boxes[boxIdBeingDragged].style.backgroundImage = candyBeingReplaced
}


function dragEnd() {

}

// for row of Three
function checkRowForThree() {
  for (i = 0; i < 34; i ++) {
    let rowOfThree = [i, i+1, i+2]
    let decidedColor = boxes[i].style.backgroundImage
    const isBlank = boxes[i].style.backgroundImage === ''

    if(rowOfThree.every(index => boxes[index].style.backgroundImage === decidedColor && !isBlank)) {
      score += 1
      scoreBoard.innerHTML = score
      rowOfThree.forEach(index => {
      boxes[index].style.backgroundImage = ''
      })
    }
  }
}
checkRowForThree()

// for row of Three
function checkColumnForThree() {
  for (i = 0; i < 24; i ++) {
    let columnOfThree = [i, i+width, i+width*2]
    let decidedColor = boxes[i].style.backgroundImage
    
    const isBlank = boxes[i].style.backgroundImage === ''

   
    if(columnOfThree.every(index => boxes[index].style.backgroundImage === decidedColor && !isBlank)) {
      score += 1
      scoreBoard.innerHTML = score
      columnOfThree.forEach(index => {
      boxes[index].style.backgroundImage = ''
      })
    }
  }
}
checkColumnForThree()

window.setInterval(function(){
  checkRowForThree()
  checkColumnForThree()
  }, 100)





  

  



