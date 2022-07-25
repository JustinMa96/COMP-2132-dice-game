/* Hide/Show  */
$('.list-play').hide();
$('.list-rules').hide();

$('.btn-play').click(function () {
    if ($(this).text() === "[Show]") {
        $(this).text('[Hide]');
        $('.list-play').slideToggle();
        return;
    }

    if ($(this).text() === "[Hide]") {
        $(this).text('[Show]');
        $('.list-play').slideToggle();
        return;        
    }    
})

$('.btn-rules').click(function () {
    if ($(this).text() === "[Show]") {
        $(this).text('[Hide]');
        $('.list-rules').slideToggle();
        return;
    }

    if ($(this).text() === "[Hide]") {
        $(this).text('[Show]');
        $('.list-rules').slideToggle();
        return;        
    }    
})

/* Dice Game */
/* Set Original Value */
var youDiceOneValue = 0;
var youDiceTwoValue = 0;
var oppoDiceOneValue = 0;
var oppoDiceTwoValue = 0;
var youRoundScore = 0;
var youTotalScore = 0;
var oppoRoundScore = 0;
var oppoTotalScore = 0;
var rollTimes = 0;

/* Roll dice version one */
/* $("#roll-dice").click(function () {
    $('.dice').css("visibility", "visible");
    $('.score').css("visibility", "visible");
    youDiceOneValue = Math.floor((Math.random() * 6) + 1);
    youDiceTwoValue = Math.floor((Math.random() * 6) + 1);
    const youDiceOneSrc = `images/dice-${youDiceOneValue}.svg`;
    $('#you-dice-1').attr("src", youDiceOneSrc);
    const youDiceTwoSrc = `images/dice-${youDiceTwoValue}.svg`;
    $('#you-dice-2').attr("src", youDiceTwoSrc);
    oppoDiceOneValue = Math.floor((Math.random() * 6) + 1);
    oppoDiceTwoValue = Math.floor((Math.random() * 6) + 1);
    const oppoDiceOneSrc = `images/dice-${oppoDiceOneValue}.svg`;
    $('#oppo-dice-1').attr("src", oppoDiceOneSrc);
    const oppoDiceTwoSrc = `images/dice-${oppoDiceTwoValue}.svg`;
    $('#oppo-dice-2').attr("src", oppoDiceTwoSrc);
    rollTimes++;
    getRoundScore();
    getTotalScore();
    if (rollTimes === 3) {
        getWinner();
        $(this).css("cursor", "not-allowed")
        $(this).prop('disabled',true)
    }
}) */

function getRoundScore() {
    if (youDiceOneValue === 1 || youDiceTwoValue === 1) {
        youRoundScore = 0;
    } else if (youDiceOneValue === youDiceTwoValue) {
        youRoundScore = youDiceOneValue * 4;
    } else {
        youRoundScore = youDiceOneValue + youDiceTwoValue;
    }
    $('#you-round-score').text(youRoundScore);

    if (oppoDiceOneValue === 1 || oppoDiceTwoValue === 1) {
        oppoRoundScore = 0;
    } else if (oppoDiceOneValue === oppoDiceTwoValue) {
        oppoRoundScore = oppoDiceOneValue * 4;
    } else {
        oppoRoundScore = oppoDiceOneValue + oppoDiceTwoValue;
    }
    $('#oppo-round-score').text(oppoRoundScore);
}

function getTotalScore() {
    youTotalScore = youTotalScore + youRoundScore;
    $('#you-total-score').text(youTotalScore);
    oppoTotalScore = oppoTotalScore + oppoRoundScore;
    $('#oppo-total-score').text(oppoTotalScore);

    
}

function getWinner() {
    if (youTotalScore < oppoTotalScore) {
        $('#pop-up p').text("Tough luck! You lost.");
        $('#pop-up').css("opacity", "100");
    } else if (youTotalScore > oppoTotalScore) {
        $('#pop-up p').text("Congratulations! You won!");
        $('#pop-up').css("opacity", "100");
    } else {
        $('#pop-up p').text("Same Score! Try again!");
        $('#pop-up').css("opacity", "100");
    }
}

$("#btn-close").click(function () {
    $('#pop-up').css("opacity", "0");
})

$("#btn-okay").click(function () {
    $('#pop-up').css("opacity", "0");
})

$("#new-game").click(function () {
    $('.dice').css("visibility", "hidden");
    $('.score').css("visibility", "hidden");
    $("#roll-dice").css("cursor", "pointer")
    $("#roll-dice").prop('disabled', false)
    $("#stop-dice").css("cursor", "pointer")
    $("#stop-dice").prop('disabled', false)
    $("#stop-dice").css("display", "none")
    $('#pop-up').css("opacity", "0");
    
    youDiceOneValue = 0;
    youDiceTwoValue = 0;
    oppoDiceOneValue = 0;
    oppoDiceTwoValue = 0;
    youRoundScore = 0;
    youTotalScore = 0;
    oppoRoundScore = 0;
    oppoTotalScore = 0;
    rollTimes = 0; 
    $('#you-round-score').text(youRoundScore);
    $('#you-total-score').text(youTotalScore);
    $('#oppo-total-score').text(oppoRoundScore);
    $('#oppo-total-score').text(oppoTotalScore);
    
})


/* Roll Dice version 2 (Animation Rolling) */
const rollDice = document.getElementById('roll-dice');
const stopDice = document.getElementById('stop-dice');
const youDiceOne = document.getElementById('you-dice-1');
const youDiceTwo = document.getElementById('you-dice-2');
const oppoDiceOne = document.getElementById('oppo-dice-1');
const oppoDiceTwo = document.getElementById('oppo-dice-2');

let animationIsUnderway = false;

rollDice.addEventListener('click', function () {
    if (!animationIsUnderway) {
        animationIsUnderway = true;
        $('.score').css("visibility", "visible");
        youDiceOne.style.visibility = 'visible';
        youDiceTwo.style.visibility = 'visible';
        oppoDiceOne.style.visibility = 'visible';
        oppoDiceTwo.style.visibility = 'visible';
        stopDice.style.display = 'block';
        diceAnimation = requestAnimationFrame(roll);
    }
})

stopDice.addEventListener('click', function () {
    animationIsUnderway = false;
    clearTimeout(rollTimeOut);
    cancelAnimationFrame(roll);
    rollTimes++;
    getRoundScore();
    getTotalScore();
    if (rollTimes === 3) {
        getWinner();
        $(this).css("cursor", "not-allowed")
        $(this).prop('disabled', true)
        $(this).prev().css("cursor", "not-allowed")
        $(this).prev().prop('disabled',true)
    }
})

function roll() {
    youDiceOneValue = Math.floor((Math.random() * 6) + 1);
    youDiceTwoValue = Math.floor((Math.random() * 6) + 1);
    oppoDiceOneValue = Math.floor((Math.random() * 6) + 1);
    oppoDiceTwoValue = Math.floor((Math.random() * 6) + 1);
    youDiceOne.src = `images/dice-${youDiceOneValue}.svg`;
    youDiceTwo.src = `images/dice-${youDiceTwoValue}.svg`;
    oppoDiceOne.src = `images/dice-${oppoDiceOneValue}.svg`;
    oppoDiceTwo.src = `images/dice-${oppoDiceTwoValue}.svg`;

    const rollDelay = 100;
    rollTimeOut = setTimeout(roll, rollDelay);   
    
}









