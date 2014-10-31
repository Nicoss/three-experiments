var Vinyl = (function(){

    function Vinyl(data){
        THREE.Object3D.call(this);
        this.cubeArray = [];
        //this.length = data.length;
        for (i = 0; i < data.length; i++) {
            //console.log(data[i].x);
            var myCube = new Cube(data[i].x, data[i].y, data[i].depth, data[i].color);
            this.cubeArray.push(myCube);
            this.add(myCube);
        }
        //this.rotation.y += Math.PI*90/180;
        this.position.y = window.innerHeight/8;
        this.rotation.x += Math.PI*(-60)/180;
        this.rotation.z += Math.PI*(180)/180;
    }

    Vinyl.prototype = new THREE.Object3D;
    Vinyl.prototype.constructor = Vinyl;

    Vinyl.prototype.update = function(degrees) {

        this.rotation.z += Math.PI*degrees/180;
        if(this.rotation.z >= Math.PI*360/180) {
            this.rotation.z -= Math.PI*360/180;
        }
    };

    Vinyl.prototype.updateColor = function(index) {
        if(index < this.cubeArray.length && this.cubeArray[index].color != 0xffffff) {
            this.cubeArray[index].material.emissive = new THREE.Color(this.cubeArray[index].color);
            //this.cubeArray[index].material.opacity = 0.8;
            TweenLite.to(this.cubeArray[index].mesh.position, 2, {z:0, ease:Elastic.easeOut});
            this.cubeArray[index].playSound(this.cubeArray[index].depthCube);
        }
        else {
            playing = false;
        }
    };

    Vinyl.prototype.goLeft = function(index) {
        //this.cubeArray[index-2].setColor(0x000000);
        this.cubeArray[index-2].material.emissive = new THREE.Color(this.cubeArray[index-2].color);
        //this.cubeArray[index-2].material.opacity = 0.8;
        this.cubeArray[index-2].setColor(initialColor);
        if(index < indexMax+2) {
            var initialColor = this.cubeArray[index-1].color;
            this.cubeArray[index-1].material.emissive = new THREE.Color(0x000000);
            this.cubeArray[index-1].material.color.setHex(initialColor);
            this.cubeArray[index-1].material.opacity = 1;
        }
    };

    Vinyl.prototype.goRight = function(index) {
        //this.cubeArray[index].setColor(0x000000);
        this.cubeArray[index].material.emissive = new THREE.Color(this.cubeArray[index].color);
        //this.cubeArray[index].material.opacity = 0.8;
        this.cubeArray[index].setColor(initialColor);
        if(index > 0) {
            var initialColor = this.cubeArray[index-1].color;
            this.cubeArray[index-1].material.emissive = new THREE.Color(0x000000);
            this.cubeArray[index-1].material.color.setHex(initialColor);
            this.cubeArray[index-1].material.opacity = 1;
        }
    };

    Vinyl.prototype.upCube = function(index) {
        this.cubeArray[index].upCube();
        var initialColor = this.cubeArray[index].color;
        this.cubeArray[index].material.emissive = new THREE.Color(this.cubeArray[index].color);
        this.cubeArray[index].setColor(initialColor);
    };

    Vinyl.prototype.downCube = function(index) {
        this.cubeArray[index].downCube();
        var initialColor = this.cubeArray[index].color;
        this.cubeArray[index].material.emissive = new THREE.Color(this.cubeArray[index].color);
        this.cubeArray[index].setColor(initialColor);
    };

    Vinyl.prototype.reset = function() {
        controlsEnabled = true;
        for(var i = 0; i < this.cubeArray.length; i++) {
            index = 0;
            this.cubeArray[i].resetColors();
            this.cubeArray[i].resetPosition();
        }
    };

    Vinyl.prototype.moveAway = function() {
        var vinyl = this;
        TweenLite.to(this.position, 2, {z: -310, ease: Power2.easeInOut});
        TweenLite.to(this.position, 2, {x: -100, ease: Power2.easeInOut});
        TweenLite.to(this.rotation, 2, {x: 0, ease: Power2.easeInOut, onComplete: vinyl.setMovingEnabled});
    };

    Vinyl.prototype.moveForward = function() {
        var vinyl = this;
        TweenLite.to(this.position, 2, {z: 0, ease: Power2.easeInOut});
        TweenLite.to(this.position, 2, {x: 0, ease: Power2.easeInOut});
        TweenLite.to(this.rotation, 2, {x: Math.PI*(-60)/180, ease: Power2.easeInOut, onComplete: vinyl.setMovingEnabled});
    };

    Vinyl.prototype.setMovingEnabled = function() {
        movingEnabled = !movingEnabled;
    }

    Vinyl.prototype.assembly = function() {
        var vinyl = this;
        TweenLite.to(this.rotation, 2, {z: 0, ease: Power2.easeInOut});
        TweenLite.to(this.position, 2, {x: 0, ease: Power2.easeInOut, onComplete: vinyl.clear, onCompleteParams:[vinyl]});
    }

    Vinyl.prototype.clear = function(vinyl) {
        TweenLite.to(vinyl.position, 2, {y:  window.innerHeight, ease: Power2.easeInOut});
    }

    Vinyl.prototype.randomizeCubes = function() {
        for(var i = 0; i < indexMax; i++) {
            this.cubeArray[i].randomize();
        }
    }

    return Vinyl;
})();