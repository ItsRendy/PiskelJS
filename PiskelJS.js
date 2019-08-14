class Drawer {
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');    
        
        this.width = canvas.width;
        this.height = canvas.height;
    }
    
    static FromID(id){
        return new Drawer(document.getElementById(id));   
    }
    Clear(color){
	this.context.fillStyle = color;
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    DrawRect(x, y, width, height, rotation, color){
        this.context.rotate(rotation * Math.PI / 180);
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);   
    }
    DrawCircle(x, y, radius, color){
        this.context.fillStyle = color;
        this.context.beginPath();
	    this.context.arc(x, y, radius, 0, Math.PI * 2);
	    this.context.fill();   
    }
    DrawText(text, size, color, x, y, rotation){
        this.context.rotate(rotation * Math.PI / 180);
        this.context.font = size + "px " + "italic";
	    this.context.fillStyle = color;
	    this.context.fillText(text, x, y);
    
    }
    /*DrawParticales(x, y, size, color, object, duration){
        if (object == "Circle" && ){
            screen.DrawCircle(x, y, size, color);
        }
    }*/
    DrawTexture(texture, x, y, width, height){
        this.context.drawImage(texture, x, y, width, height);
    }
    DrawAnimation(animation, x, y, width, height, frame){
        let frameData = animation.frames[frame % animation.frames.length];
        this.context.drawImage(animation.texture, frameData.x, frameData.y, frameData.width, frameData.height, x, y, width, height);
    }
}

class Animation {
    constructor(texture, frames) {
        this.texture = texture;
        this.frames = frames;
    }
}

let screen = Drawer.FromID("canvas");

function Random(min, max){
    return Math.floor(Math.random() * (max - min)) + min;    
}

function LoadTextures(paths){
    return new Promise((resolve, reject) => {
        images = [];
        for(let path of paths){
            let img = new Image();
            img.onload = () => {
                images.push(img);
                if(images.length == paths.length) resolve(images);
            }
            img.src = path;
        }
    });
}

