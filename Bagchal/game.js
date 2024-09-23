let Player="G";
let Position = [1,0,0,0,1,
                0,0,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,
                1,0,0,0,1];

            

let NewPosition = [1,0,0,0,1,
                   0,0,0,0,0,
                   0,0,0,0,0,
                   0,0,0,0,0,
                   1,0,0,0,1];                


var XPos = -1;
var YPos = -1;   
var XPosOld = -1;
var YPosOld = -1;                   
var IDNum = -1;  
var OldID = "Box-1"; 
var ID = "Box-1";                   
var SelectedTiger = -1;   
var NumberText = "";      
var PlaySound = true;      
 
let GoatStatus = "ADD";
let D_GoatNumber = 0;
let A_GoatNumber = 0;
let TigerFirstClick = false;
let TigerSecondClick = false;
let GoatFirstClick = true;
let GoatSecondClick = false;

const SnarlSound = new Audio('ShortSnarl.mp3');
const GoatSound = new Audio('GoatSound.mp3');

function Position2ID(Position){
    if(Position<10){Location="Box0"+Position.toString();}
    else{Location="Box"+Position.toString();}
    return Location 
}


function MoveGoat(IDNum){
    let OldIDNum = XPosOld+YPosOld*5;
    XPos = IDNum%5;
    YPos = Math.floor(IDNum/5);
    let XDiff = Math.abs(XPosOld-XPos);
    let YDiff = Math.abs(YPosOld-YPos);
    let XYOdd=(XPos+YPos)%2==1;   
    if(XYOdd && (XDiff+YDiff)>1 && XDiff>0 && YDiff>0){
        return false;
    }
    if(XDiff>1 || YDiff>1){
        return false;
    }
    return true;
}


function SwitchSound(SpeakerID){
    PlaySound = !PlaySound;
    console.log("Sound status");
    console.log(PlaySound);
    
    
    if(PlaySound){
        document.getElementById(SpeakerID).src = "speaker.jpg";
    }
    else{
        document.getElementById(SpeakerID).src = "nospeaker.jpg";
    }    
}

function DisplayPosition(Position){
       
    //plot the current position
    for(let x=0;x<25;x++){
        let Location = Position2ID(x); 
        

        if(Position[x]==1){
            //for tiger           
            document.getElementById(Location).style.border="25px solid #AA0000";
            document.getElementById(Location).style.opacity=1.0;
        }
        else if(Position[x]==2){
            //for goat's position
            document.getElementById(Location).style.border="25px solid #00AA00";
            document.getElementById(Location).style.opacity=1.0;
        }
        else{
            //for goat's position
            document.getElementById(Location).style.border="25px solid transparent";
        }
    }    
}


function CheckMoveValidity(Position, NewPosition){
    console.log("Inside move validity");
    //for the tiger
    if(TigerFirstClick){
        for(let x=0;x<25;x++){
            console.log("This is the ID number:");
            console.log(IDNum)
            if(Position[IDNum]==1){                     
                return true;
            }
        return false;
        }  

    } else if(TigerSecondClick){   
        
        if(Position[IDNum]==1 || Position[IDNum]==2){
            return false;
        }
        
        //check if the position is right next
        let XDiff = Math.abs(XPosOld-XPos);
        let YDiff = Math.abs(YPosOld-YPos);

        let XYOdd=(XPos+YPos)%2==1;
        
        if(XDiff>2 || YDiff>2 || (XDiff+YDiff)==3){
            return false;
        }

        
        if(XYOdd && (XDiff+YDiff)>1 && XDiff>0 && YDiff>0){
            return false;
        }

        if(XDiff==2 || YDiff==2){
            //check for goat;
            let XMid = (XPosOld+XPos)/2;
            let YMid = (YPosOld+YPos)/2;
            let CurLocation = XMid+YMid*5;
            if(Position[CurLocation]==2){
                //remove goat
                Position[CurLocation]==0;
                CurrentID = Position2ID(CurLocation);
                document.getElementById(CurrentID).style.border="25px solid transparent";
                A_GoatNumber--;
                D_GoatNumber++;
                document.getElementById("PlayerCount").innerHTML = "Tiger: 4 | Goat: "+A_GoatNumber.toString()+" | Dead Goat: "+D_GoatNumber.toString() ;
                Position[CurLocation]=0;
                DisplayPosition(Position);
                if(PlaySound){SnarlSound.play();}
                return true;
            }

            else{
                return false;
            }
        }
  
        if(IDNum==SelectedTiger){
            document.getElementById("PlayerTurnText").innerHTML = "Still Tiger's turn. Invalid move.";
            document.getElementById("PlayerTurnText").style.color="red";
            //check if there are anything present in the box
            return false;    
        }

        //check if 

        return true 
    } else{
        console.log("Checking for goat");
        console.log(Position);
        console.log(NewPosition);
        //if the goat is already present in the location
        if(Position[IDNum]==2){
            return false;
        }

        for(let x=0;x<25;x++){
            if(GoatStatus=="ADD"){
                if(Position[x]==1 && NewPosition[x]==2){
                    return false;
                }        
            }
        }
        return true;
    }
}

