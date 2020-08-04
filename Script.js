function SaveData()
{ 
    if(document.getElementById("Remember").checked==true)
    {
        localStorage.setItem("name",document.getElementById("name").value);
        console.log("Data Saved");
    }
    else
    {
        localStorage.removeItem("name");  
        console.log("Data Deleted");
    }
}

function RetriveData()
{
    document.getElementById("name").value=localStorage.getItem("name");
}

function ResetStyle()
{
    for(let i=0;i<24;i++)
    {
    document.getElementsByName("Fake"+i)[0].style.transform="scale(1)";
    document.getElementsByName("Real"+i)[0].style.transform="scale(0)";
    }
}
function BackImg(num)
{
    document.getElementsByName("Fake"+num)[0].style.transition="all 1s ease ";
    document.getElementsByName("Fake"+num)[0].style.transform = "scale(0)"; 
    document.getElementsByName("Real"+num)[0].style.transition="all 2s ease ";
    document.getElementsByName("Real"+num)[0].style.transform="scale(1) ";
}

function FrontImg(numb)
{
    document.getElementsByName("Fake"+numb)[0].style.transition="all 1s ease ";
    document.getElementsByName("Fake"+numb)[0].style.transform = "scale(1)";
    document.getElementsByName("Real"+numb)[0].style.transition="all 1s ease ";
    document.getElementsByName("Real"+numb)[0].style.transform="scale(0) ";
}
var counter=0;
var Flipped=[];
var FlippedNo=0;
var StopTimer;
var RightMatch=0;
function FlipPic(no)
{   
    
    if(document.getElementsByName("Fake"+no)[0].style.transform =="scale(1)" &&counter<2)
    {
        FlippedNo++;
        BackImg(no);
        Flipped[counter]=no;
       if(counter==1 &&FlippedNo==2)
       { 
          setTimeout(CheckSimilarity,1000); 
       }
        counter++;
    }

    else if(document.getElementsByName("Real"+no)[0].style.transform =="scale(1)" &&counter<2)
    {
        FlippedNo--;
        counter--;
        FrontImg(no);
    }  
}

function CheckSimilarity()
{  
    if( document.getElementsByName("Real"+Flipped[0])[0].src===document.getElementsByName("Real"+Flipped[1])[0].src )
    {
        counter=0;
        FlippedNo=0;
        UnClickableFlippedPic(0);
        UnClickableFlippedPic(1);
        RightMatch++;
    }
    if( document.getElementsByName("Real"+Flipped[0])[0].src !=document.getElementsByName("Real"+Flipped[1])[0].src)
    {
        FrontImg(Flipped[0]);
        FrontImg(Flipped[1]);
        counter=0;
        FlippedNo=0;
    }  
}
function UnClickableFlippedPic(num)
{
    document.getElementsByName("Real"+Flipped[num])[0].style.pointerEvents="none";
    document.getElementsByName("Real"+Flipped[num])[0].style.cursor="none";
}
function UnClickableUnFlippedPic(num)
{
    document.getElementsByName("Fake"+num)[0].style.pointerEvents="none";
    document.getElementsByName("Fake"+num)[0].style.cursor="none";
}
function ClickableUnFlippedPic(num)
{
    document.getElementsByName("Fake"+num)[0].style.pointerEvents="auto";
    document.getElementsByName("Fake"+num)[0].style.cursor="pointer";
}
var min=4;
var sec=60;
var IsPaused=false;
function Timer()
{ 
    document.getElementById("timer").innerHTML=min+" : "+sec;
    StopTimer=setInterval(() => {
        IsPaused=false;
        if(min==0 && sec==0)
        {   
            StopTime();
        }
        else if(sec>0)
        {
            sec--;
            Score();
            CheckResult();
         if(sec==0&&min>0)
        {
            sec=60;
            min--;
            
        }}
        document.getElementById("timer").innerHTML=min+" : "+sec;
    }, 1000);
} 
function StopTime()
{
    console.log("time oout");
    clearInterval(StopTimer);
    if(RightMatch!=12)
    {
        name= localStorage.getItem("name");
        if(name==='null')
        {
            document.getElementById("result").innerHTML="Hard Luck Next Time ,Kido";
        }
        else
        {
            document.getElementById("result").innerHTML="Hard Luck Next Time ," +localStorage.getItem("name");
        }
        for(let i=0;i<24;i++)
        {
            UnClickableUnFlippedPic(i);
            if(FlippedNo>0)
            {
                FrontImg(Flipped[0]);
            }
        }
    }
}
function CheckResult()
{
    if(RightMatch==12)
    {
        clearInterval(StopTimer);
        name= localStorage.getItem("name");
        if(name==='null')
        {
             document.getElementById("result").innerHTML="Congratulation Kido ,you won";
        }
        else
        {
            document.getElementById("result").innerHTML="Congratulation "+localStorage.getItem("name") +" ,you won";
        }
    }
}
function Score()
{
    document.getElementById("Score").innerHTML=RightMatch+" / "+12;
}
function Pause()
{
    if(IsPaused==false)
    {
        IsPaused=true;
        clearInterval(StopTimer);
        for(let i=0;i<24;i++)
        {
            UnClickableUnFlippedPic(i);
        }
    }
    else if(IsPaused==true)
    {
        Timer();
        for(let i=0;i<24;i++)
        {
            ClickableUnFlippedPic(i);
        }
    }
    
}