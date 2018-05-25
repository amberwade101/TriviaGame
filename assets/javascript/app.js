
    var TextTyper = function(lag, toRotate, period) {
        this.toRotate = toRotate;
        this.lag = lag;
        this.loopingNumber = 0;
        this.period = parseInt(period, 6) || 400;
        this.txt = '';
        this.tick();
        this.Deleting = false;
    };

    TextTyper.prototype.tick = function() {
        var i = this.loopingNumber % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.Deleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.lag.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.Deleting) { delta /= 2; }

        if (!this.Deleting && this.txt === fullTxt) {
        delta = this.period;
        this.Deleting = true;
        } else if (this.Deleting && this.txt === '') {
        this.Deleting = false;
        this.loopingNumber++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('whattosay');
            var period = elements[i].getAttribute('whattosay-period');
            if (toRotate) {
              new TextTyper(elements[i], JSON.parse(toRotate), period);
            }
        }
      
        
    };
    $(document).ready(function() {
        
        
        function beginSetUP() {
            gameBegin = "<p><a class='btn btn-primary btn-lg btn-block start-button' role='button'>Start The Rodent Quiz</a></p>";
            $(".setup").html(gameBegin);
        }
        
        beginSetUP();
        
        
        $("body").on("click", ".start-button", function(event){
            event.preventDefault();  
            htmlMaker();
        
            timerWrapper();
        
        }); 
        
        $("body").on("click", ".answer", function(event){
            selectedAnswer = $(this).text();
            if(selectedAnswer === arrCorrect[questionTimer]) {
                
        
                clearInterval(theClock);
                winMaker();
            }
            else {
            
                clearInterval(theClock);
                lossMaker();
            }
        }); 
        
        $("body").on("click", ".reset-button", function(event){
           
            resetGame();
        }); 
        
        });  
        
        
        
        function winMaker() {
            whatsRight++;
            HTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + arrCorrect[questionTimer] + "</p>" ;
            $(".setup").html(HTML);
            setTimeout(wait, 1000); 
        }
        
        function lossMaker() {
            whatsWrong++;
            HTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ arrCorrect[questionTimer] + "</p>"
            $(".setup").html(HTML);
            setTimeout(wait, 1000); 
        }
        
        function htmlMaker() {
            HTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + arrQues[questionTimer] + "</p><p class='first-answer answer'>A. " + arrAnsw[questionTimer][0] + "</p><p class='answer'>B. "+arrAnsw[questionTimer][1]+"</p><p class='answer'>C. "+arrAnsw[questionTimer][2]+"</p><p class='answer'>D. "+arrAnsw[questionTimer][3]+"</p>";
            $(".setup").html(HTML);
        }
        
        function wait() {
            if (questionTimer < 7) {
            questionTimer++;
            htmlMaker();
            timer= 30;
            timerWrapper();
            }
            else {
                lastSetUp();
            }
        }
        
        function timerWrapper() {
            theClock = setInterval(thirtySeconds, 1000);
            function thirtySeconds() {
                if (timer === 0) {
                    clearInterval(theClock);
                    
                }
                if (timer > 0) {
                    timer--;
                }
                $(".timer").html(timer);
            }
        }
        
        
        function resetGame() {
            questionTimer = 0;
            whatsRight = 0;
            whatsWrong = 0;
            noAttempt = 0;
            timer = 30;
            htmlMaker();
            timerWrapper();
        }
        
        var gameBegin;
        var HTML;
        var timer = 30;
        var arrQues = ["What is a Squirrel?", "What is a Beaver?", "What does R.O.U.S stand for?", "What is a Porcupine?", "What is a prairie dog", "What is a guinea pig?", "What is a chimpmunk?", "What is a hamster?"];
        var arrAnsw = [["Rodent", "Bird", "Plane", "Turtle"], ["hunter","Large Rodent","tree","bird"], ["Rodents of unusual size", "Run out under sunder", "Rodent opt unity surfer", "Rodent optimizing underlaced skin"], ["fan","flee","Rodent","leaf"], ["cat", "Moon", "sun", "Rodent"], ["Rodent","Turkey","Ant","Bat"], ["Ant Eater", "Rodent", "Crab", "Cab"], ["Mountain","fish","plant","Rodent"]];
        var arrCorrect  = ["A. Rodent", "B. Rodent", "C. Rodents of unusual size", "C. Rodent", "D. Rodent", "A. Rodent", "B. Rodent", "D. Rodent"];
        var questionTimer = 0;
        var selected;
        var theClock;
        var whatsRight = 0;
        var whatsWrong = 0;
        var noAttempt = 0;
       
        