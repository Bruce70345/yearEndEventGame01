let RotateDeg = 5400
//2000元、3000元、4000元、5000元、6000元、7000元、10000元
let wheelData = [
  { icon: 'movie', text: '3000元', amount: 1 }, // 9號 3000元
  { icon: 'cake', text: '6000元', amount: 1 }, // 1號 6000元
  { icon: 'stars', text: '5000元', amount: 1 }, // 2號 5000元
  { icon: 'child_care', text: '???', amount: 1 }, // 3號 安慰獎
  { icon: 'flight', text: '10000元', amount: 1 }, // 4號 10000元
  { icon: 'wifi', text: '7000元', amount: 1 }, // 5號 7000元
  { icon: 'music_note', text: '4000元', amount: 1 }, // 6號 4000元
  { icon: 'book', text: '???', amount: 1 }, // 7號 安慰獎
  { icon: 'sports_esports', text: '2000元', amount: 1 } // 8號 2000元
];


let box = document.querySelector(".box");
let centerButton = document.querySelector(".centerText");
let arrow = document.querySelector(".arrow");
let banner = document.querySelector(".bgBanner");
let rightFixDiv = document.querySelector(".rightFixDiv");
let leftFixDiv = document.querySelector(".leftFixDiv");
let status = false;
let allAmount = 0;
// 建立圓弧扇形
wheelData.forEach((item, i) => {
  let sector = document.createElement('div');
  sector.className = "sector sector-" + parseInt(i + 1);
  sector.dataset.amount = item.amount;
  let textGroup = document.createElement('div');
  textGroup.className = "textGroup";
  let p = document.createElement('p');
  p.className = "material-symbols-outlined";
  p.innerText = item.icon;
  let span = document.createElement('span');
  span.innerText = item.text;
  textGroup.appendChild(p);
  textGroup.appendChild(span);
  sector.appendChild(textGroup);
  box.appendChild(sector);
  allAmount = allAmount + item.amount;
});


let i = 0;
let isSetRadio = false
centerButton.onclick = function (e) {

  if (!isSetRadio) { alert("記得設定獲勝隊伍！"); isSetRadio = true; return; }
  // isSetRadio = true

  if (status) {
    return;
  }
  i++;
  status = true;
  const spinSound = document.getElementById("spin-sound");
  spinSound.play();
  let sector = document.querySelectorAll(".box .sector");
  for (var z = 0; z < sector.length; z++) {
    sector[z].classList.remove("chooseSector");
  }
  rotateFunction();
};

