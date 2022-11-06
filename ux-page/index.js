let pause = true;
let audio1 = document.getElementById("audio1");
let colors = [ '#42A5F5','#EF5350','#FFCA28','#66BB6A']
let tt = document.getElementsByTagName("tbody")[0];
let playA = false;
const messageBox = document.getElementById('message');
let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let tbody = [];
function random(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const loadPage = () => {
  tt.innerHTML = '';
  for (let i = 0; i < 11; i++) {
    let tds = [];
    for (let j = 0; j < 11; j++) {
      let td = `<td>${letters[random(0, 23)].toUpperCase()}</td>`;
      tds.push(td);
    }
    let tr = `<tr>${tds.join("")}</tr>`;
    tt.innerHTML += tr;
    tbody.push(tds);
  }
}
loadPage()
let poss = [];
let check = false;
let mate1 = [
  { word: "UX", line: random(0, 1) == 0 ? "v" : "h", pos: 0, placed: false , solved: false},
  { word: "Figma", line: random(0, 1) == 0 ? "v" : "h", pos: 0, placed: false,  solved: false },
  { word: "XD", line: random(0, 1) == 0 ? "v" : "h", pos: 0, placed: false,  solved: false },
  { word: "GDSC", line: random(0, 1) == 0 ? "v" : "h", pos: 0, placed: false,  solved: false },
];
const setWords = (data = mate1, titles, para) => {
  console.log('start')
  let index = 0;
  while (index != data.length) {
    let x = random(0, 9);
    let y = random(0, 9);
    if (!poss.includes([x, y])) {
      if (data[index].line == "v" && data[index].word.length + y <= 10) {
        
        for (let i = y; i <= data[index].word.length + y -1; i++){
          console.log(data[index].line,x+" "+i)
          tbody[i][x] = `<td data-belong-to="${data[index].word}" line="${data[index].line}">${
            data[index].word.charAt(data[index].pos++).toUpperCase()
          }</td>`;
          console.log(tbody[x][i], data[index].word)
          
        }
        data[index].placed = true;
        poss.push([x,y])
        }
        else if (data[index].line == "h" && data[index].word.length + x <= 10) {
          for (let i = x; i <= data[index].word.length+x -1; i++) {
            console.log('pos ==> ', tbody[x][i])
            tbody[y][i] = `<td data-belong-to="${data[index].word}" line="${data[index].line}">${
              data[index].word.charAt(data[index].pos++).toUpperCase()
            }</td>`;
          }
          poss.push([x,y])
          data[index].placed = true;
          
        }
      }
      if (!data[index].placed) continue;
      
      check = data.every((e) => e.placed);
      let style = document.createElement('style');
      style.innerHTML = `
      [data-belong-to="${data[index].word}"]:hover,
      [data-belong-to="${data[index].word}"][active],
      [data-belong-to="${data[index].word}"][check],
      [data-belong-to="${data[index].word}"][hover] {
        color: ${colors[random(0,3)]};
      }
      [data-belong-to="${data[index].word}"][check][line="h"]::after,
      [data-belong-to="${data[index].word}"][check][line="v"]::after {
        background: ${colors[random(0,3)]};
      }
      `
      document.getElementsByTagName('head')[0].appendChild(style);
      index++;
    }
    console.log('table ==> ',  tbody)
    tt.innerHTML =''
    for(let i =0; i < tbody[0].length; i++) 
    tt.innerHTML +=tbody[i].join('')

    
document.querySelectorAll("[data-belong-to]").forEach((ele) => {
  ele.addEventListener("click", () => {
    if (!ele.getAttribute("check")) {
      document.querySelectorAll("[data-belong-to]").forEach((ele2, i) => {
        if (
          ele.getAttribute("data-belong-to") ==
          ele2.getAttribute("data-belong-to")
        ) {
          ele2.setAttribute("check", "true");
        }
      });
      party.confetti(ele, {
        count: party.variation.range(20, 40),
      });
      data.find(item =>item.word == ele.getAttribute('data-belong-to')).solved = true;
    } else {
      document.querySelectorAll("[data-belong-to]").forEach((ele2) => {
        if (
          ele.getAttribute("data-belong-to") ==
          ele2.getAttribute("data-belong-to")
        ) {
          ele2.removeAttribute("check");
        }
      });
      data.find(item =>item.word == ele.getAttribute('data-belong-to')).solved = false;
    }
  });
  ele.addEventListener("mouseover", (eve) => {
    pause = false;
    document.querySelectorAll("[data-belong-to]").forEach((ele2) => {
      if (
        ele.getAttribute("data-belong-to") ==
        ele2.getAttribute("data-belong-to")
      ) {
        // ele2.setAttribute('check', 'true')
        ele2.setAttribute("hover", "true");
      }
    });
  });
  ele.addEventListener("mouseout", (eve) => {
    pause = true;
    document.querySelectorAll("[data-belong-to]").forEach((ele2) => {
      ele2.removeAttribute("hover");
      // ele2.removeAttribute('check')
    });
  });
  document.getElementById('title').innerHTML = titles[random(0, titles.length -1)];
  document.getElementById('content').innerHTML = para[random(0, para.length -1)];
  mate1 = data;
});
  }
setInterval(() => {
  document.querySelectorAll("[data-belong-to]").forEach((ele) => {
    if (pause && !ele.getAttribute("check")) {
      if (!ele.getAttribute("animate")) ele.setAttribute("animate", "true");
      else ele.removeAttribute("animate");
    }
  });
if(mate1.every(ele => ele.solved)) {
  if(!playA) {
    audio1.play();
    playA = true
  }

  messageBox.style.display= 'block';
  messageBox.style.animation = "message-in 0.6s forwards";
  
}
else {
  playA = false
  messageBox.style.animation = "message-out 0.6s forwards";
  setTimeout(() =>  {

    messageBox.style.display= 'none';
  },600)
}

}, 1000);

const img1 = document.getElementById('img1');
const img3 = document.getElementById('img3');
const img4 = document.getElementById('img4');
const logo = document.getElementById('logo');
document.addEventListener('mousemove', eve => {
    img1.style.bottom = eve.movementY+"px";
    img1.style.right = eve.movementX+"px";


    img3.style.top = eve.movementY+"px";
    img3.style.left = eve.movementX+"px";

    img4.style.bottom = eve.movementY+"px";
    img4.style.left = eve.movementX+"px";

    logo.style.top = (eve.movementY *2)+"px";
    logo.style.right = eve.movementX*2+"px";

    
})


let data = []
let words = []
let titles = []
let para = []
// 1Z--4dizp3ExZXBEh9YpSfPVVK8FeJYKPBny2jxPqcKo
const getData = () => {
  const sheetId = '1Z--4dizp3ExZXBEh9YpSfPVVK8FeJYKPBny2jxPqcKo';
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = 'sheet1';
  const query = encodeURIComponent('Select A, B, C, D')
  const url = `${base}&sheet=${sheetName}&tq=${query}`
  fetch(url)
  .then(res => res.text())
  .then(rep => {
      //Remove additional text and extract only JSON:
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      jsonData.table.rows.forEach((rowData, i) => {
        if(rowData.c[0] && i != 0 && rowData.c[0].v)
          words.push(rowData.c[0].v)
        if(rowData.c[1] && i != 0 && rowData.c[1].v)
          titles.push(rowData.c[1].v)
        if(rowData.c[2] && i != 0 && rowData.c[2].v)
          para.push(rowData.c[2].v)
        console.log('link ==> ', jsonData.table.rows[1])
        if(jsonData.table.rows[1].c[3].v) {
          const value = jsonData.table.rows[1].c[3].v;
          const registerLink = document.getElementById('registerLink')
          registerLink.setAttribute('href', value)
          registerLink.innerHTML = value;
        }
      })

      loadPage();
      let mate2 = []
      words.forEach(ele => mate2.push({word: ele, pos: 0, placed: false,line: random(0, 1) == 0 ? "v" : "h", solved:false}))
      console.log('mate ==> ',mate2)
      setWords(mate2, titles, para);
  })

}
getData()
console.log('data ===< ', data)


