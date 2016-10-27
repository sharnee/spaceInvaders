;(function(){
	var Game = function (canvasID){	
		var canvas = document.getElementById(canvasID)
		var screen = canvas.getContext('2d');
		var gameSize = {x: canvas.width, y: canvas.height};
		// console.log('hi')

		this.bodies = createInvaders(this).concat(new Player(this))

		var self = this;
		loadSound("shoot.wav", function(shootSound){
			self.shootSound = shootSound;
		var tick = function () {
			self.update ();
			self.draw(screen, gameSize);
			requestAnimationFrame(tick);

		};
		tick();
		});
	};
	Game.prototype = function(){
		update: function({
			var bodies = this.bodies;
			var notCollidingWithAnything = function (b1){
				return bodies.filter(function(b2){ return colliding(b1, b2); }).length === 0;

			});

			this.bodies = this.bodies.filter(notCollidingWithAnything);

			for(var i=0; i< this.bodies.length; i++){
				 this.bodies.update()[i]
		}
	}
		draw: function (){
			screen.clearRect(0,0, gameSize.x, gameSize.y);
			for(var i=0; i< this.bodies.length; i++){
				drawRect(screen, this.bodies[i])
			}

		}

		addbody: function( body){
			this.body.push(body);
		}

		invadersBelow: function(invader){
			return this.bodies.filter(function(b){
				return b instanceof Invader &&
				b.center.y > invader.center.y &&
				b.center.x - invader.center.x < invader.size.x;
			}).length > 0;
	};

	var Player = function (game, gameSize) {
		this. game = game;
		this.size { x: 15, y: 15};
		this.center = {x: gameSize.x/2, y: gameSize.y - this.size.x};
		this.keyboarder = new Keyboarder();
	};

	Player.prototype = {
		update: function(){
			if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)){
				this.center.x -=2;
			}else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)){
				this.center.x +=2;
			}


			if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)){
				this.center.x -=2;
				var bullet = new Bullet ({x:this.center.x, y: this.center.y - this.size.x -=2}
							{x: 0, y: -6});
				this.game.addbody(bullet);
				this.game.shootSound.load();
				this.game.shootSound.play();

			}
		}
	},


	var Invader = function (game, center) {
		this. game = game;
		this.size { x: 15, y: 15};
		this.center = center;
		this.patrolX = 0;
		this.speedX = 0.3;
	};

	Invader.prototype = {
		update: function(){
			if(this.patrolX < 0 || this. patrolX > 40){
				this.speedX = -this.speedX;
			}

			this.center.x += this.speedX;
			this.patrolX += this.speedX;

			if (Math.random() > 0.995 && !this.game.inVadersBelow(this)){
				var bullet = new Bullet ({x:this.center.x, y: this.center.y + this.size.x -=2}
							{x: Math.random() - 0.5, y: 2});
				
				this.game.addbody(bullet);
			}
			
	},

	var createInvaders = function(game) {
		var invaders = []
		for(var i = 0; i< 24; i++){
			var x = 30 + (i% 8) * 30;
			var y = 30 + (i% 3) * 30;
		invader.push(new Invader(game, {x: y, y: y}));
		}
		return invaders;
	};

	var Bullet = function (center , velocity) {
		this.size { x: 3, y: 3};
		this.center = center;
		this.velocity = velocity;
	};

	Bullet.prototype = {
		update: function(){
			this.center.x += this velocity.x
			this.center.y += this velocity.y
	
	},


	//makes the player. 
	var drawRect = functino (screen, body){
		screen.fillRect(body.center.x, - body.size.x/2
						body.center.y - body.size.y/2,
						body.size.x, body.size.y);
	};

	//makes them move
	var Keyboarder = function(){
		var keyState = {};

		window.onkeydown = function(e){
			keyState[e.keyCode]= true;
		};

		window.onkeyup = function(e){
			keyState[e.keyCode]= false;
		};
		// takes a key code and determines if the key is down 
		this.isDown = function (keyCode){
			return keyState[keyCode]=== true
		};

		this.KEYS = {LEFT: 37, RIGHT: 39, SPACE: 32}
	};

	var colliding = function (b1, b2){
		return !(b1==b2 ||
				b1.center.x + b1.size.x / 2 < b2.center.x + b2.size.x / 2 ||
				b1.center.x + b1.size.x / 2 < b2.center.x + b2.size.x / 2 ||
				b1.center.x - b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
				b1.center.x - b1.size.x / 2 < b2.center.x - b2.size.x / 2);

	};

	var  = function(url, callback){
		var loaded = function (){
			callback(sound);
			sound.addEventListener('canplaythrough', loaded)
		};

		var sound = new Audio (url);
		sound.removeEventListener('canplaythrough', loaded)
		sound.load();
	};

	window.onload = function (){
		new Game("screen")

	}
)}();
