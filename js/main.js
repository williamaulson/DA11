window.onload = function() {
    // William Aulson
    // CS 325 Digital Assignment #6
    // Inferior Megaman Knock Off
    
    "use strict";
    
    var game = new Phaser.Game( 1024, 576, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load assets
        game.load.image( 'back', 'assets/back.png' );
        game.load.image( 'floor', 'assets/floor.png' );
        game.load.image( 'wall', 'assets/wall.png' );
        game.load.image( 'platform', 'assets/platform.png' );
        game.load.image( 'splash', 'assets/splash.png' );
        game.load.image( 'bullet', 'assets/bullet.gif' );
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('dude2', 'assets/dude2.png', 32, 48);
        game.load.spritesheet('shot', 'assets/shot.png', 20, 20);
        game.load.spritesheet('fire', 'assets/fire.png', 35, 35);
        game.load.audio('damage', 'assets/damage.mp3');
        game.load.audio('death', 'assets/death.mp3');
        game.load.audio('shoot', 'assets/shoot.mp3');
        game.load.audio('music', 'assets/music.mp3');
        
    }
    // variables
    var avatar;
    var enemy;
    //var cursors;
    var aKey;
    var dKey;
    var wKey;
    //var enterKey;
    var spaceKey;
    var floor;
    var ceiling;
    var leftWall;
    var rightWall;
    var boundGroup;
    var avatarFace = 1;
    var enemyFace = 0;
    var shotDelay = 0;
    var shotCount = 0;
    var shotEnemyDelay = 0;
    var shotEnemyCount = 0;
    var fireShotDelay = 0;
    var fireShotCount = 0;
    var fireEnemyShotDelay = 0;
    var fireEnemyShotCount = 0;
    var avatarShotGroup;
    var enemyShotGroup;
    var avatarShot;
    var enemyShot;
    var mKey;
    //var plusKey;
    var avatarFireShot;
    var avatarFireShotGroup;
    var enemyFireShot;
    var enemyFireShotGroup;
    //var platform;
    var avatarLife = 100;
    var enemyLife = 100;
    var textStyle = { font: "20px Arial", fill: "#000000", align: "center" };
    var avatarText;
    var enemyText;
    var gameRunning = false;
    var startScreen;
    var startText;
    var startText2;
    var startTextStyle = { font: "50px Arial", fill: "#000000", align: "center" };
    var music;
    var shoot;
    var damage;
    var death;
    var gameEnd = false;
    var notInScript = 0;
    var regularShoot = 0;
    var regularShootTime = 0;
    var regularShootSpeed = 0;
    var regularShootSpeedX = 0;
    var regularShootCount = 0;
    var aimValue = 0;
    var inGroundAttack = 0;
    var count = 0;
    var regularShootRate = 1;
    var snipeShootTime = 0;
    var snipeShootRate = 1;
    var snipeShootCount = 0;
    var snipeShoot;
    var snipeShootSpeed = 0;
    var snipeShootSpeedX = 0;
    var snipeAimValue = 0;
    var enemySnipeGroup;
    var firstStart = 1;
    var aimObject;
    var avatarOnGround;
    var previousAvatarX;
    var avatarX = 0;
    var previousEnemyX;
    var enemyX = 0;
    var towards;
    var avatarTowards;
    var enemyTowards;
    var avatarHigh;
    var avatarQuandrant;
    var enemyQuandrant;
    var scriptSelection;
    var scriptDict = {};
    var avatarFace = 1;
    
    function create() //create assets
    {
    	    game.physics.startSystem(Phaser.Physics.ARCADE);
    	    game.world.setBounds(0, 0, 1024, 576);
    	    game.add.sprite(0, 0, 'back');
    	    
    	    boundGroup = game.add.group();
    	    game.physics.arcade.enable(boundGroup);
    	    avatarShotGroup = game.add.group();
    	    game.physics.arcade.enable(avatarShotGroup);
    	    avatarFireShotGroup = game.add.group();
    	    game.physics.arcade.enable(avatarFireShotGroup);
    	    enemyShotGroup = game.add.group();
    	    game.physics.arcade.enable(enemyShotGroup);
    	    enemyFireShotGroup = game.add.group();
    	    game.physics.arcade.enable(enemyFireShotGroup);
    	    enemySnipeGroup = game.add.group();
    	    game.physics.arcade.enable(enemySnipeGroup);
    	    
    	    /*platform = game.add.sprite(262, 375, 'platform');
    	    game.physics.arcade.enable(platform);
    	    platform.body.allowGravity = false;
    	    platform.body.immovable = true;
    	    boundGroup.add(platform);*/
    	    
    	    leftWall = game.add.sprite(0, 0, 'wall');
    	    game.physics.arcade.enable(leftWall);
    	    leftWall.body.allowGravity = false;
    	    leftWall.body.immovable = true;
    	    boundGroup.add(leftWall);
    	    
    	    rightWall = game.add.sprite(974, 0, 'wall');
    	    game.physics.arcade.enable(rightWall);
    	    rightWall.body.allowGravity = false;
    	    rightWall.body.immovable = true;
    	    boundGroup.add(rightWall);
    	    
    	    floor = game.add.sprite(0, 526, 'floor');
    	    game.physics.arcade.enable(floor);
    	    floor.body.allowGravity = false;
    	    floor.body.immovable = true;
    	    boundGroup.add(floor);
    	    
    	    ceiling = game.add.sprite(0, 0, 'floor');
    	    game.physics.arcade.enable(ceiling);
    	    ceiling.body.allowGravity = false;
    	    ceiling.body.immovable = true;
    	    boundGroup.add(ceiling);
    	    
    	    avatar = game.add.sprite(100, 150, 'dude');
    	    game.physics.arcade.enable(avatar);
    	    avatar.body.gravity.y = 1000;
    	    avatar.animations.add('left', [0, 1, 2, 3], 10, true);
    	    avatar.animations.add('right', [5, 6, 7, 8], 10, true);
    	    avatar.animations.add('backleft', [3, 2, 1, 0], 10, true);
    	    avatar.animations.add('backright', [8, 7, 6, 5], 10, true);
    	    avatar.frame = 5;
    	    
    	    enemy = game.add.sprite(892, 150, 'dude2');
    	    game.physics.arcade.enable(enemy);
    	    enemy.body.gravity.y = 1000;
    	    //enemy.body.immovable = true;
    	    enemy.animations.add('left', [0, 1, 2, 3], 10, true);
    	    enemy.animations.add('right', [5, 6, 7, 8], 10, true);
    	    
    	    avatarText = game.add.text(60, 55, 'Player 1: ' + avatarLife, textStyle);
    	    enemyText = game.add.text(847, 55, 'Player 2: ' + avatarLife, textStyle);
    	    
    	    //cursors = game.input.keyboard.createCursorKeys();
    	    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    	    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    	    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	    mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    	    //plusKey = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ADD);
    	    //enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	    
    	    //starting splash screen
    	    startScreen = game.add.sprite(0, 0, 'splash');
    	    startText = game.add.text(60, 55, 'Player 1\nMove: A, D, W\nShoot: Spacebar\nFire: M', startTextStyle);
    	    startText2 = game.add.text(650, 55, 'Player 2\nMove: Arrows\nShoot: Enter\nFire: Num +', startTextStyle);
    	    
    	    //audio
    	    music = game.add.audio('music');
    	    shoot = game.add.audio('shoot');
    	    shoot.allowMultiple = true;
    	    damage = game.add.audio('damage');
    	    damage.allowMultiple = true;
    	    death = game.add.audio('death');
    	    music.play('', 0, 1, true);
    	    
    	    scriptDict['111'] = script111;
    	    scriptDict['112'] = script112;
    	    scriptDict['113'] = script113;
    	    scriptDict['114'] = script114;
    	    scriptDict['115'] = script115;
    	    scriptDict['116'] = script116;
    	    scriptDict['117'] = script117;
    	    scriptDict['118'] = script118;
    	    scriptDict['119'] = script119;
    	    scriptDict['121'] = script121;
    	    scriptDict['122'] = script122;
    	    scriptDict['123'] = script123;
    	    scriptDict['124'] = script124;
    	    scriptDict['125'] = script125;
    	    scriptDict['126'] = script126;
    	    scriptDict['127'] = script127;
    	    scriptDict['128'] = script128;
    	    scriptDict['129'] = script129;
    	    scriptDict['131'] = script131;
    	    scriptDict['132'] = script132;
    	    scriptDict['133'] = script133;
    	    scriptDict['134'] = script134;
    	    scriptDict['135'] = script135;
    	    scriptDict['136'] = script136;
    	    scriptDict['137'] = script137;
    	    scriptDict['138'] = script138;
    	    scriptDict['139'] = script139;
    	    scriptDict['141'] = script141;
    	    scriptDict['142'] = script142;
    	    scriptDict['143'] = script143;
    	    scriptDict['144'] = script144;
    	    scriptDict['145'] = script145;
    	    scriptDict['146'] = script146;
    	    scriptDict['147'] = script147;
    	    scriptDict['148'] = script148;
    	    scriptDict['149'] = script149;
    	    scriptDict['151'] = script151;
    	    scriptDict['152'] = script152;
    	    scriptDict['153'] = script153;
    	    scriptDict['154'] = script154;
    	    scriptDict['155'] = script155;
    	    scriptDict['156'] = script156;
    	    scriptDict['157'] = script157;
    	    scriptDict['158'] = script158;
    	    scriptDict['159'] = script159;
    	    scriptDict['161'] = script161;
    	    scriptDict['162'] = script162;
    	    scriptDict['163'] = script163;
    	    scriptDict['164'] = script164;
    	    scriptDict['165'] = script165;
    	    scriptDict['166'] = script166;
    	    scriptDict['167'] = script167;
    	    scriptDict['168'] = script168;
    	    scriptDict['169'] = script169;
    	    scriptDict['171'] = script171;
    	    scriptDict['172'] = script172;
    	    scriptDict['173'] = script173;
    	    scriptDict['174'] = script174;
    	    scriptDict['175'] = script175;
    	    scriptDict['176'] = script176;
    	    scriptDict['177'] = script177;
    	    scriptDict['178'] = script178;
    	    scriptDict['179'] = script179;
    	    scriptDict['181'] = script181;
    	    scriptDict['182'] = script182;
    	    scriptDict['183'] = script183;
    	    scriptDict['184'] = script184;
    	    scriptDict['185'] = script185;
    	    scriptDict['186'] = script186;
    	    scriptDict['187'] = script187;
    	    scriptDict['188'] = script188;
    	    scriptDict['189'] = script189;
    	        	    
    	    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    	    game.input.onDown.add(fullScreenStart, this);
    	    game.paused = true;
    }
    
    function fullScreenStart() //fullscreen and pause mode
    {
    	    if (game.scale.isFullScreen)
    	    {
    	    	    game.paused = true;
    	    	    game.scale.stopFullScreen();
    	    }
    	    else
    	    {
    	    	    if (!gameRunning) //first run check
    	    	    {
    	    	    	    startScreen.destroy();
    	    	    	    startText.destroy();
    	    	    	    startText2.destroy();
    	    	    	    gameRunning = true;
    	    	    }
    	    	    game.scale.startFullScreen(true);
    	    	    game.paused = false;
    	    }
    }
    
    function update() //run game logic
    {
    	    //console.log('enemy y' + enemy.body.y);
    	    //console.log('avatar y' + avatar.body.y);
    	    
    	    if ((avatarLife < 1) && (gameEnd === false)) //endgame check
    	    {
    	    	    gameEnd = true;
    	    	    gameRunning = false;
    	    	    music.stop();
    	    	    death.play('', .5, 2, false);
    	    	    game.add.sprite(0, 0, 'splash');
    	    	    game.add.text(310, 150, 'Player 2 Wins!\n\nHumanity Is Saved!', startTextStyle);
    	    }
    	    else if ((enemyLife < 1) && (gameEnd === false))
    	    {
    	    	    gameEnd = true;
    	    	    gameRunning = false;
    	    	    music.stop();
    	    	    death.play('', .5, 2, false);
    	    	    game.add.sprite(0, 0, 'splash');
    	    	    game.add.text(310, 150, 'Player 1 Wins!\n\nHumanity Weeps...', startTextStyle);
    	    }
    	       	    
    	    if (gameRunning) //game actually running
    	    {
    	    	    previousAvatarX = avatarX;
    	    	    avatarX = avatar.body.x;
    	    	    previousEnemyX = enemyX;
    	    	    enemyX = enemy.body.x;
    	    	    setScriptChecks();
    	    	    setScript();
    	    	    callScript(avatarQuandrant, enemyQuandrant, scriptSelection);
    	    	    flip();
    	    	    
    	    	    
    	    	    
    	    	    
    	    	    
    	    	    
    	    	    //console.log('count' + count);
    	    	    game.time.events.add(Phaser.Timer.SECOND * .75, airEnd, null);
    	    	    
    	    	    avatarText.setText('Player 1: ' + avatarLife);
    	    	    enemyText.setText('Player 2: ' + enemyLife);
    	    
    	    	    //if (enemy.body.y < 478 && notInGroundAttack)
    	    	   // {
    	    	    //	    airEnd();
    	    	   // }
    	    	    
    	    	    game.physics.arcade.collide(enemy, floor, null, airEnd, this);
    	    	    game.physics.arcade.collide(avatar, enemy, null, null, this);
    	    	    game.physics.arcade.collide(avatar, boundGroup, null, null, this);
    	    	    game.physics.arcade.collide(enemy, boundGroup, null, null, this);
    	    	    game.physics.arcade.collide(avatar, enemyShotGroup, null, damageAvatar, this);
    	    	    game.physics.arcade.collide(avatar, enemyFireShotGroup, null, fireDamageAvatar, this);
    	    	    game.physics.arcade.collide(enemy, avatarShotGroup, null, damageEnemy, this);
    	    	    game.physics.arcade.collide(enemy, avatarFireShotGroup, null, fireDamageEnemy, this);
    	    	    game.physics.arcade.collide(avatarShotGroup, rightWall, null, killShot, this);
    	    	    game.physics.arcade.collide(avatarShotGroup, leftWall, null, killShot, this);
    	    	    //game.physics.arcade.collide(avatarShotGroup, platform, null, killShot, this);
    	    	    game.physics.arcade.collide(avatarFireShotGroup, rightWall, null, killFireShot, this);
    	    	    game.physics.arcade.collide(avatarFireShotGroup, leftWall, null, killFireShot, this);
    	    	    game.physics.arcade.collide(avatarFireShotGroup, floor, null, killFireShot, this);
    	    	    game.physics.arcade.collide(avatarFireShotGroup, ceiling, null, killFireShot, this);
    	    	    //game.physics.arcade.collide(avatarFireShotGroup, platform, null, killFireShot, this);
    	    	    game.physics.arcade.collide(enemyShotGroup, rightWall, null, killEnemyShot, this);
    	    	    game.physics.arcade.collide(enemyShotGroup, leftWall, null, killEnemyShot, this);
    	    	    //game.physics.arcade.collide(enemyShotGroup, platform, null, killEnemyShot, this);
    	    	    game.physics.arcade.collide(enemyFireShotGroup, rightWall, null, killEnemyFireShot, this);
    	    	    game.physics.arcade.collide(enemyFireShotGroup, leftWall, null, killEnemyFireShot, this);
    	    	    game.physics.arcade.collide(enemyFireShotGroup, floor, null, killEnemyFireShot, this);
    	    	    game.physics.arcade.collide(enemyFireShotGroup, ceiling, null, killEnemyFireShot, this);
    	    	    game.physics.arcade.collide(enemySnipeGroup, rightWall, null, killEnemySnipeShot, this);
    	    	    game.physics.arcade.collide(enemySnipeGroup, leftWall, null, killEnemySnipeShot, this);
    	    	    game.physics.arcade.collide(enemySnipeGroup, floor, null, killEnemySnipeShot, this);
    	    	    game.physics.arcade.collide(enemySnipeGroup, ceiling, null, killEnemySnipeShot, this);
    	    	    //game.physics.arcade.collide(enemyFireShotGroup, platform, null, killEnemyFireShot, this);
    	    	    
    	    	    //player 1 movement and attack
    	    	    avatar.body.velocity.x = 0;
    	    	    if (aKey.isDown && avatar.body.touching.down)
    	    	    {
    	    	    	    avatar.body.velocity.x = -200;
    	    	    	    //avatar.animations.play('left');
    	    	    	    //avatarFace = 0;
    	    	    }
    	    	    else if (dKey.isDown && avatar.body.touching.down)
    	    	    {
    	    	    	    avatar.body.velocity.x = 200;
    	    	    	    //avatar.animations.play('right');
    	    	    	    //avatarFace = 1;
    	    	    }
    	    	    else if (aKey.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.x = -200;
    	    	    	    //avatar.animations.stop();
    	    	    	    //if (avatarFace)
    	    	    	    //{
    	    	    	    //	    avatar.frame = 5;  
    	    	    	    //}
    	    	    	    //else
    	    	    	    //{
    	    	    	   //	    avatar.frame = 0;   
    	    	    	    //}
    	    	    	    //avatarFace = 0;
    	    	    }
    	    	    else if (dKey.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.x = 200;
    	    	    	    //avatar.animations.stop();
    	    	    	    //if (avatarFace)
    	    	    	    //{
    	    	    	    //	    avatar.frame = 5;  
    	    	    	    //}
    	    	    	    //else
    	    	    	    //{
    	    	    	    //	    avatar.frame = 0;   
    	    	    	    //}
    	    	    	    //avatarFace = 1;
    	    	    }
    	    	    else
    	    	    {
    	    	    	    /*avatar.animations.stop();
    	    	    	    if (avatarFace)
    	    	    	    {
    	    	    	    	    avatar.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    avatar.frame = 0;   
    	    	    	    }*/
    	    	    }
    	    	    if (wKey.isDown && avatar.body.touching.down)
    	    	    {
    	    	    	    avatar.body.velocity.y = -600;
    	    	    }
    	    
    	    	    if (spaceKey.isDown)
    	    	    {
    	    	    	    if ((shotCount < 3) && (game.time.now > shotDelay))
    	    	    	    {
    	    	    	    	    /*if (avatarFace)
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    avatarShot = avatarShotGroup.create(avatar.x + 25, avatar.y + 15, 'shot');
    	    	    	    	    	    game.physics.arcade.enable(avatarShot);
    	    	    	    	    	    avatarShot.body.velocity.x = 450;
    	    	    	    	    	    shotDelay = game.time.now + 200;
    	    	    	    	    	    avatarShot.animations.add('shotRight', [0, 1], 10, true);
    	    	    	    	    	    avatarShot.animations.play('shotRight');
    	    	    	    	    	    shotCount = shotCount + 1;
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    avatarShot = avatarShotGroup.create(avatar.x - 25, avatar.y + 15, 'shot');
    	    	    	    	    	    game.physics.arcade.enable(avatarShot);
    	    	    	    	    	    avatarShot.body.velocity.x = -450;
    	    	    	    	    	    shotDelay = game.time.now + 200;
    	    	    	    	    	    avatarShot.animations.add('shotLeft', [0, 1], 10, true);
    	    	    	    	    	    avatarShot.animations.play('shotLeft');
    	    	    	    	    	    shotCount = shotCount + 1;   
    	    	    	    	    }*/
    	    	    	    }
    	    	    }
    	    
    	    	    if (mKey.isDown)
    	    	    {
    	    	    	    if ((fireShotCount < 2) && (game.time.now > fireShotDelay))
    	    	    	    {
    	    	    	    	    /*if (avatarFace)
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    avatarFireShot = avatarFireShotGroup.create(avatar.x + 25, avatar.y + 15, 'fire');
    	    	    	    	    	    game.physics.arcade.enable(avatarFireShot);
    	    	    	    	    	    avatarFireShot.anchor.setTo(.5,.5);
    	    	    	    	    	    avatarFireShot.scale.x = avatarFireShot.scale.x * -1;
    	    	    	    	    	    avatarFireShot.body.velocity.x = 350;
    	    	    	    	    	    avatarFireShot.body.velocity.y = game.rnd.integerInRange(-75, 75);
    	    	    	    	    	    fireShotDelay = game.time.now + 500;
    	    	    	    	    	    avatarFireShot.animations.add('shotFireRight', [0, 1, 2], 10, true);
    	    	    	    	    	    avatarFireShot.animations.play('shotFireRight');
    	    	    	    	    	    fireShotCount = fireShotCount + 1;
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    avatarFireShot = avatarFireShotGroup.create(avatar.x - 25, avatar.y + 15, 'fire');
    	    	    	    	    	    game.physics.arcade.enable(avatarFireShot);
    	    	    	    	    	    avatarFireShot.anchor.setTo(.5,.5);
    	    	    	    	    	    avatarFireShot.body.velocity.x = -350;
    	    	    	    	    	    avatarFireShot.body.velocity.y = game.rnd.integerInRange(-75, 75);
    	    	    	    	    	    fireShotDelay = game.time.now + 500;
    	    	    	    	    	    avatarFireShot.animations.add('shotFireLeft', [0, 1, 2], 10, true);
    	    	    	    	    	    avatarFireShot.animations.play('shotFireLeft');
    	    	    	    	    	    fireShotCount = fireShotCount + 1;  
    	    	    	    	    }*/
    	    	    	    }
    	    	    }
    	    	    if (regularShoot)
    	    	    {
    	    	    	    if (game.time.now > regularShootTime)
    	    	    	    {
    	    	    	    	    aimObject = game.add.sprite(avatar.body.x + game.rnd.integerInRange(-50, 50), avatar.body.y + game.rnd.integerInRange(-50, 50), '');
    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    enemyShot = enemyShotGroup.create(enemy.x, enemy.y + 5, 'shot');
    	    	    	    	    game.physics.arcade.enable(enemyShot);
    	    	    	    	    //var y = getYRegAimAir();
    	    	    	    	    //var x = getXRegAimAir();
    	    	    	    	    //aimSet();
    	    	    	    	    //console.log('y: ' + y);
    	    	    	    	    //console.log('x: ' + x);
    	    	    	    	    //enemyShot.body.velocity.y = regularShootSpeed;
    	    	    	    	    //enemyShot.body.velocity.x = regularShootSpeedX;
    	    	    	    	    game.physics.arcade.moveToObject(enemyShot, aimObject, game.rnd.integerInRange(400, 600));
    	    	    	    	    enemyShot.animations.add('regShotE', [0, 1], 10, true);
    	    	    	    	    enemyShot.animations.play('regShotE');
    	    	    	    	    regularShootTime = game.time.now + (300 * regularShootRate);
    	    	    	    	    regularShootCount = regularShootCount - 1;
    	    	    	    }
    	    	    	    if (regularShootCount === 0)
    	    	    	    {
    	    	    	    	    regularShoot = 0;
    	    	    	    	    regularShootRate = 1;
    	    	    	    }
    	    	    }
    	    	    //console.log('snipeshoot:' + snipeShoot);
    	    	    if (snipeShoot)
    	    	    {
    	    	    	    if (game.time.now > snipeShootTime)
    	    	    	    {
    	    	    	    	    aimObject = game.add.sprite(avatar.body.x + game.rnd.integerInRange(-25, 25), avatar.body.y + game.rnd.integerInRange(-25, 25), '');
    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    if (enemyFace)
    	    	    	    	    {
    	    	    	    	    	    snipeShoot = enemySnipeGroup.create(enemy.x + 15, enemy.y + 15, 'bullet')
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    snipeShoot = enemySnipeGroup.create(enemy.x - 15, enemy.y + 15, 'bullet')
    	    	    	    	    	    snipeShoot.scale.x = snipeShoot.scale.x * -1;
    	    	    	    	    }
    	    	    	    	    game.physics.arcade.enable(snipeShoot);
    	    	    	    	    //var y = getYRegAimAir();
    	    	    	    	    //var x = getXRegAimAir();
    	    	    	    	    //snipeAimSet();
    	    	    	    	    //console.log('y: ' + snipeShootSpeed);
    	    	    	    	    //console.log('x: ' + snipeShootSpeedX);
    	    	    	    	    //snipeShoot.body.velocity.y = snipeShootSpeed;
    	    	    	    	    //snipeShoot.body.velocity.x = snipeShootSpeedX;
    	    	    	    	    //enemyShot.animations.add('regShotE', [0, 1], 10, true);
    	    	    	    	    //enemyShot.animations.play('regShotE');
    	    	    	    	    game.physics.arcade.moveToObject(snipeShoot, aimObject, game.rnd.integerInRange(1000, 1300));
    	    	    	    	    snipeShootTime = game.time.now + (300 * snipeShootRate);
    	    	    	    	    snipeShootCount = snipeShootCount - 1;
    	    	    	    }
    	    	    	    if (snipeShootCount === 0)
    	    	    	    {
    	    	    	    	    //console.log('here');
    	    	    	    	    snipeShoot = 0;
    	    	    	    	    snipeShootRate = 1;
    	    	    	    	    game.time.events.add(Phaser.Timer.SECOND * 1.75, endGroundScript, null);
    	    	    	    }
    	    	    }
    	    	    
    	    	    //if (notInScript)
    	    	    //{
    	    	    //	    flip();
    	    	    //}
    	    	    /*
    	    	    if (notInScript && avatar.x < 281 && enemy.x < 281)
    	    	    {
    	    	    	    //console.log('script11');
    	    	    	    notInScript = 0;
    	    	    	    script11();
    	    	    }
    	    	    else if (notInScript && avatar.x < 281 && enemy.x < 512)
    	    	    {
    	    	    	    //console.log('script12');
    	    	    	    notInScript = 0;
    	    	    	    script12();
    	    	    }
    	    	    else if (notInScript && avatar.x < 281 && enemy.x < 743)
    	    	    {
    	    	    	    //console.log('script13');
    	    	    	    script13();
    	    	    }
    	    	    else if (notInScript && avatar.x < 281 && enemy.x < 974)
    	    	    {
    	    	    	    //console.log('script14');
    	    	    	    script14();
    	    	    }
    	    	    else if (notInScript && avatar.x < 512 && enemy.x < 281)
    	    	    {
    	    	    	    //console.log('script21');
    	    	    	    script21();
    	    	    }
    	    	    else if (notInScript && avatar.x < 512 && enemy.x < 512)
    	    	    {
    	    	    	    //console.log('script22');
    	    	    	    script22();
    	    	    }
    	    	    else if (notInScript && avatar.x < 512 && enemy.x < 743)
    	    	    {
    	    	    	    //console.log('script23');
    	    	    	    script23();
    	    	    }
    	    	    else if (notInScript && avatar.x < 512 && enemy.x < 974)
    	    	    {
    	    	    	    //console.log('script24');
    	    	    	    script24();
    	    	    }
    	    	    else if (notInScript && avatar.x < 743 && enemy.x < 281)
    	    	    {
    	    	    	    //console.log('script31');
    	    	    	    script31();
    	    	    }
    	    	    else if (notInScript && avatar.x < 743 && enemy.x < 512)
    	    	    {
    	    	    	    //console.log('script32');
    	    	    	    script32();
    	    	    }
    	    	    else if (notInScript && avatar.x < 743 && enemy.x < 743)
    	    	    {
    	    	    	    //console.log('script33');
    	    	    	    script33();
    	    	    }
    	    	    else if (notInScript && avatar.x < 743 && enemy.x < 974)
    	    	    {
    	    	    	    //console.log('script34');
    	    	    	    script34();
    	    	    }
    	    	    else if (notInScript && avatar.x < 974 && enemy.x < 281)
    	    	    {
    	    	    	    //console.log('script41');
    	    	    	    script41();
    	    	    }
    	    	    else if (notInScript && avatar.x < 974 && enemy.x < 512)
    	    	    {
    	    	    	    //console.log('script42');
    	    	    	    script42();
    	    	    }
    	    	    else if (notInScript && avatar.x < 974 && enemy.x < 743)
    	    	    {
    	    	    	    //console.log('script43');
    	    	    	    script43();
    	    	    }
    	    	    else if (notInScript && avatar.x < 974 && enemy.x < 974)
    	    	    {
    	    	    	    //console.log('script44');
    	    	    	    notInScript = 0;
    	    	    	    script44();
    	    	    }*/
    	    	        	    	    
    	    	    /*
    	    	    //player 2 movement and attack
    	    	    enemy.body.velocity.x = 0;
    	    	    if (cursors.left.isDown && enemy.body.touching.down)
    	    	    {
    	    	    	    enemy.body.velocity.x = -200;
    	    	    	    enemy.animations.play('left');
    	    	    	    enemyFace = 0;
    	    	    }
    	    	    else if (cursors.right.isDown && enemy.body.touching.down)
    	    	    {
    	    	    	    enemy.body.velocity.x = 200;
    	    	    	    enemy.animations.play('right');
    	    	    	    enemyFace = 1;
    	    	    }
    	    	    else if (cursors.left.isDown)
    	    	    {
    	    	    	    enemy.body.velocity.x = -200;
    	    	    	    enemy.animations.stop();
    	    	    	    if (enemyFace)
    	    	    	    {
    	    	    	    	    enemy.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    enemy.frame = 0;   
    	    	    	    }
    	    	    	    enemyFace = 0;
    	    	    }
    	    	    else if (cursors.right.isDown)
    	    	    {
    	    	    	    enemy.body.velocity.x = 200;
    	    	    	    enemy.animations.stop();
    	    	    	    if (enemyFace)
    	    	    	    {
    	    	    	    	    enemy.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    enemy.frame = 0;   
    	    	    	    }
    	    	    	    enemyFace = 1;
    	    	    }
    	    	    else
    	    	    {
    	    	    	    enemy.animations.stop();
    	    	    	    if (enemyFace)
    	    	    	    {
    	    	    	    	    enemy.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    enemy.frame = 0;   
    	    	    	    }
    	    	    }
    	    	    if (cursors.up.isDown && enemy.body.touching.down)
    	    	    {
    	    	    	    enemy.body.velocity.y = -600;
    	    	    }
    	    
    	    	    if (enterKey.isDown)
    	    	    {
    	    	    	    if ((shotEnemyCount < 3) && (game.time.now > shotEnemyDelay))
    	    	    	    {
    	    	    	    	    if (enemyFace)
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    enemyShot = enemyShotGroup.create(enemy.x + 25, enemy.y + 15, 'shot');
    	    	    	    	    	    game.physics.arcade.enable(enemyShot);
    	    	    	    	    	    enemyShot.body.velocity.x = 450;
    	    	    	    	    	    shotEnemyDelay = game.time.now + 200;
    	    	    	    	    	    enemyShot.animations.add('shotERight', [0, 1], 10, true);
    	    	    	    	    	    enemyShot.animations.play('shotERight');
    	    	    	    	    	    shotEnemyCount = shotEnemyCount + 1;
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    enemyShot = enemyShotGroup.create(enemy.x - 25, enemy.y + 15, 'shot');
    	    	    	    	    	    game.physics.arcade.enable(enemyShot);
    	    	    	    	    	    enemyShot.body.velocity.x = -450;
    	    	    	    	    	    shotEnemyDelay = game.time.now + 200;
    	    	    	    	    	    enemyShot.animations.add('shotELeft', [0, 1], 10, true);
    	    	    	    	    	    enemyShot.animations.play('shotELeft');
    	    	    	    	    	    shotEnemyCount = shotEnemyCount + 1;   
    	    	    	    	    }
    	    	    	    }
    	    	    }
    	    
    	    	    if (plusKey.isDown)
    	    	    {
    	    	    	    if ((fireEnemyShotCount < 2) && (game.time.now > fireEnemyShotDelay))
    	    	    	    {
    	    	    	    	    if (enemyFace)
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    enemyFireShot = enemyFireShotGroup.create(enemy.x + 25, enemy.y + 15, 'fire');
    	    	    	    	    	    game.physics.arcade.enable(enemyFireShot);
    	    	    	    	    	    enemyFireShot.anchor.setTo(.5,.5);
    	    	    	    	    	    enemyFireShot.scale.x = enemyFireShot.scale.x * -1;
    	    	    	    	    	    enemyFireShot.body.velocity.x = 350;
    	    	    	    	    	    enemyFireShot.body.velocity.y = game.rnd.integerInRange(-75, 75);
    	    	    	    	    	    fireEnemyShotDelay = game.time.now + 500;
    	    	    	    	    	    enemyFireShot.animations.add('shotEFireRight', [0, 1, 2], 10, true);
    	    	    	    	    	    enemyFireShot.animations.play('shotEFireRight');
    	    	    	    	    	    fireEnemyShotCount = fireEnemyShotCount + 1;
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    enemyFireShot = enemyFireShotGroup.create(enemy.x - 25, enemy.y + 15, 'fire');
    	    	    	    	    	    game.physics.arcade.enable(enemyFireShot);
    	    	    	    	    	    enemyFireShot.anchor.setTo(.5,.5);
    	    	    	    	    	    enemyFireShot.body.velocity.x = -350;
    	    	    	    	    	    enemyFireShot.body.velocity.y = game.rnd.integerInRange(-75, 75);
    	    	    	    	    	    fireEnemyShotDelay = game.time.now + 500;
    	    	    	    	    	    enemyFireShot.animations.add('shotEFireLeft', [0, 1, 2], 10, true);
    	    	    	    	    	    enemyFireShot.animations.play('shotEFireLeft');
    	    	    	    	    	    fireEnemyShotCount = fireEnemyShotCount + 1;  
    	    	    	    	    }
    	    	    	    }
    	    	    }*/  
    	    }
    }
    
    function setScriptChecks()
    {
    	    if (avatar.body.y < 478)
    	    {
    	    	    avatarOnGround = 0;
    	    }
    	    else
    	    {
    	     	    avatarOnGround = 1;
    	    }
    	    towards = previousAvatarX - avatarX;
    	    if (towards < 0)
    	    {
    	       	    avatarTowards = 2;
    	    }
    	    else if (towards > 0)
    	    {
    	       	    avatarTowards = 0;
    	    }
    	    else
    	    {
    	       	    avatarTowards = 1;
    	    }
    	    if (avatar.y < 400)
    	    {
    	       	    avatarHigh = 1;
    	    }
    	    else
    	    {
    	       	    avatarHigh = 0;
    	    }
    	    avatarQuandrant = Math.floor((avatar.body.x - 50) / 115.5) + 1;
    	    if (avatarQuandrant === 0)
    	    {
    	    	    avatarQuandrant = 1;
    	    }
    	    if (avatarQuandrant === 9)
    	    {
    	    	    avatarQuandrant = 8;
    	    }
    	    //console.log("avatar Quad: " + avatarQuandrant);
    	    enemyQuandrant = Math.floor((enemy.body.x - 50) / 115.5) + 1;
    	    //console.log("enemy Quad: " + enemyQuandrant);
    }
    
    function setScript()
    {
    	    if (!avatarOnGround)
    	    {
    	    	    var direction = getTowards();
    	    	    if (direction === 2)
    	    	    {
    	    	    	    if (avatarHigh)
    	    	    	    {
    	    	    	    	    scriptSelection = 1;
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    scriptSelection = 2;
    	    	    	    }
    	    	    }
    	    	    else if (direction === 0)
    	    	    {
    	    	    	    if (avatarHigh)
    	    	    	    {
    	    	    	    	    scriptSelection = 3;
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    scriptSelection = 4;
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (avatarHigh)
    	    	    	    {
    	    	    	    	    scriptSelection = 5;
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    scriptSelection = 6;
    	    	    	    }
    	    	    }
    	    	    
    	    }
    	    else
    	    {
    	    	    if (avatarTowards === 2)
    	    	    {
    	    	    	    scriptSelection = 7;
    	    	    }
    	    	    else if (avatarTowards === 0)
    	    	    {
    	    	    	    scriptSelection = 8;
    	    	    }
    	    	    else
    	    	    {
    	    	    	    scriptSelection = 9;
    	    	    }
    	    }
    }
    
    function callScript(avatarQuandrant, enemyQuandrant, scriptSelection)
    {
    	    var functionName = '' + avatarQuandrant + enemyQuandrant + scriptSelection + '';
    	    //console.log("function name: " + functionName);
    	    //scriptDict[functionName]();
    	    
    	    /*   
    	    
    	    if (avatarQuandrant < 5)
    	    	    {
    	    	    	    if (avatarQuandrant < 3)
    	    	    	    {
    	    	    	    	    if (avatarQuandrant === 1)
    	    	    	    	    {
    	    	    	    	    	    if (enemyQuandrant < 5)
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 3)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 1)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script11(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script12(scriptSelection);
    	    	    	    	    	    		    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 3)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script13(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script14(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    	    else
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 7)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 5)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script15(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script16(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 7)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script17(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script18(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
       	    	 	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    if (enemyQuandrant < 5)
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 3)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 1)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script21(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script22(scriptSelection);
    	    	    	    	    	    		    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 3)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script23(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script24(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    	    else
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 7)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 5)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script25(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script26(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 7)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script27(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script28(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    }
    	    	    	    	    
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    if (avatarQuandrant === 3)
    	    	    	    	    {
    	    	    	    	    	    if (enemyQuandrant < 5)
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 3)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 1)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script31(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script32(scriptSelection);
    	    	    	    	    	    		    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 3)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script33(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script34(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    	    else
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 7)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 5)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script35(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script36(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 7)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script37(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script38(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    if (enemyQuandrant < 5)
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 3)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 1)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script41(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script42(scriptSelection);
    	    	    	    	    	    		    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 3)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script43(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script44(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    	    else
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 7)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 5)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script45(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script46(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 7)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script47(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script48(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    }
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (avatarQuandrant < 7)
    	    	    	    {
    	    	    	    	    if (avatarQuandrant === 5)
    	    	    	    	    {
    	    	    	    	    	    if (enemyQuandrant < 5)
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 3)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 1)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script51(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script52(scriptSelection);
    	    	    	    	    	    		    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 3)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script53(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script54(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    	    else
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 7)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 5)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script55(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script56(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 7)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script57(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script58(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    if (enemyQuandrant < 5)
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 3)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 1)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script61(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script62(scriptSelection);
    	    	    	    	    	    		    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 3)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script63(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script64(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    	    else
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 7)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 5)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script65(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script66(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 7)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script67(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script68(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    }
    	    	    	    	    
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    if (avatarQuandrant === 7)
    	    	    	    	    {
    	    	    	    	    	    if (enemyQuandrant < 5)
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 3)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 1)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script71(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script72(scriptSelection);
    	    	    	    	    	    		    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 3)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script73(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script74(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    	    else
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 7)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 5)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script75(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script76(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 7)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script77(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script78(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    if (enemyQuandrant < 5)
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 3)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 1)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script81(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script82(scriptSelection);
    	    	    	    	    	    		    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 3)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script83(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script84(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    	    else
    	    	    	    	    	    {
    	    	    	    	    	    	    if (enemyQuandrant < 7)
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 5)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script85(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script86(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    
    	    	    	    	    	    	    }
    	    	    	    	    	    	    else
    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    if (enemyQuandrant === 7)
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script87(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    	    else
    	    	    	    	    	    	    	    {
    	    	    	    	    	    	    	    	    script88(scriptSelection);
    	    	    	    	    	    	    	    }
    	    	    	    	    	    	    }
    	    	    	    	    	    }
    	    	    	    	    }
    	    	    	    }
    	    	    }*/
    }
    
    function getTowards()
    {
    	    towards = previousAvatarX - avatarX;
    	    if (towards < 0)
    	    {
    	       	    avatarTowards = 2;
    	    }
    	    else if (towards > 0)
    	    {
    	       	    avatarTowards = 0;
    	    }
    	    else
    	    {
    	       	    avatarTowards = 1;
    	    }
    	    return avatarTowards;
    }
    
    function getEnemyTowards()
    {
    	    var eTowards = previousEnemyX - enemyX;
    	    if (eTowards < 0)
    	    {
    	       	    enemyTowards = 2;
    	    }
    	    else if (eTowards > 0)
    	    {
    	       	    enemyTowards = 0;
    	    }
    	    else
    	    {
    	       	    enemyTowards = 1;
    	    }
    	    return enemyTowards;
    }
    
    function flip()
    {
    	    console.log("in flip");
    	    var direction = getTowards();
    	    var edirection = getEnemyTowards();
    	    console.log("directon" + direction);
    	    console.log("edirection" + edirection);
    	    if (avatar.body.x < enemy.body.x)
    	    {
    	    	    if (direction === 2 && avatarOnGround)
    	    	    {
    	    	    	    //console.log("move avatar right");
    	    	    	    avatar.animations.play('right');
    	    	    }
    	    	    else if (direction === 0 && avatarOnGround)
    	    	    {
    	    	    	    avatar.animations.play('backright');
    	    	    }
    	    	    else
    	    	    {
    	    	    	    avatar.frame = 5;
    	    	    }
    	    	    if (edirection === 2)
    	    	    {
    	    	    	    //play left forward e
    	    	    }
    	    	    else if (edirection === 0)
    	    	    {
    	    	    	    //play left backwards e
    	    	    }
    	    	    else
    	    	    {
    	    	    	    //play left still e
    	    	    }
    	    }
    	    else if (avatar.body.x > enemy.body.x)
    	    {
    	    	    if (direction === 2 && avatarOnGround)
    	    	    {
    	    	    	    avatar.animations.play('left');
    	    	    }
    	    	    else if (direction === 0 && avatarOnGround)
    	    	    {
    	    	    	    avatar.animations.play('backleft');
    	    	    }
    	    	    else
    	    	    {
    	    	    	    avatar.frame = 0;
    	    	    }
    	    	    if (edirection === 2)
    	    	    {
    	    	    	    //play right forward e
    	    	    }
    	    	    else if (edirection === 0)
    	    	    {
    	    	    	    //play right backwards e
    	    	    }
    	    	    else
    	    	    {
    	    	    	    //play right still e
    	    	    }
    	    }
    }
    
    function airEnd()
    {
    	    if (!inGroundAttack)
    	    {
    	    	    //console.log('airend');
    	    	    notInScript = 1;
    	    	    enemy.body.velocity.x = 0;   
    	    }
    }
    
    function endGroundScript()
    {
    	    inGroundAttack = 0;
    	    notInScript = 1;
    }
    
    function readyRegShoot()
    {
    	    regularShoot = 1;
    }
    
    function readySnipeShoot()
    {
    	    snipeShoot = 1;
    	    //console.log('notInScript' + notInScript);
    }
    
    /*function script11(scriptSelection)
    {
    	    if (scriptSelection < 6)
    	    {
    	    	    if (scriptSelection < 4)
    	    	    {
    	    	    	    if (scriptSelection === 1)
    	    	    	    {
    	    	    	    	    subScript111();
    	    	    	    }
    	    	    	    else if (scriptSelection === 2)
    	    	    	    {
    	    	    	    	    subScript112();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    subScript113();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 4)
    	    	    	    {
    	    	    	    	    subScript114();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    subScript115();
    	    	    	    }
    	    	    }
    	    }
    	    else
    	    {
    	    	    if (scriptSelection < 8)
    	    	    {
    	    	    	    if (scriptSelection === 6)
    	    	    	    {
    	    	    	    	    subScript116();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    subScript117();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 8)
    	    	    	    {
    	    	    	    	    subScript118();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    subScript119();
    	    	    	    }
    	    	    }
    	    }
    }
    
    function script12(scriptSelection)
    {
    	    if (scriptSelection < 6)
    	    {
    	    	    if (scriptSelection < 4)
    	    	    {
    	    	    	    if (scriptSelection === 1)
    	    	    	    {
    	    	    	    	    //subScript121();
    	    	    	    }
    	    	    	    else if (scriptSelection === 2)
    	    	    	    {
    	    	    	    	    //subScript122();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript123();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 4)
    	    	    	    {
    	    	    	    	    //subScript124();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript125();
    	    	    	    }
    	    	    }
    	    }
    	    else
    	    {
    	    	    if (scriptSelection < 8)
    	    	    {
    	    	    	    if (scriptSelection === 6)
    	    	    	    {
    	    	    	    	    //subScript126();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript127();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 8)
    	    	    	    {
    	    	    	    	    //subScript128();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript129();
    	    	    	    }
    	    	    }
    	    }
    }
    
    function script13(scriptSelection)
    {
    	    if (scriptSelection < 6)
    	    {
    	    	    if (scriptSelection < 4)
    	    	    {
    	    	    	    if (scriptSelection === 1)
    	    	    	    {
    	    	    	    	    //subScript131();
    	    	    	    }
    	    	    	    else if (scriptSelection === 2)
    	    	    	    {
    	    	    	    	    //subScript132();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript133();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 4)
    	    	    	    {
    	    	    	    	    //subScript134();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript135();
    	    	    	    }
    	    	    }
    	    }
    	    else
    	    {
    	    	    if (scriptSelection < 8)
    	    	    {
    	    	    	    if (scriptSelection === 6)
    	    	    	    {
    	    	    	    	    //subScript136();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript137();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 8)
    	    	    	    {
    	    	    	    	    //subScript138();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript139();
    	    	    	    }
    	    	    }
    	    }
    }
    
    function script14(scriptSelection)
    {
    	    if (scriptSelection < 6)
    	    {
    	    	    if (scriptSelection < 4)
    	    	    {
    	    	    	    if (scriptSelection === 1)
    	    	    	    {
    	    	    	    	    //subScript141();
    	    	    	    }
    	    	    	    else if (scriptSelection === 2)
    	    	    	    {
    	    	    	    	    //subScript142();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript143();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 4)
    	    	    	    {
    	    	    	    	    //subScript144();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript145();
    	    	    	    }
    	    	    }
    	    }
    	    else
    	    {
    	    	    if (scriptSelection < 8)
    	    	    {
    	    	    	    if (scriptSelection === 6)
    	    	    	    {
    	    	    	    	    //subScript146();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript147();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 8)
    	    	    	    {
    	    	    	    	    //subScript148();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript149();
    	    	    	    }
    	    	    }
    	    }
    }
    
    function script15(scriptSelection)
    {
    	    if (scriptSelection < 6)
    	    {
    	    	    if (scriptSelection < 4)
    	    	    {
    	    	    	    if (scriptSelection === 1)
    	    	    	    {
    	    	    	    	    //subScript151();
    	    	    	    }
    	    	    	    else if (scriptSelection === 2)
    	    	    	    {
    	    	    	    	    //subScript152();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript153();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 4)
    	    	    	    {
    	    	    	    	    //subScript154();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript155();
    	    	    	    }
    	    	    }
    	    }
    	    else
    	    {
    	    	    if (scriptSelection < 8)
    	    	    {
    	    	    	    if (scriptSelection === 6)
    	    	    	    {
    	    	    	    	    //subScript156();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript157();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 8)
    	    	    	    {
    	    	    	    	    //subScript158();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript159();
    	    	    	    }
    	    	    }
    	    }
    }
    
    function script16(scriptSelection)
    {
    	    if (scriptSelection < 6)
    	    {
    	    	    if (scriptSelection < 4)
    	    	    {
    	    	    	    if (scriptSelection === 1)
    	    	    	    {
    	    	    	    	    //subScript161();
    	    	    	    }
    	    	    	    else if (scriptSelection === 2)
    	    	    	    {
    	    	    	    	    //subScript162();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript163();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 4)
    	    	    	    {
    	    	    	    	    //subScript164();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript165();
    	    	    	    }
    	    	    }
    	    }
    	    else
    	    {
    	    	    if (scriptSelection < 8)
    	    	    {
    	    	    	    if (scriptSelection === 6)
    	    	    	    {
    	    	    	    	    //subScript166();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript167();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 8)
    	    	    	    {
    	    	    	    	    //subScript168();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript169();
    	    	    	    }
    	    	    }
    	    }
    }
    
    function script17(scriptSelection)
    {
    	    if (scriptSelection < 6)
    	    {
    	    	    if (scriptSelection < 4)
    	    	    {
    	    	    	    if (scriptSelection === 1)
    	    	    	    {
    	    	    	    	    //subScript171();
    	    	    	    }
    	    	    	    else if (scriptSelection === 2)
    	    	    	    {
    	    	    	    	    //subScript172();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript173();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 4)
    	    	    	    {
    	    	    	    	    //subScript174();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript175();
    	    	    	    }
    	    	    }
    	    }
    	    else
    	    {
    	    	    if (scriptSelection < 8)
    	    	    {
    	    	    	    if (scriptSelection === 6)
    	    	    	    {
    	    	    	    	    //subScript176();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript177();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 8)
    	    	    	    {
    	    	    	    	    //subScript178();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript179();
    	    	    	    }
    	    	    }
    	    }
    }
    
    function script18(scriptSelection)
    {
    	    if (scriptSelection < 6)
    	    {
    	    	    if (scriptSelection < 4)
    	    	    {
    	    	    	    if (scriptSelection === 1)
    	    	    	    {
    	    	    	    	    //subScript181();
    	    	    	    }
    	    	    	    else if (scriptSelection === 2)
    	    	    	    {
    	    	    	    	    //subScript182();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript183();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 4)
    	    	    	    {
    	    	    	    	    //subScript184();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript185();
    	    	    	    }
    	    	    }
    	    }
    	    else
    	    {
    	    	    if (scriptSelection < 8)
    	    	    {
    	    	    	    if (scriptSelection === 6)
    	    	    	    {
    	    	    	    	    //subScript186();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript187();
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (scriptSelection === 8)
    	    	    	    {
    	    	    	    	    //subScript188();
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    //subScript189();
    	    	    	    }
    	    	    }
    	    }
    }
    
    function script21(scriptSelection)
    {
    	    
    }
    
    function script22(scriptSelection)
    {
    	    
    }
    
    function script23(scriptSelection)
    {
    	    
    }
    
    function script24(scriptSelection)
    {
    	    
    }
    
    function script25(scriptSelection)
    {
    	    
    }
    
    function script26(scriptSelection)
    {
    	    
    }
    
    function script27(scriptSelection)
    {
    	    
    }
    
    function script28(scriptSelection)
    {
    	    
    }
    
    function script31(scriptSelection)
    {
    	    
    }
    
    function script32(scriptSelection)
    {
    	    
    }
    
    function script33(scriptSelection)
    {
    	    
    }
    
    function script34(scriptSelection)
    {
    	    
    }
    
    function script35(scriptSelection)
    {
    	    
    }
    
    function script36(scriptSelection)
    {
    	    
    }
    
    function script37(scriptSelection)
    {
    	    
    }
    
    function script38(scriptSelection)
    {
    	    
    }
    
    function script41(scriptSelection)
    {
    	    
    }
    
    function script42(scriptSelection)
    {
    	    
    }
    
    function script43(scriptSelection)
    {
    	    
    }
    
    function script44(scriptSelection)
    {
    	    
    }
    
    function script45(scriptSelection)
    {
    	    
    }
    
    function script46(scriptSelection)
    {
    	    
    }
    
    function script47(scriptSelection)
    {
    	    
    }
    
    function script48(scriptSelection)
    {
    	    
    }
    
    function script51(scriptSelection)
    {
    	    
    }
    
    function script52(scriptSelection)
    {
    	    
    }
    
    function script53(scriptSelection)
    {
    	    
    }
    
    function script54(scriptSelection)
    {
    	    
    }
    
    function script55(scriptSelection)
    {
    	    
    }
    
    function script56(scriptSelection)
    {
    	    
    }
    
    function script57(scriptSelection)
    {
    	    
    }
    
    function script58(scriptSelection)
    {
    	    
    }
    
    function script61(scriptSelection)
    {
    	    
    }
    
    function script62(scriptSelection)
    {
    	    
    }
    
    function script63(scriptSelection)
    {
    	    
    }
    
    function script64(scriptSelection)
    {
    	    
    }
    
    function script65(scriptSelection)
    {
    	    
    }
    
    function script66(scriptSelection)
    {
    	    
    }
    
    function script67(scriptSelection)
    {
    	    
    }
    
    function script68(scriptSelection)
    {
    	    
    }
    
    function script71(scriptSelection)
    {
    	    
    }
    
    function script72(scriptSelection)
    {
    	    
    }
    
    function script73(scriptSelection)
    {
    	    
    }
    
    function script74(scriptSelection)
    {
    	    
    }
    
    function script75(scriptSelection)
    {
    	    
    }
    
    function script76(scriptSelection)
    {
    	    
    }
    
    function script77(scriptSelection)
    {
    	    
    }
    
    function script78(scriptSelection)
    {
    	    
    }
    
    function script81(scriptSelection)
    {
    	    
    }
    
    function script82(scriptSelection)
    {
    	    
    }
    
    function script83(scriptSelection)
    {
    	    
    }
    
    function script84(scriptSelection)
    {
    	    
    }
    
    function script85(scriptSelection)
    {
    	    
    }
    
    function script86(scriptSelection)
    {
    	    
    }
    
    function script87(scriptSelection)
    {
    	    
    }
    
    function script88(scriptSelection)
    {
    	    
    }*/
    
    function script111()
    {
    	    //console.log("grapefruit");
    }
    
    function script112()
    {
    	    
    }
    
    function script113()
    {
    	    
    }
    
    function script114()
    {
    	    
    }
    
    function script115()
    {
    	    
    }
    
    function script116()
    {
    	    
    }
    
    function script117()
    {
    	    
    }
    
    function script118()
    {
    	    
    }
    
    function script119()
    {
    	    
    }
    
    function script121()
    {
    	    
    }
    
    function script122()
    {
    	    
    }
    
    function script123()
    {
    	    
    }
    
    function script124()
    {
    	    
    }
    
    function script125()
    {
    	    
    }
    
    function script126()
    {
    	    
    }
    
    function script127()
    {
    	    
    }
    
    function script128()
    {
    	    
    }
    
    function script129()
    {
    	    
    }
    
    function script131()
    {
    	    
    }
    
    function script132()
    {
    	    
    }
    
    function script133()
    {
    	    
    }
    
    function script134()
    {
    	    
    }
    
    function script135()
    {
    	    
    }
    
    function script136()
    {
    	    
    }
    
    function script137()
    {
    	    
    }
    
    function script138()
    {
    	    
    }
    
    function script139()
    {
    	    
    }
    
    function script141()
    {
    	    
    }
    
    function script142()
    {
    	    
    }
    
    function script143()
    {
    	    
    }
    
    function script144()
    {
    	    
    }
    
    function script145()
    {
    	    
    }
    
    function script146()
    {
    	    
    }
    
    function script147()
    {
    	    
    }
    
    function script148()
    {
    	    
    }
    
    function script149()
    {
    	    
    }
    
    function script151()
    {
    	    
    }
    
    function script152()
    {
    	    
    }
    
    function script153()
    {
    	    
    }
    
    function script154()
    {
    	    
    }
    
    function script155()
    {
    	    
    }
    
    function script156()
    {
    	    
    }
    
    function script157()
    {
    	    
    }
    
    function script158()
    {
    	    
    }
    
    function script159()
    {
    	    
    }
    
    function script161()
    {
    	    
    }
    
    function script162()
    {
    	    
    }
    
    function script163()
    {
    	    
    }
    
    function script164()
    {
    	    
    }
    
    function script165()
    {
    	    
    }
    
    function script166()
    {
    	    
    }
    
    function script167()
    {
    	    
    }
    
    function script168()
    {
    	    
    }
    
    function script169()
    {
    	    
    }
    
    function script171()
    {
    	    
    }
    
    function script172()
    {
    	    
    }
    
    function script173()
    {
    	    
    }
    
    function script174()
    {
    	    
    }
    
    function script175()
    {
    	    
    }
    
    function script176()
    {
    	    
    }
    
    function script177()
    {
    	    
    }
    
    function script178()
    {
    	    
    }
    
    function script179()
    {
    	    
    }
    
    function script181()
    {
    	  //console.log("181");  
    }
    
    function script182()
    {
    	    //console.log("182");
    }
    
    function script183()
    {
    	    //console.log("183");
    }
    
    function script184()
    {
    	    //console.log("184");
    }
    
    function script185()
    {
    	    //console.log("185");
    }
    
    function script186()
    {
    	    //console.log("186");    	    
    }
    
    function script187()
    {
    	    //console.log("187");
    }
    
    function script188()
    {
    	    //console.log("188");
    }
    
    function script189()
    {
    	    //console.log("189");
    }
    /*
    function script11()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -900;
    	    	   enemy.body.velocity.x = 400;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 3;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Baby Raging Storm
    	    }
    }
    
    function script12()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -600;
    	    	   enemy.body.velocity.x = 300;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 1;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Flame Pillar
    	    }
    }
    
    function script13()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -900;
    	    	   //enemy.body.velocity.x = -500;
    	    	   //game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 3;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Arc Shot
    	    }
    }
    
    function script14()
    {
    	    notInScript = 0;
    	    inGroundAttack = 1;
    	    if (game.rnd.integerInRange(1, 9) < 4)
    	    {
    	    	    //shoot.play('', .6, 1, false);
    	    	    snipeShootCount = 1;
    	    	    game.time.events.add(Phaser.Timer.SECOND * .30, readySnipeShoot, null);  
    	    }
    	    else
    	    {
    	    	    //arc shot
    	    	    endGroundScript();
    	    }
    }
    
    function script21()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 8)
    	    {
    	    	   enemy.body.velocity.y = -500;
    	    	   enemy.body.velocity.x = 500;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 1;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Speed Buster
    	    }
    }
    
    function script22()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -900;
    	    	   //enemy.body.velocity.x = -500;
    	    	   //game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 5;
    	    	   regularShootRate = .2;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .85, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Raging Storm
    	    }
    }
    
    function script23()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 8)
    	    {
    	    	   enemy.body.velocity.y = -500;
    	    	   enemy.body.velocity.x = -500;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 1;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Speed Buster
    	    }
    }
    
    function script24()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -900;
    	    	   //enemy.body.velocity.x = -500;
    	    	   //game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 3;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Arc Shot
    	    }
    }
    
    function script31()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -900;
    	    	   //enemy.body.velocity.x = -500;
    	    	   //game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 3;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Arc Shot
    	    }
    }
    
    function script32()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 8)
    	    {
    	    	   enemy.body.velocity.y = -500;
    	    	   enemy.body.velocity.x = 500;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 1;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Speed Buster
    	    }
    }
    
    function script33()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -900;
    	    	   //enemy.body.velocity.x = -500;
    	    	   //game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 5;
    	    	   regularShootRate = .2;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .85, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Raging Storm
    	    }
    }
    
    function script34()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 8)
    	    {
    	    	   enemy.body.velocity.y = -500;
    	    	   enemy.body.velocity.x = -500;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 1;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Speed Buster
    	    }
    }
    
    function script41()
    {
    	    notInScript = 0;
    	    inGroundAttack = 1;
    	    if (game.rnd.integerInRange(1, 9) < 4)
    	    {
    	    	    //shoot.play('', .6, 1, false);
    	    	    snipeShootCount = 1;
    	    	    game.time.events.add(Phaser.Timer.SECOND * .75, readySnipeShoot, null);  
    	    }
    	    else
    	    {
    	    	    //arc shot
    	    	    endGroundScript();
    	    }
    }
    
    function script42()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -900;
    	    	   //enemy.body.velocity.x = -500;
    	    	   //game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 3;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Arc Shot
    	    }
    }
    
    function script43()
    {
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -600;
    	    	   enemy.body.velocity.x = -300;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 1;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Flame Pillar
    	    }
    }
    
    function script44()
    {
    	    count = count + 1;
    	    notInScript = 0;
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -900;
    	    	   enemy.body.velocity.x = -400;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 3;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   //fire script
    	    }
    	    else
    	    {
    	    	    //Baby Raging Storm
    	    }
    }*/
    
    function killEnemySnipeShot(wall, snipeBullet)
    {
    	    console.log('hi');
    	    snipeBullet.destroy();
    }
    
    //remove errant attacks
    function killShot(wall, shot)
    {
    	    shot.destroy();
    	    shotCount = shotCount - 1;
    }
    
    function killFireShot(wall, fireShot)
    {
    	    fireShot.destroy();
    	    fireShotCount = fireShotCount - 1;
    }
    
    function killEnemyShot(wall, eShot)
    {
    	    eShot.destroy();
    	    shotEnemyCount = shotEnemyCount - 1;
    }
    
    function killEnemyFireShot(wall, eFireShot)
    {
    	    eFireShot.destroy();
    	    fireEnemyShotCount = fireEnemyShotCount - 1;
    }
    
    //damage players from successful attacks
    function damageAvatar(avatar, shot)
    {
    	    if (avatarLife > 5)
    	    {
    	    	  damage.play('', .6, 1, false);  
    	    }
    	    avatarLife = avatarLife - 5;
    	    shot.destroy()
    	    shotEnemyCount = shotEnemyCount - 1;
    }
    
    function fireDamageAvatar(avatar, fShot)
    {
    	    if (avatarLife > 10)
    	    {
    	    	  damage.play('', .6, 1, false);  
    	    }
    	    avatarLife = avatarLife - 10;
    	    fShot.destroy()
    	    fireEnemyShotCount = fireEnemyShotCount - 1;
    }
    
    function damageEnemy(enemy, shot)
    {
    	    if (enemyLife > 5)
    	    {
    	    	  damage.play('', .6, 1, false);  
    	    }
    	    enemyLife = enemyLife - 5;
    	    shot.destroy()
    	    shotCount = shotCount - 1;
    }
    
    function fireDamageEnemy(enemy, fShot)
    {
    	    if (enemyLife > 10)
    	    {
    	    	  damage.play('', .6, 1, false);  
    	    }
    	    enemyLife = enemyLife - 10;
    	    fShot.destroy()
    	    fireShotCount = fireShotCount - 1;
    }
};
