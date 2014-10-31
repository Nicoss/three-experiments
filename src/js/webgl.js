var Webgl = (function(){

    function Webgl(width, height){
        this.vinylRotation = 0;
        // Basic three.js setup
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
        this.camera.position.z = 200;
        //this.camera.rotation.z += Math.PI*(0)/180;

        var light = new THREE.PointLight(0xffffff, 1.3, 1000);
        light.position.set(0, 25, 100);
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x2D2D2D);

        var webgl = this;

        // Glow scene
        this.glowscene = new THREE.Scene();
        this.glowscene.add(new THREE.AmbientLight(0xffffff));

        $.ajax({
            dataType: "json",
            type: "GET",
            url: "./src/json/vinyl.json",
            success: function(data) {
                webgl.vinyl = new Vinyl(data);
            },
            async: false
        });

        $.ajax({
            dataType: "json",
            type: "GET",
            url: "./src/json/cover.json",
            success: function(data) {
                webgl.cover = new Cover(data);
            },
            async: false
        });

        this.scene.add(this.vinyl);
        //this.scene.add(this.cover);

        this.composer = new THREE.EffectComposer(this.renderer);
        this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

        this.glitchPass = new THREE.GlitchPass();
        this.glitchPass.goWild = 10;
        this.glitchPass.renderToScreen = true;
        this.composer.addPass(this.glitchPass);
    }

    Webgl.prototype.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    Webgl.prototype.renderStart = function() {
        this.renderer.render(this.scene, this.camera);
        if(glitchActivated) {
            this.composer.render();
        }
        //console.log('test');
        if(!playing && ! sceneEnded) {
            this.vinyl.rotation.z += (this.vinylRotation - this.vinyl.rotation.z)*0.1;
        }
    };

    Webgl.prototype.render = function(index) {   
        //console.log('test'); 
        //this.renderer.render(this.scene, this.camera);
        //this.vinyl.update(0.1);
        if(playing) {
            this.vinyl.updateColor(index);
        }
        else {
            clearInterval(timer);
            this.vinyl.reset();
        }
    };

    Webgl.prototype.renderRotation = function(index) {   
        //console.log('test'); 
        this.vinyl.update(0.8);
    };

    Webgl.prototype.updateVinyl = function(degrees) {   
        this.vinyl.update(degrees); 
    };

    Webgl.prototype.goLeft = function(index) {
        this.vinyl.goLeft(index);
    };

    Webgl.prototype.goRight = function(index) {
        this.vinyl.goRight(index);
    };

    Webgl.prototype.goLeftCover = function(index) {
        this.cover.goLeft(index);
    };

    Webgl.prototype.goRightCover = function(index) {
        this.cover.goRight(index);
    };

    Webgl.prototype.upCube = function(index) {
        this.vinyl.upCube(index);
    };

    Webgl.prototype.downCube = function(index) {
        this.vinyl.downCube(index);
    };

    Webgl.prototype.upCubeCover = function(index) {
        this.cover.upCube(index);
    };

    Webgl.prototype.downCubeCover = function(index) {
        this.cover.downCube(index);
    };

    Webgl.prototype.orientate = function(x, y) {   
        this.vinylRotation = (Math.PI*(((x*180)/window.innerWidth)+180)/180);
        //this.vinyl.rotation.x = Math.PI*((y*10)/window.innerWidth)/180;;
    };

    Webgl.prototype.displayStart = function() {
        var sound = document.getElementById("startup");
        sound.play();
        TweenLite.to(this.vinyl.position, 2, {y:0, ease:Elastic.easeOut});
    }

    Webgl.prototype.moveAway = function() {
        this.vinyl.moveAway();
        this.cover.moveAway();
    }

    Webgl.prototype.moveForward = function() {
        this.vinyl.moveForward();
        this.cover.moveForward();
    }

    Webgl.prototype.clearAllScene = function() {
        var webgl = this;

        //this.vinyl.assembly();
        var vinyl = this.vinyl;
        TweenLite.to(vinyl.rotation, 2, {z: 0, ease: Power2.easeInOut});
        TweenLite.to(vinyl.position, 2, {x: 0, ease: Power2.easeInOut, onComplete: webgl.clearVinyl, onCompleteParams: [vinyl]});

        //this.cover.assembly();
        var cover = this.cover;
        TweenLite.to(cover.position, 2, {x: 0, ease: Power2.easeInOut, onComplete: webgl.clearCover, onCompleteParams: [cover, webgl]});

/*        setTimeout(function(){webgl.restartVariables()}, 3000);
        setTimeout(function(){webgl.restartVinyl()}, 4000);
        setTimeout(function(){webgl.restartCover()}, 7000);
*/    }

    Webgl.prototype.clearVinyl = function(vinyl) {
        TweenLite.to(vinyl.position, 2, {y:  window.innerHeight, ease: Power2.easeInOut});
    }

    Webgl.prototype.clearCover = function(cover, webgl) {
        TweenLite.to(cover.position, 2, {y: window.innerHeight, ease: Power2.easeInOut, onComplete: webgl.restart, onCompleteParams: [webgl]});
    }

    Webgl.prototype.restart = function(webgl) {
        webgl.restartVariables();
        webgl.restartVinyl();
        setTimeout(function(){webgl.restartCover()}, 2000);
    }

    Webgl.prototype.restartVinyl = function() {
        //this.rotation.y += Math.PI*90/180;
        this.vinyl.randomizeCubes();
        this.vinyl.position.y = window.innerHeight/8;
        this.vinyl.position.z = 0;
        this.vinyl.rotation.x = Math.PI*(-60)/180;
        this.vinyl.rotation.z = Math.PI*(180)/180;
        this.displayStart();
    }

    Webgl.prototype.restartCover = function() {
        this.cover.randomizeCubes();
        this.cover.position.z = -600;
        this.cover.position.y = 0;
        this.cover.rotation.x += Math.PI*(60)/180;
    }

    Webgl.prototype.restartVariables = function() {
        index = 0;
        indexCover = 0;
        indexMax = 79;
        indexMaxCover = 143;
        playing = false;
        mouseAlreadyMoved = false;
        controlsEnabled = true;
        moved = false;
        movingEnabled = true;
        coverAlreadyAdded = false;
        sceneEnded = false;
    }

    return Webgl;

})();