function BoardSetup(){
    let c = document.getElementById("board");
    let ctx = c.getContext("2d");
    let counter, CurrentVal;
    let StepSize = 30;
    ctx.lineWidth = 3;

    ctx.beginPath();
    console.log("Height "+c.clientHeight);
    
    ctx.stroke();
    ctx.strokeStyle='black';
    ctx.fillStyle='black';

    //ctx.setStrokeColor = (1,0,0,1);
    for(let i=0;i<5;i++){
        CurrentVal=StepSize*i;
        ctx.moveTo(CurrentVal,0);
        ctx.lineTo(CurrentVal,4*StepSize);
        ctx.moveTo(0,CurrentVal);
        ctx.lineTo(4*StepSize,CurrentVal);
    }


    ctx.moveTo(0,0);
    ctx.lineTo(4*StepSize,4*StepSize);
    ctx.moveTo(0,4*StepSize);
    ctx.lineTo(4*StepSize,0);

    ctx.moveTo(0,2*StepSize);
    ctx.lineTo(2*StepSize, 0);
    ctx.lineTo(4*StepSize, 2*StepSize);
    ctx.lineTo(2*StepSize, 4*StepSize);
    ctx.lineTo(0, 2*StepSize);
    ctx.imageSmoothingEnabled = true;
    ctx.stroke();

    DisplayPosition(Position);
}



function RestartGame(){
    Player="G";
    Position = [1,0,0,0,1,
                0,0,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,
                1,0,0,0,1];

    NewPosition = [1,0,0,0,1,
                   0,0,0,0,0,
                   0,0,0,0,0,
                   0,0,0,0,0,
                   1,0,0,0,1];                
    
    XPos = -1;
    YPos = -1;   
    XPosOld = -1;
    YPosOld = -1;                   
    IDNum = -1;  
    OldID = "Box-1";
    ID = "Box-1";                   
    SelectedTiger = -1;   
    NumberText = "";            
 
    GoatStatus = "ADD";
    D_GoatNumber = 0;
    A_GoatNumber = 0;

    TigerFirstClick = false;
    TigerSecondClick = false;

    //BoardSetup()
    DisplayPosition(Position)
    document.getElementById("PlayerCount").innerHTML = "Tiger: 4 | Goat: "+A_GoatNumber.toString()+" | Dead Goat:"+D_GoatNumber.toString() ;
}    


