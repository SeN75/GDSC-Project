let pause = true;
let audio1 = document.getElementById("audio1");
let colors = [ '#42A5F5','#EF5350','#FFCA28','#66BB6A']
let tt = document.getElementsByTagName("tbody")[0];
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
console.log("num1 ==> ", random(0, 9));
console.log("num2 ==> ", random(0, 9));
let poss = [];
let check = false;
let mate1 = [
  { word: "UX", line: random(0, 1) == 0 ? "v" : "h", pos: 0, placed: false },
  { word: "Figma", line: random(0, 1) == 0 ? "v" : "h", pos: 0, placed: false },
  { word: "XD", line: random(0, 1) == 0 ? "v" : "h", pos: 0, placed: false },
  { word: "GDSC", line: random(0, 1) == 0 ? "v" : "h", pos: 0, placed: false },
];
let index = 0;
while (index != mate1.length) {
    let x = random(0, 9);
    let y = random(0, 9);
    if (!poss.includes([x, y])) {
      if (mate1[index].line == "v" && mate1[index].word.length + y <= 10) {
          
          for (let i = y; i <= mate1[index].word.length + y -1; i++){
              console.log(mate1[index].line,x+" "+i)
              tbody[i][x] = `<td data-belong-to="${mate1[index].word}" line="${mate1[index].line}">${
                  mate1[index].word.charAt(mate1[index].pos++).toUpperCase()
                }</td>`;
                console.log(tbody[x][i], mate1[index].word)

            }
            mate1[index].placed = true;
            poss.push([x,y])
        }
        else if (mate1[index].line == "h" && mate1[index].word.length + x <= 10) {
            for (let i = x; i <= mate1[index].word.length+x -1; i++) {
                console.log('pos ==> ', tbody[x][i])
                tbody[y][i] = `<td data-belong-to="${mate1[index].word}" line="${mate1[index].line}">${
                    mate1[index].word.charAt(mate1[index].pos++).toUpperCase()
                }</td>`;
            }
            poss.push([x,y])
            mate1[index].placed = true;
          
        }
    }
  if (!mate1[index].placed) continue;
  console.log('tt')

  check = mate1.every((e) => e.placed);
  let style = document.createElement('style');
  style.innerHTML = `
[data-belong-to="${mate1[index].word}"]:hover,
[data-belong-to="${mate1[index].word}"][active],
[data-belong-to="${mate1[index].word}"][check],
[data-belong-to="${mate1[index].word}"][hover] {
   color: ${colors[random(0,3)]};
}
[data-belong-to="${mate1[index].word}"][check][line="h"]::after,
[data-belong-to="${mate1[index].word}"][check][line="v"]::after {
    background: ${colors[random(0,3)]};
}
  `
  document.getElementsByTagName('head')[0].appendChild(style);
  index++;
}

console.log("==> ", tbody);
console.log("==> ", poss);
tt.innerHTML =''
for(let i =0; i < tbody[0].length; i++) 
   tt.innerHTML +=tbody[i].join('')
setInterval(() => {
  document.querySelectorAll("[data-belong-to]").forEach((ele) => {
    if (pause && !ele.getAttribute("check")) {
      if (!ele.getAttribute("animate")) ele.setAttribute("animate", "true");
      else ele.removeAttribute("animate");
    }
  });
}, 2000);

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
    } else {
      document.querySelectorAll("[data-belong-to]").forEach((ele2) => {
        if (
          ele.getAttribute("data-belong-to") ==
          ele2.getAttribute("data-belong-to")
        ) {
          ele2.removeAttribute("check");
        }
      });
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
});
