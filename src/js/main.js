var webgl, gui;
// initialize index for vinyl reading
var index = 0;
var indexCover = 0;
var indexMax = 79;
var indexMaxCover = 143;
var playing = false;

var mouseAlreadyMoved = false;
var controlsEnabled = false;

var moved = false;
var movingEnabled = true;

var coverAlreadyAdded = false;

var sceneEnded = false;

var glitchActivated = false;

// the setinterval for playing
var timer;

// http://stemkoski.github.io/Three.js/Shader-Glow.html
// http://www.jeux2notes.fr/jeux2notes/Jeux_video_files/tetrisflute.pdf

$(document).ready(init);

function init(){
    webgl = new Webgl(window.innerWidth, window.innerHeight);
    $('.three').append(webgl.renderer.domElement);

    gui = new dat.GUI();
    gui.close();

    $(window).on('resize', resizeHandler);

    // zoom on mouse wheel
    // document.body.addEventListener('mousewheel', mousewheel, false);
    // document.body.addEventListener('DOMMouseScroll', mousewheel, false); // firefox

    document.body.addEventListener('mousemove', mousemove);

    var k = [71, 76, 73, 84, 67, 72];  
    var n = 0; 

    // events on keyboard
    $(window).keydown(function(e) {
        if (e.keyCode === k[n++]) {  
            if (n === k.length) { 
                if(!glitchActivated) {
                    glitchActivated = true;
                    n = 0;
                }
                else {
                    glitchActivated = false;
                    n = 0;
                }
            }  
        }
        else if(e.keyCode == 37 && !playing && controlsEnabled) { // left
            n = 0;
            if(index < indexMax+1 && !moved) {
                webgl.goRight(index);
                index++;
            }
            else if(indexCover > 1 && moved) {
                webgl.goLeftCover(indexCover);
                indexCover--;
            }
        }
        else if(e.keyCode == 39 && !playing && controlsEnabled) { // right
            n = 0;
            if(index > 1 && !moved) {
                webgl.goLeft(index);
                index--;
            }
            else if(indexCover < indexMaxCover+1 && moved) {
                webgl.goRightCover(indexCover);
                indexCover++;
            }
        }
        else if(e.keyCode == 38 && !playing) { // up
            n = 0;
            if(index > 0 && index < indexMax+2 && !moved) {
                webgl.upCube(index-1);
            }
            if(indexCover > 0 && indexCover < indexMaxCover+2 && moved) {
                webgl.upCubeCover(indexCover-1);
            }
        }
        else if(e.keyCode == 40 && !playing) { // down
            n = 0;
            if(index > 0 && index < indexMax+2 && !moved) {
                webgl.downCube(index-1);
            }
            if(indexCover > 0 && indexCover < indexMaxCover+2 && moved) {
                webgl.downCubeCover(indexCover-1);
            }
        }
        else if(e.keyCode == 32) { // space
            n = 0;
            if(!playing && controlsEnabled) {
                playing = true;
                index = 0;
                //webgl.renderRotation();
                timer = setInterval(function(){webgl.render(index++)}, 150);
            }
            else {
                playing = false;
            }
        }
        else if(e.keyCode == 13 && !sceneEnded) { //enter
            n = 0;
            if(!moved && movingEnabled) {
                movingEnabled = false;
                moved = true;
                $('.pressEnter').html('Press enter to edit vinyl');
                $('.pressEchap').html('Press esc to start a new vinyl');
                // send to album cover
                webgl.moveAway();
            }
            else if(moved && movingEnabled){
                movingEnabled = false;
                moved = false;
                $('.pressEnter').html('Press enter to edit cover');
                $('.pressEchap').html('');
                webgl.moveForward();
            }
        }
        else if(e.keyCode == 27 && moved && !sceneEnded) { // escape
            n = 0;
            sceneEnded = true;
            $('.pressEnter').html('Press enter to edit cover');
            $('.pressEchap').html('');
            webgl.clearAllScene();
        }
    });

    var textContent = $('.textContent');

    textContent.css({
        'margin-left': (window.innerWidth - 800)/2,
        'margin-top': (window.innerHeight - 360)/2
    });

    $('.controls').css({
        'margin-left': (window.innerWidth - 201)/2
    });

    $('.textControls').css({
        'margin-left': (window.innerWidth - 800)/2
    });

    var colorArray = ['#4d73a0','#538ab2','#69acbc','#8fc4b5','#6ca995','#6ca995','#99e5cc',]
    $('.textContent .title span').each(function() {
        var randomIndex = Math.floor(Math.random() * (6 - 0 + 1));
        $(this).css({
            'color': colorArray[randomIndex]
        });
    });

    TweenLite.to(textContent, 2, {css:{opacity:0}, ease:Power3.easeInOut, delay: 1, onComplete: displayVinyl});

    
    //webgl.renderStart();
    animate();
}

function displayVinyl() {
    $('.textContent').css({
        "display": "none"
    });

    TweenLite.to($('.controls'), 2, {css:{opacity:1}, ease:Power3.easeInOut, onComplete: enableControls});
    webgl.displayStart();
}

function animateTextControls() {
    TweenLite.to($('.textControls'), 2, {css:{opacity:0.7}, ease:Power1.easeInOut, onComplete: hidetextControls});
}

function hidetextControls() {
    TweenLite.to($('.textControls'), 2, {css:{opacity:0.2}, ease:Power1.easeInOut, onComplete: animateTextControls});
}

function enableControls() {
    controlsEnabled = true;
    if(!coverAlreadyAdded) {
        coverAlreadyAdded = true;
        webgl.scene.add(webgl.cover);
    }
    animateTextControls();
}

function resizeHandler() {
    webgl.resize(window.innerWidth, window.innerHeight);
    var textContent = $('.textContent');

    textContent.css({
        'margin-left': (window.innerWidth - 800)/2,
        'margin-top': (window.innerHeight - 360)/2
    });

    $('.controls').css({
        'margin-left': (window.innerWidth - 201)/2
    });

    $('.textControls').css({
        'margin-left': (window.innerWidth - 800)/2
    });

}

function animate() {
    requestAnimationFrame(animate);
    if(playing || !mouseAlreadyMoved) {
        webgl.renderRotation();
    }
    webgl.renderStart();
}

function mousewheel(e) {
	if(e.wheelDelta > 0) {
		webgl.camera.position.z += 10;
	}
	else if(e.wheelDelta < 0) {
		webgl.camera.position.z -= 10;
	}
	webgl.renderStart();
}

function mousemove(e) {
    if(!mouseAlreadyMoved) {
        mouseAlreadyMoved = true;
    }
    if(!playing) {
        var xFromCenter = e.pageX - window.innerWidth/2;
        var yFromCenter = e.pageY - window.innerHeight/2;
        webgl.orientate(xFromCenter, yFromCenter);
        //console.log(xFromCenter+'/'+yFromCenter);
    }
}
