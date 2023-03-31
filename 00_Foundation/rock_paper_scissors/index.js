var round_num = 5;
var scores = {computer_score: 0, user_score: 0}
const round = document.getElementById("round-num");
const annoucement = document.getElementById("annoucement")

const playGame = event => {
  if (round_num <= 0)return;
  round_num--;
  round.innerHTML = round_num;

  const user_choice = event.target.dataset.type; 
  const computer_choice = ['rock', 'paper', 'scissor'][Math.floor(Math.random()*3)]
 
  if( user_choice === computer_choice ){
    document.getElementById("annoucement").innerHTML= 'Even'
  }
  else if(user_choice === 'rock'){
    if(computer_choice === 'scissor'){
      document.getElementById("annoucement").innerHTML= `Computer chose ${computer_choice}, user wins`
      scores.user_score++
    }else{
      document.getElementById("annoucement").innerHTML= `Computer chose ${computer_choice}, computer wins`
      scores.computer_score++
    }
  }
  else if( user_choice == 'paper'){
    if( computer_choice == 'scissor'){
      document.getElementById("annoucement").innerHTML= `Computer chose ${computer_choice}, computer wins`
      scores.computer_score++
    }else{
      document.getElementById("annoucement").innerHTML= `Computer chose ${computer_choice}, user wins`
      scores.user_score++
    }
  }else{ //user chose scissor
    if(computer_choice == 'rock'){
      document.getElementById("annoucement").innerHTML= `Computer chose ${computer_choice}, computer wins`
      scores.computer_score++
    }else{
      document.getElementById("annoucement").innerHTML= `Computer chose ${computer_choice}, user wins`
      scores.user_score++;
    }
  }

  // change figure of user and computer choice
  displayChoice(user_choice,computer_choice)
  document.getElementById("user-score").innerHTML = scores.user_score;
  document.getElementById("computer-score").innerHTML = scores.computer_score;

  if ( round_num === 0){
    if( scores.computer_score > scores.user_score){
      annoucement.innerHTML= 'Computer wins'
    }else if(scores.computer_score > scores.user_score){
      annoucement.innerHTML= 'User wins'
    }else{
      annoucement.innerHTML= 'Even'
    }
    annoucement.style.color = '#dc2626'
  }
 
}

const displayChoice = (user_choice, computer_choice) => {
  document.getElementById("computer-choice").src = `images/${computer_choice}.jpg`
  document.getElementById("user-choice").src = `images/${user_choice}.jpg`
}


// when user play
const choices = Array.from(document.querySelectorAll(".choice"));
choices.forEach(choice => choice.addEventListener('click', playGame))


// when user hit reset
const reset_button = document.getElementById('reset-btn');

reset_button.addEventListener('click', event => {
  scores = {computer_score: 0, user_score: 0}
  round_num = 5;
  round.innerHTML = round_num;
  annoucement.style.color = "#a16207"
  annoucement.innerHTML= ''
  document.getElementById("user-score").innerHTML = scores.user_score;
  document.getElementById("computer-score").innerHTML = scores.computer_score;

  document.getElementById("computer-choice").src = "images/rock.jpg"
  document.getElementById("user-choice").src = "images/rock.jpg"
})