function rotateFunction() {
  let random = Math.floor(Math.random() * 9) + 1;
  // let random = 7
  // console.log(random)
  let nowDiv, preRotate, rotate;
  nowDiv = (random == document.querySelectorAll('.sector').length ? document.querySelector(".sector-1") : document.querySelector(".sector-" + parseInt(random + 1)));
  // 這裡控制是否重複抽
  if (nowDiv.dataset.amount == 0) {
    rotateFunction();
    // console.log("duplicated");
    return;
  }
  nowDiv.dataset.amount = nowDiv.dataset.amount - 1;
  arrow.classList.add("aniRotate");
  arrow.style.transform == "" ? preRotate = 0 : preRotate = parseInt(arrow.style.transform.split('(')[1].split('d')[0] - 1800);
  rotate = random * 40;
  document.styleSheets[1].insertRule(`
    @keyframes rotate{
      from{
          transform: rotate(`+ preRotate + `deg);
      }
      to{
          transform: rotate(`+ parseInt(rotate + RotateDeg) + `deg);
      }
    }`, 26 + i);
  arrow.style.transform = 'rotate(' + parseInt(rotate) + 'deg)';

  window.setTimeout((() => {
    nowDiv.classList.add("chooseSector");
    let history, text;
    const GameRadio = document.querySelector('input[name="game"]:checked').value;
    const TeamRadio = document.querySelector('input[name="team"]:checked').value;
    // console.log(GameRadio, TeamRadio)
    text = `<遊戲：${GameRadio}; 第${i}局; ${TeamRadio}; 獲得獎金 $${nowDiv.getElementsByTagName('span')[0].innerHTML} >  `;
    document.querySelector('.rightFixDiv h2').innerHTML = nowDiv.getElementsByTagName('span')[0].innerHTML + "!";
    if (localStorage.getItem('history') != null && i < 10) {
      history = localStorage.getItem('history');
      history = history + text
      localStorage.setItem('history', history);
    } else {
      localStorage.setItem('history', text);
    }
    // document.querySelector(".sessionText p").innerHTML =localStorage.getItem('history');
    status = false;
    // banner.style.display = "flex";
    rightFixDiv.style.display = "block";
    leftFixDiv.style.display = "block";
    arrow.classList.remove("aniRotate");
    document.styleSheets[1].deleteRule;
    //抽獎畫面！
    const BlackCover = document.querySelector("#cover")
    console.log(random)
    if (random === 1) { //6
      const doglalala = document.getElementById("doglalala");
      BlackCover.style.display = 'block'
      doglalala.style.display = 'block';
      doglalala.play();
      setTimeout(() => {
        doglalala.style.display = 'none';
        BlackCover.style.display = 'none'
        checkAllAmount()
      }, 9000);
    } else if (random === 2) { //5
      const greenLight = document.getElementById("greenLight");
      BlackCover.style.display = 'block'
      greenLight.style.display = 'block';
      greenLight.play();
      setTimeout(() => {
        greenLight.style.display = 'none';
        BlackCover.style.display = 'none'
        checkAllAmount()
      }, 10000);
    } else if (random === 3) { //0
      const TONY2 = document.getElementById("TONY2");
      BlackCover.style.display = 'block'
      TONY2.style.display = 'block';
      TONY2.play();
      setTimeout(() => {
        TONY2.style.display = 'none';
        BlackCover.style.display = 'none'
        checkAllAmount()
        document.querySelector('.rightFixDiv h2').innerHTML = "祝福語!";
      }, 18000);
    } else if (random === 4) { //1
      const CHUNG_HUA = document.getElementById("CHUNG_HUA");
      BlackCover.style.display = 'block'
      CHUNG_HUA.style.display = 'block';
      CHUNG_HUA.play();
      setTimeout(() => {
        CHUNG_HUA.style.display = 'none';
        BlackCover.style.display = 'none'
        checkAllAmount()
      }, 11000);
    } else if (random === 5) { //7
      const proudOf = document.getElementById("proudOf");
      BlackCover.style.display = 'block'
      proudOf.style.display = 'block';
      proudOf.play();
      setTimeout(() => {
        proudOf.style.display = 'none';
        BlackCover.style.display = 'none'
        checkAllAmount()
      }, 14000);
    } else if (random === 6) { //4
      const savings = document.getElementById("savings");
      BlackCover.style.display = 'block'
      savings.style.display = 'block';
      savings.play();
      setTimeout(() => {
        savings.style.display = 'none';
        BlackCover.style.display = 'none'
        checkAllAmount()
      }, 16000);
    } else if (random === 7) { //0
      const Chou = document.getElementById("Chou");
      BlackCover.style.display = 'block'
      Chou.style.display = 'block';
      Chou.play();
      setTimeout(() => {
        Chou.style.display = 'none';
        BlackCover.style.display = 'none'
        checkAllAmount()
        document.querySelector('.rightFixDiv h2').innerHTML = "祝福語!";
      }, 5000);
    } else if (random === 8) { //2
      const needle = document.getElementById("needle");
      BlackCover.style.display = 'block'
      needle.style.display = 'block';
      needle.play();
      setTimeout(() => {
        needle.style.display = 'none';
        BlackCover.style.display = 'none'
        checkAllAmount()
      }, 13000);
    } else { //3
      const WinStock = document.getElementById("WinStock");
      BlackCover.style.display = 'block'
      WinStock.style.display = 'block';
      WinStock.play();
      setTimeout(() => {
        WinStock.style.display = 'none';
        BlackCover.style.display = 'none'
        checkAllAmount()
      }, 6000)
    }
    // console.log(allAmount)
    allAmount--;
    isSetRadio = false
  }), 7000);
  function checkAllAmount() {
    if (allAmount == 0) {
      alert("獎品已全數抽取完畢!");
    }
  }

}

// if (localStorage.getItem('history') != null) {
//   // document.querySelector(".sessionText p").innerHTML = localStorage.getItem('history');
// }

document.querySelector("#clearData").addEventListener("click", function () {
  const data = JSON.stringify(localStorage);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "春酒獎項名單.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  localStorage.clear();

  alert("資料已匯出並清除！");
});
