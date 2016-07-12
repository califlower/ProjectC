'use strict';
$(document).ready(function(){
  var numOfClicks = 0;

  $('body').click(function(){
    numOfClicks += 1;
    $('.clickCount').html(numOfClicks);
    if(numOfClicks==4){
     var trail = new Trail(options);
     trail.init();
   }
  });

    var Trail = function(options) {
      this.size        = options.size || 50;
      this.trailLength = options.trailLength || 20;
      this.interval    = options.interval || 15;
      this.hueSpeed    = options.hueSpeed || 6;

      this.boxes = [];
      this.hue   = 0;
      this.mouse = {
        x : window.innerWidth/2,
        y : window.innerHeight/2
      };

      this.init = function() {
        for (var i = 0; i < this.trailLength; i++) {
          this.boxes[i]              = document.createElement('div');
          this.boxes[i].className    = 'box';
          this.boxes[i].style.width  = this.size + 'px';
          this.boxes[i].style.height = this.size + 'px';
          document.body.appendChild(this.boxes[i]);
        }

        var self = this;

        document.onmousemove = function() {
          event = event || window.event;
          self.mouse.x = event.pageX;
          self.mouse.y = event.pageY;
        };

        //Periodically update mouse tracing and boxes
        setInterval(function(){
          self.updateHue();
          self.updateBoxes();
        }, this.interval);
      }

      //Update hue and constrain to 360
      this.updateHue = function() {
        this.hue = (this.hue + this.hueSpeed) % 360;
      }

      //Update box positions and stylings
      this.updateBoxes = function() {
        for (var i = 0; i < this.boxes.length; i++) {
          if (i+1 === this.boxes.length) {
            this.boxes[i].style.top             = this.mouse.y - this.size/2 + 'px';
            this.boxes[i].style.left            = this.mouse.x - this.size/2 + 'px';
            this.boxes[i].style.backgroundColor = 'hsl(' + this.hue + ', 90%, 50%)';
          } else {
            this.boxes[i].style.top             = this.boxes[i+1].style.top;
            this.boxes[i].style.left            = this.boxes[i+1].style.left;
            this.boxes[i].style.backgroundColor = this.boxes[i+1].style.backgroundColor;
          }
        }
      }
    }

    var options = {
      trailLength: 20,
      size: 50,
      interval: 10,
      hueSpeed: 5
    };



    $("body").click(function (e) {


             var x = e.pageX + 'px';
                var y = e.pageY + 'px';
       



            var test = $( "<div class='text'>UNIFI</div>" ).css({
            "position": "absolute",                    
            "left": x,
            "top": y
            });
        
            var test2= $( "<div class='text'>KAIZEN</div>" ).css({
            "position": "absolute",                    
            "left": x,
            "top": y
            });

            $(this).append(test);
            $(this).append(test2);
        

            animateDiv(test);
            animateDiv(test2);


    });



    function makeNewPosition($container) {

        // Get viewport dimensions (remove the dimension of the div)
        var h = $container.height() - 50;
        var w = $container.width() - 50;

        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);

        return [nh, nw];

    }

    function animateDiv($target) {

        var newq = makeNewPosition($target.parent());
        var oldq = $target.offset();

        var speed = calcSpeed([oldq.top, oldq.left], newq);

        $target.animate({
            top: newq[0],
            left: newq[1]
        }, speed, function() {
            animateDiv($target);

        });

    };

    function calcSpeed(prev, next) {

        var x = Math.abs(prev[1] - next[1]);
        var y = Math.abs(prev[0] - next[0]);

        var greatest = x > y ? x : y;

        var speedModifier = 0.2;

        var speed = Math.ceil(greatest / speedModifier);

        return speed;
    }








});
