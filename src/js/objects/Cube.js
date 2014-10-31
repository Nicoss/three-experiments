var Cube = (function(){

    function Cube(posX, posY, depth, color){
        
        //console.log(posX+'/'+posY);
        THREE.Object3D.call(this);
        this.posX = posX;
        this.posY = posY;
        this.widthCube = 10;
        this.heightCube = 10;
        //this.depthCube = depth;
        
        if (color == "white") {
            this.color = 0xffffff;
            this.depthCube = 10;
            modif = 0;
        }
        else {
            //this.color = Math.random()*0xffffff;
            this.depthCube = 10;
            //modif = Math.floor(Math.random() * (21 - 7 + 1)) + 7;
            modif = depth;
            switch(modif) {
                case 7:
                    this.color = 0x28224a;
                    break;

                case 8:
                    this.color = 0x59548f;
                    break;

                case 9:
                    this.color = 0x2a2f56;
                    break;

                case 10:
                    this.color = 0x2c446f;
                    break;

                case 11:
                    this.color = 0x4d73a0;
                    break;

                case 12:
                    this.color = 0x538ab2;
                    break;

                case 13:
                    this.color = 0x69acbc;
                    break;

                case 14:
                    this.color = 0x8fc4b5;
                    break;

                case 15:
                    this.color = 0x6ca995;
                    break;

                case 16:
                    this.color = 0x99e5cc;
                    break;

                case 17:
                    this.color = 0x728164;
                    break;

                case 18:
                    this.color = 0xa8cb7a;
                    break;

                case 19:
                    this.color = 0xc9e986;
                    break;

                case 20:
                    this.color = 0xa09d6b;
                    break;

                case 21:
                    this.color = 0xb6b37b;
                    break;

                default:
                    this.color = 0xcfcc97;
                    break;
            }
        }

        geometry = new THREE.BoxGeometry(this.widthCube, this.heightCube, this.depthCube);

        this.material = new THREE.MeshPhongMaterial({
            ambient: 0xffffff,
            color: this.color,
            specular: 0x000000,
            shininess: 100000, 
            wireframe: false, 
            transparent: true, 
            shading: THREE.SmoothShading
        });
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.scale.z += 0.01*modif;
        this.depthCube = modif;
        this.mesh.position.set(this.posX*10 + (this.widthCube/2), this.posY*10 - (this.widthCube/2), ((this.depthCube/2)-this.widthCube/2));
        //this.mesh.position.set(this.posX*10 + (this.widthCube/2), this.posY*10 - (this.widthCube/2), 0);
        this.add(this.mesh);
    }

    Cube.prototype = new THREE.Object3D;
    Cube.prototype.constructor = Cube;

    Cube.prototype.update = function() {
        //this.mesh.rotation.y += 0.01;
    };

    Cube.prototype.setColor = function(hex) {
        this.playSound(this.depthCube);
    };

    Cube.prototype.upCube = function() {
        //console.log('upCube');
        if(this.depthCube < 21) {
            this.depthCube++;
            //console.log(this.depthCube);
            this.mesh.position.set(this.posX*10 + (this.widthCube/2), this.posY*10 - (this.widthCube/2), (this.depthCube/2)-this.widthCube/2);
            this.mesh.scale.z += 0.01;
            this.playSound(this.depthCube);
        }
    };

    Cube.prototype.downCube = function() {
        //console.log('downCube');
        if(this.depthCube > 7) {
            this.depthCube--;
            //console.log(this.depthCube);
            this.mesh.position.set(this.posX*10 + (this.widthCube/2), this.posY*10 - (this.widthCube/2), (this.depthCube/2)-this.widthCube/2);
            this.mesh.scale.z -= 0.01;
            this.playSound(this.depthCube);
        }
    };

    Cube.prototype.playSound = function(note) {
        switch(note) {
            case 7:
                this.color = 0x28224a;
                idSound = "blank";
                break;

            case 8:
                this.color = 0x59548f;
                idSound = "c";
                break;

            case 9:
                this.color = 0x2a2f56;
                idSound = "d";
                break;

            case 10:
                this.color = 0x2c446f;
                idSound = "e";
                break;

            case 11:
                this.color = 0x4d73a0;
                idSound = "f";
                break;

            case 12:
                this.color = 0x538ab2;
                idSound = "g";
                break;

            case 13:
                this.color = 0x69acbc;
                idSound = "a";
                break;

            case 14:
                this.color = 0x8fc4b5;
                idSound = "b";
                break;

            case 15:
                this.color = 0x6ca995;
                idSound = "c7";
                break;

            case 16:
                this.color = 0x99e5cc;
                idSound = "d7";
                break;

            case 17:
                this.color = 0x728164;
                idSound = "e7";
                break;

            case 18:
                this.color = 0xa8cb7a;
                idSound = "f7";
                break;

            case 19:
                this.color = 0xc9e986;
                idSound = "g7";
                break;

            case 20:
                this.color = 0xa09d6b;
                idSound = "a7";
                break;

            case 21:
                this.color = 0xb6b37b;
                idSound = "b7";
                break;

            default:
                this.color = 0x1d173d;
                idSound = "blank";
                break;
        }
        if(idSound == "blank") {
            setTimeout(function(){},100);
        }
        else {
            var sound = document.getElementById(idSound);
            sound.play();
            setTimeout(function(){sound.pause()},100);
        }
    }

    Cube.prototype.resetColors = function() {
        this.material.emissive = new THREE.Color(0x000000);
    };

    Cube.prototype.resetPosition = function() {
        TweenLite.to(this.mesh.position, 2, {z: (this.depthCube/2)-this.widthCube/2, ease:Elastic.easeOut})
    };

    Cube.prototype.randomize = function() {
        this.depthCube = Math.floor(Math.random() * (21 - 7 + 1)) + 7;
        switch(this.depthCube) {
            case 7:
                this.color = 0x28224a;
                break;

            case 8:
                this.color = 0x59548f;
                break;

            case 9:
                this.color = 0x2a2f56;
                break;

            case 10:
                this.color = 0x2c446f;
                break;

            case 11:
                this.color = 0x4d73a0;
                break;

            case 12:
                this.color = 0x538ab2;
                break;

            case 13:
                this.color = 0x69acbc;
                break;

            case 14:
                this.color = 0x8fc4b5;
                break;

            case 15:
                this.color = 0x6ca995;
                break;

            case 16:
                this.color = 0x99e5cc;
                break;

            case 17:
                this.color = 0x728164;
                break;

            case 18:
                this.color = 0xa8cb7a;
                break;

            case 19:
                this.color = 0xc9e986;
                break;

            case 20:
                this.color = 0xa09d6b;
                break;

            case 21:
                this.color = 0xb6b37b;
                break;

            default:
                this.color = 0xcfcc97;
                break;
        }
        this.material.color.setHex(this.color);
        this.mesh.position.set(this.posX*10 + (this.widthCube/2), this.posY*10 - (this.widthCube/2), ((this.depthCube/2)-this.widthCube/2));
    };

    return Cube;
})();