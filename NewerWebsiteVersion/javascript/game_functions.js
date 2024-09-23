function Rules(){
    alert("The rules for this are simple.")
}

function DrawBoard(){
    let c = document.getElementById("board");
    let ctx = c.getContext("2d");
    let counter, CurrentVal;

    ctx.beginPath();
        

    for(let i=0;i<5;i++){
        CurrentVal=100*i;
        ctx.moveTo(CurrentVal,0);
        ctx.lineTo(CurrentVal,400);
        ctx.moveTo(0,CurrentVal);
        ctx.lineTo(400,CurrentVal);
    }


    ctx.moveTo(0,0);
    ctx.lineTo(400,400);
    ctx.moveTo(0,400);
    ctx.lineTo(400,0);

    ctx.moveTo(0,200);
    ctx.lineTo(200, 0);
    ctx.lineTo(400, 200);
    ctx.lineTo(200, 400);
    ctx.lineTo(0, 200);
    ctx.stroke();
}