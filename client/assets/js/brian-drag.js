var dragX, dragY, icon, dragging, positionY, positionX;




//Start the dragging process
//Trigger with mousedown event
function startDrag(){
    console.log('start drag')
    dragX = event.clientX;
    dragY = event.clientY;
    dragging = true;
}
//Make each element Draggable
//Trigger with mousemove event
function drag(){

    if(dragging){
        console.log('dragging')
        positionY = parseFloat(this.style.marginTop.substr(0,this.style.marginTop.length-1));
        positionX = parseFloat(this.style.marginLeft.substr(0,this.style.marginLeft.length-1));
        positionX+=100*(event.clientX-dragX)/window.innerWidth;
        positionY+=100*(event.clientY-dragY)/window.innerWidth;
        this.style.marginTop = positionY+'%';
        this.style.marginLeft = positionX+'%';
        dragX = event.clientX;
        dragY = event.clientY;
    }
}
//End the dragging process
//Trigger with mouseup event
function endDrag(){
    dragging = false
    if(this.id == 'menu'){
        localStorage.menuY = JSON.stringify(this.style.marginTop);
        localStorage.menuX = JSON.stringify(this.style.marginLeft);
    }else if(this.id == 'title'){
        localStorage.titleY = JSON.stringify(this.style.marginTop);
        localStorage.titleX = JSON.stringify(this.style.marginLeft);
    }else if(this.id == 'login'){
        localStorage.loginY = JSON.stringify(this.style.marginTop);
        localStorage.loginX = JSON.stringify(this.style.marginLeft);
    }else if(this.id == 'preferences'){
        localStorage.preferencesY = JSON.stringify(this.style.marginTop);
        localStorage.preferencesX = JSON.stringify(this.style.marginLeft);
    }else if(this.id == 'highscore'){
        localStorage.highscoreY = JSON.stringify(this.style.marginTop);
        localStorage.highscoreX = JSON.stringify(this.style.marginLeft);
    }
}

icon = document.querySelector('.draggable-marker');
icon.addEventListener('mousedown', startDrag);

icon.addEventListener('mousemove', drag);
icon.addEventListener('mouseup', function(e) {
    console.log('end');
    endDrag();
});


