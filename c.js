'use strict';
$(document).ready(function(){
  var numOfClicks = 0;

  $('body').click(function(){
    numOfClicks += 1;
    $('.clickCount').html(numOfClicks);
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

    setTimeout(
    function()
    {
       if(numOfClicks>1){
        var trail = new Trail(options);
        trail.init();
      }
    }, 5000);

});
