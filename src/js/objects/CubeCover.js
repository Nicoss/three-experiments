var CubeCover = (function(){

    function CubeCover(posX, posY, color){
        THREE.Object3D.call(this);
        this.posX = posX;
        this.posY = posY;
        this.widthCube = 10;
        this.heightCube = 10;
        this.depthCube = 10;

        if(color == 7) {
            this.customColor = Math.floor(Math.random() * (9 - 7 + 1)) + 7;
        }
        else if(color == 12) {
            this.customColor = Math.floor(Math.random() * (14 - 12 + 1)) + 12;
        }

        switch(this.customColor) {
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
        this.mesh.position.set(this.posX*10 + (this.widthCube/2), this.posY*10 - (this.widthCube/2), this.depthCube - (this.widthCube/2));
        //this.mesh.position.set(this.posX*10 + (this.widthCube/2), this.posY*10 - (this.widthCube/2), 0);
        this.add(this.mesh);
    }

    CubeCover.prototype = new THREE.Object3D;
    CubeCover.prototype.constructor = CubeCover;

    CubeCover.prototype.upCube = function() {
        //console.log('upCube');
        if(this.customColor < 21) {
            this.customColor++;
            this.changeColor(this.customColor);
        }
    };

    CubeCover.prototype.downCube = function() {
        //console.log('downCube');
        if(this.customColor > 7) {
            this.customColor--;
            this.changeColor(this.customColor);
        }
    };

    CubeCover.prototype.changeColor = function(customColor) {
        switch(customColor) {
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
                this.color = 0x1d173d;
                break;
        }
    }

    CubeCover.prototype.randomize = function() {
        //var this.customColor = Math.floor(Math.random() * (21 - 7 + 1)) + 7;
        this.customColor = 7;
        switch(this.customColor) {
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

    return CubeCover;
})();