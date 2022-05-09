let firstPlayer = document.querySelector('#scoreOne')
let secondPlayer = document.querySelector('#scoreTwo')

if(firstPlayer > secondPlayer){
    Swal.fire ('Player 1 won')
}
else{
    Swal.fire ('Player 2 won')
}