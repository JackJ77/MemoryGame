
var memoryGame = (function() {
    
    var data = {
        easy: [1,1,2,2,3,3,4,4,5,5,6,6],
        medium: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10],
        hard: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15],
        cards: []
    };
    
    var variables = {
        time: 0,
        pair: 0,
        count: 0,
        lastEl: -1,
        thisEl: -1
    }
    
    var htmlStrings = {
        initialPanel: '<div class="btn-container">Choose level:<button class="btn easy-btn" value="easy">EASY</button><button class="btn medium-btn" value="med">MEDIUM</button><button class="btn hard-btn" value="hard">HARD</button></div>',
        memoryBoard: '<div class="memory-board"></div>',
        timer: '<div class="timer"></div>',
        card: '<img src="resources/img/memoryGame/back-card.svg" class="back-card" alt="card">',
        winner: '<div class="game-over">You won!<button class="btn btn-new-game">NEW GAME</button></div>',
        looser: '<div class="game-over">Game over<button class="btn btn-new-game">TRY AGAIN</button></div>'
    };
    
    
    var DOM = {
        memorySection: document.querySelector('.memory-game-section')
    };
    
    var Board = function(width, bckColor, cards, time) {
        this.width = width;
        this.bckColor = bckColor;
        this.cards = cards;
        this.time = time;
    };
    
    var boards = {
        easy: new Board('367px', 'linear-gradient(to bottom, #72ffb7, #16a035)', data.easy, 15),
        medium: new Board('443px', 'linear-gradient(to bottom, #dfe548, #b1b732)', data.medium, 25),
        hard: new Board('525px', 'linear-gradient(to bottom, #ff7474, #9b0303)', data.hard, 50)
    };
    
    function mixArray(arr) {
        for (var i=0; i<arr.length; i++) { 
            var j = Math.floor(Math.random() * arr.length); 
            var buf = arr[i]; 
            arr[i] = arr[j]; 
            arr[j] = buf;
        }
        return arr;
    }
    
    function checkCard() {
        if(variables.pair < 2) {
            loop(this);
        }
    }
    
    function loop(el) {

        variables.pair++;
        el.setAttribute('src','resources/img/memoryGame/card-' + data.cards[el.value] + '.svg');
        el.setAttribute('class','card');

        el.removeEventListener('click', checkCard);

        if(variables.pair === 2) {
            variables.thisEl = el;
            if(data.cards[variables.lastEl.value] != data.cards[variables.thisEl.value]) {

                setTimeout(function() {

                 variables.lastEl.setAttribute('src','resources/img/memoryGame/back-card.svg');
                variables.lastEl.setAttribute('class','back-card');

                variables.thisEl.setAttribute('src','resources/img/memoryGame/back-card.svg');
                variables.thisEl.setAttribute('class','back-card');

                variables.thisEl.addEventListener('click', checkCard);
                variables.lastEl.addEventListener('click', checkCard);
                
                    
                variables.pair = 0;
                }, 700);
            } else {
                variables.time += 2;
                variables.count++;
                variables.pair = 0;
                document.querySelector('.timer').innerHTML = variables.time;
            }
        } else {
           variables.lastEl = el; 
        }
        
        if(variables.count == data.cards.length / 2) {
            document.querySelector('.memory-board').innerHTML += htmlStrings.winner;
            document.querySelector('.btn-new-game').addEventListener('click', init);
        }
    };
    
    /*
            document.querySelector('winner').style.left = document.querySelector('.memory-board').width/2;
            document.querySelector('winner').style.top = document.querySelector('.memory-board').height/2;
    */
    
    function loadBoard() {
        var chceck,
            timer;
        
        DOM.memorySection.innerHTML = htmlStrings.timer + htmlStrings.memoryBoard;
        
        var memoryBoard = document.querySelector('.memory-board');
            
        if(this.value === 'easy') {
            
            memoryBoard.style.width = boards.easy.width; 
            memoryBoard.style.backgroundImage = boards.easy.bckColor;
            data.cards = boards.easy.cards;
            variables.time = boards.easy.time;
            
        } else if(this.value === 'med') {
            
            memoryBoard.style.width = boards.medium.width; 
            memoryBoard.style.backgroundImage = boards.medium.bckColor;
            data.cards = boards.medium.cards;
            variables.time = boards.medium.time;
            
        } else if(this.value === 'hard') {
            
            memoryBoard.style.width = boards.hard.width; 
            memoryBoard.style.backgroundImage = boards.hard.bckColor;
            data.cards = boards.hard.cards;
            variables.time = boards.hard.time;
        }  
        
        for(var i = 0; i < data.cards.length; i++) {
            memoryBoard.insertAdjacentHTML('beforeend', htmlStrings.card);
        }
        
        data.cards = mixArray(data.cards);
        
        check = document.querySelectorAll('.back-card');
       
        for(var i = 0; i < check.length; i++) {
            check[i].value = i;
            check[i].addEventListener('click', checkCard);
        }
        
        document.querySelector('.timer').innerHTML = variables.time;
        
        timer = setInterval(function() {
            variables.time--;
            document.querySelector('.timer').innerHTML = variables.time;
            
            if(variables.count == data.cards.length / 2) {
                clearInterval(timer);
            } else if(variables.time <= 0) {
                clearInterval(timer);
                document.querySelector('.memory-board').innerHTML += htmlStrings.looser;
                document.querySelector('.btn-new-game').addEventListener('click', init);
            }
        }, 1000);
    };

    function addEventListeners() {
        document.querySelector('.easy-btn').addEventListener('click', loadBoard);
        document.querySelector('.medium-btn').addEventListener('click', loadBoard);
        document.querySelector('.hard-btn').addEventListener('click', loadBoard);
    };
    
    function init() {
            DOM.memorySection.innerHTML = htmlStrings.initialPanel;
            
            addEventListeners();
        
            variables.pair = 0;
            variables.count = 0;
            variables.lastEl = -1;
            variables.thisEl = -1;
    }
    
    return init();
    
})();
