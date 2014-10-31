var Cover = (function(){

    function Cover(data){
        THREE.Object3D.call(this);
        this.cubeArray = [];
        //this.length = data.length;
        for (i = 0; i < data.length; i++) {
            //console.log(data[i].x);
            var myCube = new CubeCover(data[i].x, data[i].y, data[i].color);
            this.cubeArray.push(myCube);
            this.add(myCube);
        }
        this.position.z = -600;
        this.rotation.x += Math.PI*(60)/180;
    }

    Cover.prototype = new THREE.Object3D;
    Cover.prototype.constructor = Cover;

    Cover.prototype.moveAway = function() {
        cover = this;
        TweenLite.to(cover.position, 2, {z: -300, ease: Power2.easeInOut});
        TweenLite.to(cover.position, 2, {x: 100, ease: Power2.easeInOut});
        TweenLite.to(cover.rotation, 2, {x: 0, ease: Power2.easeInOut});
    }

    Cover.prototype.moveForward = function() {
        cover = this;
        TweenLite.to(cover.position, 2, {z: -600, ease: Power2.easeInOut});
        TweenLite.to(cover.position, 2, {x: 0, ease: Power2.easeInOut});
        TweenLite.to(cover.rotation, 2, {x: Math.PI*(60)/180, ease: Power2.easeInOut});
    }

    Cover.prototype.goLeft = function(indexCover) {
        //this.cubeArray[indexCover-2].setColor(0x000000);
        this.cubeArray[indexCover-2].material.emissive = new THREE.Color(this.cubeArray[indexCover-2].color);
        //this.cubeArray[indexCover-2].material.opacity = 0.8;
        if(indexCover < indexMaxCover+2) {
            var initialColor = this.cubeArray[indexCover-1].color;
            this.cubeArray[indexCover-1].material.emissive = new THREE.Color(0x000000);
            this.cubeArray[indexCover-1].material.color.setHex(initialColor);
            this.cubeArray[indexCover-1].material.opacity = 1;
        }
    };

    Cover.prototype.goRight = function(indexCover) {
        //this.cubeArray[indexCover].setColor(0x000000);
        this.cubeArray[indexCover].material.emissive = new THREE.Color(this.cubeArray[indexCover].color);
        //this.cubeArray[indexCover].material.opacity = 0.8;
        if(indexCover > 0) {
            var initialColor = this.cubeArray[indexCover-1].color;
            this.cubeArray[indexCover-1].material.emissive = new THREE.Color(0x000000);
            this.cubeArray[indexCover-1].material.color.setHex(initialColor);
            this.cubeArray[indexCover-1].material.opacity = 1;
        }
    };

    Cover.prototype.upCube = function(indexCover) {
        this.cubeArray[indexCover].upCube();
        var initialColor = this.cubeArray[indexCover].color;
        this.cubeArray[indexCover].material.emissive = new THREE.Color(this.cubeArray[indexCover].color);
    };

    Cover.prototype.downCube = function(indexCover) {
        this.cubeArray[indexCover].downCube();
        var initialColor = this.cubeArray[indexCover].color;
        this.cubeArray[indexCover].material.emissive = new THREE.Color(this.cubeArray[indexCover].color);
    };

    Cover.prototype.assembly = function() {
        var cover = this;
        TweenLite.to(this.position, 2, {x: 0, ease: Power2.easeInOut, onComplete: cover.clear, onCompleteParams:[cover]});
    };

    Cover.prototype.clear = function(cover) {
        TweenLite.to(cover.position, 2, {y: window.innerHeight, ease: Power2.easeInOut});
    };

    Cover.prototype.randomizeCubes = function() {
        for(var i = 0; i < indexMaxCover+1; i++) {
            this.cubeArray[i].randomize();
        }
    }

    return Cover;
})();