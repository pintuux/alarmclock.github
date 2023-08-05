let dis =null;
let alarmstop=null;
let selectedOptionValue = null;
let prev = null;
let duration = 1;
let currentImageIndex = 0;
const interval = 3000;
let audioElement = null;
const imagePaths = [
    './image/pexels-alba-chiara-oldoini-2567550.jpg',
    './image/pexels-cindy-gustafson-670741.jpg',
    './image/pexels-anthony-📷📹🙂-132474.jpg',
    './image/pexels-anthony-📷📹🙂-133472.jpg',
    './image/pexels-arnie-chou-927414.jpg',
    './image/pexels-cottonbro-studio-4506840.jpg',
    './image/pexels-irina-iriser-1122639.jpg',
    './image/pexels-james-wheeler-417074.jpg',
    './image/pexels-josh-hild-2448749.jpg',
    './image/pexels-kristine-tanne-2405369.jpg',
    './image/pexels-leigh-patrick-298246.jpg',
    './image/pexels-nina-uhlikova-725255.jpg',
    './image/pexels-nina-uhlikova-725255.jpg',
    './image/pexels-pixabay-237018.jpg',
    './image/pexels-pixabay-268533.jpg',
    './image/pexels-pixabay-45853.jpg',
    './image/pexels-pixabay-459203.jpg',
    './image/pexels-pok-rie-1319750.jpg',
    './image/pexels-raphael-brasileiro-2179204.jpg',
    './image/pexels-rov-camato-699963.jpg'
];
const durRation = document.getElementsByClassName('duration');
const textdisplay = document.getElementById('textdisplay');
const slideshowContainer = document.getElementById('display-alarm');
function changeBackgroundImage() {
  slideshowContainer.style.backgroundImage = `url('${imagePaths[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
  return;
}
changeBackgroundImage();
const picInterval = setInterval(changeBackgroundImage, interval);
const timeout = setTimeout( ()=>{
      clearInterval(picInterval);
      clearTimeout(timeout);
      return;
},60*1000)
for(let i of durRation){
    i.addEventListener('click',(e)=>{
        duration = e.target.value;
       return;
    })
}
function toggleDivVisibility(i) {
    const div = document.getElementById("display-Alarm-Tone");
    const div2 = document.getElementById("display-alarm")
    const div1 = document.getElementById('display-Alarm-duration')
    if (div.style.display === "none" && i === 1) {
        div1.style.display = 'none';
        div2.style.display ="none";
        div.style.display = "block"; 
        return;
    }
    else if(div1.style.display === 'none' && i===2){
        div1.style.display='block';
        div2.style.display='none';
        div.style.display='none'
        return;
    }
    else {
        div.style.display = "none";
        div2.style.display ="flex";
        div1.style.display='none' 
        return;
    }  
}
function getSelectedOption() {
    const radioButtons = document.querySelectorAll('input[name="color"]');
    for (let radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedOptionValue = radioButton.value;
            break; 
        }
    }
    return;
}
function setAlarm(){ 
    alert('Alarm has been set successfully');
    getSelectedOption();
    if(prev!== null){
        audioElement = document.getElementById(prev);
        audioElement.pause();
        prev=null;
    }
    const alarmTime = document.getElementById('set-time').value;
    const alarmDate = document.getElementById('set-date').value;
    textdisplay.textContent = alarmTime;
    const [year,month,day] = alarmDate.split('-'); 
    const convertedDate = `${day}/${month}/${year}`;
    const [alarmHoure,alarmMinute] =  alarmTime.split(':');
    document.getElementById('set-time').value = ''
    document.getElementById('set-date').value = "";
    const alarmInterval = setInterval(()=>{
        const currentDate = (new Date()).toLocaleDateString();
        if(currentDate===convertedDate){
            const currentHoure = (new Date()).getHours();
            const currentMinute = (new Date()).getMinutes();
            if((parseInt(alarmHoure) === currentHoure)&& (parseInt(alarmMinute) === currentMinute)){
                playAlarm();
                clearInterval(alarmInterval);
                return;
            }
            return;
        }
    },1000);
    return ;
}   
function playAlarm(){
    audioElement = document.getElementById(selectedOptionValue);
    audioElement.play();
    prev = selectedOptionValue;
    dis = setInterval(()=>{
        const [hour,minute] = (new Date()).toTimeString().split(':')
        textdisplay.textContent = `${hour}:${minute}`;
        return;
    },1000)
    alarmstop = setTimeout(stopAlarm,duration*60*1000);
    return;
}
function stopAlarm(){
    audioElement.pause();
    clearInterval(dis);
    clearTimeout(alarmstop);
    textdisplay.textContent='Display';
    return ;
}