function GamePlay(ID){
    console.log(ID);     
    IDNum = parseInt(ID.slice(3,5));
    XPos = IDNum%5;
    YPos = Math.floor(IDNum/5);
    //DisplayCurrentPosition(Position);
    
    if((A_GoatNumber+D_GoatNumber)==20){GoatStatus="MOVE";}
    else{GoatStatus=="ADD"}
        
    

    //switch the player
    if(Player=="G"){
        console.log("Goat player");
        NewPosition = [...Position];
        NewPosition[IDNum] = 2;

        if(GoatStatus == "ADD"){
            if(CheckMoveValidity(Position, NewPosition)){ 
            Player="T";
            Position[IDNum] = 2;
            A_GoatNumber++;
            TigerFirstClick=true;
            TigerSecondClick=false;
            if((A_GoatNumber+D_GoatNumber)==20){
                GoatStatus = "Move";
            }
            if(PlaySound){GoatSound.play();}
            document.getElementById(ID).style.border="25px solid #00AA00";
            document.getElementById(ID).style.opacity=1;
            document.getElementById("PlayerTurnText").innerHTML = "Tiger's Turn";
            document.getElementById("PlayerTurnText").style.color = "black";
            document.getElementById("PlayerCount").innerHTML = "Tiger: 4 | Goat: "+A_GoatNumber.toString()+" | Dead Goat: "+D_GoatNumber.toString();
            } 
            else{
                document.getElementById("PlayerTurnText").innerHTML = "Goat's turn. Invalid Move!";
                document.getElementById("PlayerTurnText").style.color= "red";
            }

        }else if(GoatStatus=="MOVE"){
            //valid selection
            console.log("Inside GoatMove");
            if(GoatFirstClick){            
                if(Position[IDNum]==2){
                    console.log("This is first click");    
                    document.getElementById(ID).style.opacity=0.5;
                    XPosOld = XPos;
                    YPosOld = YPos;
                    OldID = ID;
                    OldIDNum = IDNum;
                    GoatFirstClick = false;
                    GoatSecondClick = true;
                }
                else{
                    document.getElementById("PlayerTurnText").innerHTML = "Goat's turn. Invalid Move!";
                    document.getElementById("PlayerTurnText").style.color= "red";
                }
            }else if(GoatSecondClick){
                if(Position[IDNum]==0 && MoveGoat(IDNum)){
                     if(PlaySound){GoatSound.play();}
                     document.getElementById(ID).style.border="25px solid #00AA00";
                     document.getElementById(ID).style.opacity=1;
                     document.getElementById(OldID).style.border="25px solid transparent";
                     document.getElementById("PlayerTurnText").innerHTML = "Tiger's Turn";
                     document.getElementById("PlayerTurnText").style.color = "black";
                     document.getElementById("PlayerCount").innerHTML = "Tiger: 4 | Goat: "+A_GoatNumber.toString()+" | Dead Goat: "+D_GoatNumber.toString();
                     Player="T";   
                     Position[IDNum] = 2;
                     Position[OldIDNum] = 0;
                     GoatFirstClick = true;
                     GoatSecondClick = false;
                     TigerFirstClick=true;
                     TigerSecondClick=false;
                    }
                    else{
                        document.getElementById("PlayerTurnText").innerHTML = "Goat's turn. Invalid Move!";
                        document.getElementById("PlayerTurnText").style.color= "red";
                    }    
                }    
            else{
                document.getElementById("PlayerTurnText").innerHTML = "Goat's turn. Invalid Move!";
                document.getElementById("PlayerTurnText").style.color= "red";
            }

        }

    }else{
        //Tiger selection
        console.log("Tiger's turn");
        console.log(Position);
        console.log(NewPosition);
        NewPosition[IDNum] = 1;

        //has to be before the first tiger click
        if(TigerFirstClick){
            SelectedTiger=IDNum;
            console.log("First move for tiger"+ IDNum.toString());                   
            if(CheckMoveValidity(Position, NewPosition)){ 
                console.log("Valid first move!!")
                document.getElementById(ID).style.opacity= 0.5;
                TigerFirstClick= false;
                TigerSecondClick = true;
                SelectedTiger= IDNum;
                XPosOld = XPos;
                YPosOld = YPos;
            }else{
                document.getElementById("PlayerTurnText").innerHTML = "Still Tiger's turn. Invalid Move";
                document.getElementById("PlayerTurnText").style.color="red";
            }
            
            
        } else if(TigerSecondClick){
            console.log("Inside second tiger click");
            console.log(SelectedTiger);
            if(CheckMoveValidity(Position, NewPosition)){
                console.log("Valid second move");
                TigerSecondClick = false;
                Player="G";
                console.log("Before displaying position");    
                console.log(Position);
                Position[SelectedTiger]=0;
                Position[IDNum]=1;

                //Construct ID of previous case to repaint it with border
                if(SelectedTiger<10){
                    TigerLoc="Box0"+SelectedTiger.toString();
                }else{
                    TigerLoc="Box"+SelectedTiger.toString();
                } 
                console.log("The tiger location is:")
                console.log(TigerLoc);
                

                DisplayPosition(Position);
                
                document.getElementById(TigerLoc).style.border="25px solid transparent";
                document.getElementById("PlayerTurnText").innerHTML = "Goat's Turn";
                document.getElementById("PlayerTurnText").style.color="black";
                if(PlaySound){SnarlSound.play();}
            }
            else{
                document.getElementById("PlayerTurnText").innerHTML = "Still Tiger's turn. Invalid move.";
                document.getElementById("PlayerTurnText").style.color="red";
            }
        }
     
    }

}

BoardSetup()
DisplayPosition(Position)