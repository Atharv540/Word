var documents, textColor, bgColor, fontSize, reset, spaces, boldB, val, italicB, ival, wcase, fVariant, hText
var qM, iM, spacS, countW, dotB, dotC,holder, countS, documentLLL, htmlL, drop, speech, speak, rec;
function setup(){
speech = new p5.Speech("Microsoft David - English (United States)");
let lang = navigator.language || 'en-US';
rec = new p5.SpeechRec(lang, gotSpeech);
let continuous = true;
let interim = true;
rec.start(continuous, interim);
documents = select("#document");
documents.position(400,200);
qM = select("#q");
iM = select("#i");
hText = window.getSelection().toString();
textColor = select("#textColor");
textColor.size(100,20);
textColor.position(50,50);
bgColor = select("#bgColor");
bgColor.position(50,100);
bgColor.size(100,20);
fontSize = createSlider(12,100,12);
fontSize.position(160,50);
holder = 1;
reset = select("#reset");
reset.position(180,95);
boldB = select("#bold");
boldB.position(350,95);
italicB = select("#italic");
italicB.position(380,95);
qM.position(350,120);
iM.position(380,120);
wcase = select("#case");
wcase.position(450,95);
speak = select("#speak");
speak.position(260,95);
ival = 0;
val = 0;
countS = 0;
dotB = select("#dot");
dotB.position(405,120);
fVariant = createSelect();
fVariant.option("Normal");
fVariant.option("Small-caps");
fVariant.option("All-small-caps");
fVariant.option("Petite-caps");
fVariant.option("All-petite-caps");
fVariant.option("Unicase");
fVariant.option("Titling-caps");
fVariant.position(550,95);
spacS = createSelect();
countW = select("#countW");
countW.position(700,95);
spacS.position(660,95);
htmlL = createP();
drop = select("#voices");
drop.position(300,50);
//documentLLL = [];
dotC = 0;
for(i=0; i<31; i+=2){
  spacS.option(i);
}
}
function draw(){
documents.size(700,800);
speak.mousePressed(function(){
speech.setVoice(drop.value());
speech.speak(documents.value());
})
htmlL.html(hText);
spacS.style("background-color", "grey");
spacS.style("font-family", "Calibri");
fVariant.style("background-color", "grey");
fVariant.style("font-family", "Calibri");
textColor.style("border-radius", "0%");
bgColor.style("border-radius", "0%");
documents.style("color", textColor.value());
documents.style("background-color", bgColor.value());
documents.style("font-size", fontSize.value()+"px");
documentL = documents.value().split("");
documentLL = documents.value().split("");
documents.style("font-variant-caps", fVariant.value());
documents.style("text-transform", wcase.value());
documents.style("word-spacing", spacS.value()+"px");
boldB.mousePressed(function(){
  val += 1;
})
italicB.mousePressed(function(){
  ival+=1;
})
qM.mousePressed(function(){
  documentL.push("?");
  documents.value(documentL.join(''));
})
iM.mousePressed(function(){
  documentL.push("!");
  documents.value(documentL.join(''));
})
for(i=0; i<documentL.length; i++){
  if(documentL[i]===" "|| documentL[i]==="."|| documentL[i]==="?"|| documentL[i]==="!"|| documentL[i]==="•"|| documentL[i]==="*"){
    countS++
    documentLL.pop();
  }
}
//console.log(documentLL);
//for(i=0; i<countS; i++){
//  removeS = documentLL.indexOf(" ");
  //documentLL = documentLL.splice(removeS);
//}
countW.value(documentLL.length);
//console.log(countW.value());
//spaces = documentL.count(" ");
if(documentL.length>=1 && documentL.includes(" ") === true){
documentL[0]=documentL[0].toUpperCase();
documents.value(documentL.join(''));
}
for(i = 0; i<documentL.length; i++){
  if(documentL[i] === "i"){
    if(documentL[i-1] === " "){
      if(documentL[i+1] === "." ||documentL[i+1] === " " || documentL[i+1] === "?" ||documentL[i+1] === "!"){
        if(keyCode === 32 || keyCode === 13){
    documentL[i]="I";
    documents.value(documentL.join(''));
  }
  }
  }
  }
}
for(i = 0; i<documentL.length; i++){
  if(documentL[i-1] === " "){
    if(keyCode === 32 || keyCode === 13){
    if(documentL[i-2]==="." || documentL[i-2]==="!" || documentL[i-2]==="?"){
    documentL[i]=documentL[i].toUpperCase();
    documents.value(documentL.join(''));
  }
  }
  }
}
for(i=0; i<documentL.length; i++){
  if(documentL[i-1]===" " && documentL[i]==="*" && keyCode === 32 || documentL[0]==="*"&& keyCode === 32){
    documentL[i]=" • ";
    documents.value(documentL.join(''));
  }
}
dotB.mousePressed(function(){
  dotC++;
})

if(val%2 !== 0){
  documents.style("fontWeight", "1000");
  boldB.style("background-color", "grey");
}
else{
  documents.style("fontWeight", "400");
  boldB.style("background-color", "white");
}
if(ival%2 !== 0){
  documents.style("font-style", "italic");
  italicB.style("background-color", "grey");
}
else{
  documents.style("font-style", "normal");
  italicB.style("background-color", "white");
}

}
function gotSpeech(){
  if(rec.resultValue){
    documents.value(document.value()+rec.resultString);
  }
}
