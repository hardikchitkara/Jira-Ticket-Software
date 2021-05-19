let filterOptions = document.querySelectorAll(".filter-colors__container");
let mainContainer = document.querySelector(".main-container");
let colours = ["lightpink", "lightblue", "lightgreen", "black"];
let bordercolor = colours[colours.length - 1];
let actionContainer = document.querySelectorAll(".action-container__icons");
let add = actionContainer[0];
let del = document.querySelector(".remove");
let mc = document.querySelector(".modal-container");
let descbox = document.querySelector("#myarea");
let filtercolors = document.querySelectorAll(".modal-fileres");
let locking = document.querySelector(".lock-container");
let taskarr = [];
let fav = document.querySelector(".allcolourcontainer");
// let toolbarfiltercolours = document.querySelector(".filter-container");
let localarr = [];

if (localStorage.getItem("alltasks")) {
    let lockcheck = false;
    let strarr = localStorage.getItem("alltasks");
    taskarr = JSON.parse(strarr);
    console.log(taskarr);

    locking.addEventListener("click", function() {
        let editingarr = document.querySelectorAll(".textdesc");
        if (lockcheck == false) {
            locking.style.backgroundColor = "rgb(43, 41, 41)";
            editingarr.forEach(function(editing) {
                editing.setAttribute("contenteditable", "false");
            })
            for (let i = 0; i < editingarr.length; i++) {
                taskarr[i].c = editingarr[i].innerText;
            }
            localStorage.setItem("alltasks", JSON.stringify(taskarr));
        } else {
            locking.style.backgroundColor = "rgb(85, 82, 82)";
            editingarr.forEach(function(editing) {
                editing.setAttribute("contenteditable", "true");

            })
        }
        lockcheck = !lockcheck;
    })

    for (let i = 0; i < taskarr.length; i++) {
        let task = taskarr[i];

        let mywork = document.createElement("div");
        mywork.setAttribute("class", "ticket");
        mywork.innerHTML =
            `
        
        <div class = "ticketcolor ${task.a}" > </div> 
        <div class = "ticketsubcontainer" >
        <h3 class = "ticket-id" > #${task.b} </h3> 
        <p class = "textdesc" contenteditable="true" > ${task.c} </p> 
        </div > 
        
        `;
        mainContainer.appendChild(mywork);
        localStorage.setItem("alltasks", JSON.stringify(taskarr));
        console.log(taskarr);


        //for changing colour of ticket
        let ticketcolorchange = mywork.querySelector(".ticketcolor");
        ticketcolorchange.addEventListener("click", function() {
            if (lockcheck == false) {
                let idx = taskarr.indexOf(task);
                let cb = taskarr[idx];


                if (ticketcolorchange.classList[1] == colours[0]) {
                    ticketcolorchange.classList.remove(ticketcolorchange.classList[1]);
                    ticketcolorchange.classList.add(colours[1]);
                    cb.a = colours[1];
                    localStorage.setItem("alltasks", JSON.stringify(taskarr));
                    console.log(taskarr);
                } else
                if (ticketcolorchange.classList[1] == colours[1]) {
                    ticketcolorchange.classList.remove(ticketcolorchange.classList[1]);
                    ticketcolorchange.classList.add(colours[2]);
                    cb.a = colours[2];
                    localStorage.setItem("alltasks", JSON.stringify(taskarr));
                    console.log(taskarr);
                } else if (ticketcolorchange.classList[1] == colours[2]) {
                    ticketcolorchange.classList.remove(ticketcolorchange.classList[1]);
                    ticketcolorchange.classList.add(colours[3]);
                    cb.a = colours[3];
                    localStorage.setItem("alltasks", JSON.stringify(taskarr));
                    console.log(taskarr);
                } else if (ticketcolorchange.classList[1] == colours[3]) {
                    ticketcolorchange.classList.remove(ticketcolorchange.classList[1]);
                    ticketcolorchange.classList.add(colours[0]);
                    cb.a = colours[0];
                    localStorage.setItem("alltasks", JSON.stringify(taskarr));
                    console.log(taskarr);
                }
            }

        })

        //for deleting already made ticket
        let delcheck = false;
        del.addEventListener("click", function() {
            if (delcheck == false && lockcheck == false) {
                del.style.backgroundColor = "rgb(43, 41, 41)";
                delcheck = !delcheck;

            } else if (delcheck == true && lockcheck == false) {
                del.style.backgroundColor = "rgb(85, 82, 82)";
                delcheck = !delcheck;

            }

        })
        mywork.addEventListener("click", function() {
            if (delcheck == true && lockcheck == false) {
                mywork.remove();
                let idx = taskarr.indexOf(task);
                taskarr.splice(idx, 1);
                localStorage.setItem("alltasks", JSON.stringify(taskarr));
                console.log(taskarr);
            }
        })


    }
    for (let i = 0; i < filterOptions.length; i++) {
        filterOptions[i].addEventListener("click", function() {
            if (lockcheck == false) {
                localarr = taskarr;
                let coloured = filterOptions[i].querySelector(".filter-color");
                let colour = coloured.classList[0];
                let reqarr = localarr.filter(function(allelements) {
                    return allelements.a == colour;
                })
                taskarr = [];
                let remallele = document.querySelectorAll(".ticket");
                let length = remallele.length;
                for (let j = 0; j < length; j++) {
                    remallele[j].remove();
                }
                for (let j = 0; j < reqarr.length; j++) {
                    let b = reqarr[j].a;
                    let i = reqarr[j].b;
                    let d = reqarr[j].c;
                    createticket(d, b, i);
                }
                taskarr = localarr;
                localStorage.setItem("alltasks", JSON.stringify(taskarr));
            }
        });
    }
    fav.addEventListener("click", function() {
        if (lockcheck == false) {
            localarr = taskarr;
            taskarr = [];
            let remallele = document.querySelectorAll(".ticket");
            let length = remallele.length;
            for (let j = 0; j < length; j++) {
                remallele[j].remove();
            }
            for (let j = 0; j < localarr.length; j++) {
                let b = localarr[j].a;
                let i = localarr[j].b;
                let d = localarr[j].c;

                createticket(d, b, i);
            }
            localStorage.setItem("alltasks", JSON.stringify(taskarr));
        }
    })

}
let lockcheck = false;
locking.addEventListener("click", function() {
    let editingarr = document.querySelectorAll(".textdesc");
    if (lockcheck == false) {
        locking.style.backgroundColor = "rgb(43, 41, 41)";
        editingarr.forEach(function(editing) {
            editing.setAttribute("contenteditable", "false");
        })
        for (let i = 0; i < editingarr.length; i++) {
            taskarr[i].c = editingarr[i].innerText;
        }
        localStorage.setItem("alltasks", JSON.stringify(taskarr));
    } else {
        locking.style.backgroundColor = "rgb(85, 82, 82)";
        editingarr.forEach(function(editing) {
            editing.setAttribute("contenteditable", "true");
        })
    }
    lockcheck = !lockcheck;
})
add.addEventListener("click", function() {
    if (mc.style.visibility == "hidden" && lockcheck == false) {
        mc.style.visibility = "visible";
    } else if (mc.style.visibility != "hidden" && lockcheck == false) {
        mc.style.visibility = "hidden";
    }
});
for (let i = 0; i < filtercolors.length; i++) {
    filtercolors[i].addEventListener("click", function() {
        filtercolors.forEach(function(mf) {
            mf.classList.remove("border");
        });
        filtercolors[i].classList.add("border");
        bordercolor = filtercolors[i].classList[1];
    });
}
descbox.addEventListener("keydown", function(e) {
    let task = descbox.value;
    if (e.key == "Enter") {
        let eid = uid();
        createticket(task, bordercolor, eid);
        descbox.value = "";
        mc.style.visibility = "hidden";
    }
})

function createticket(data, bordercolor, id) {
    let mywork = document.createElement("div");
    mywork.setAttribute("class", "ticket");
    // console.log(bordercolor);
    mywork.innerHTML =
        `
    
    <div class = "ticketcolor ${bordercolor}" > </div> 
    <div class = "ticketsubcontainer" >
    <h3 class = "ticket-id" > #${id} </h3> 
    <p class = "textdesc" contenteditable="true" > ${data} </p> 
    </div > 
    
    `;

    mainContainer.appendChild(mywork);
    let myobj = { "a": bordercolor, "b": id, "c": data };
    taskarr.push(myobj);
    localStorage.setItem("alltasks", JSON.stringify(taskarr));
    console.log(taskarr);
    let ticketcolorchange = mywork.querySelector(".ticketcolor");
    ticketcolorchange.addEventListener("click", function() {
        if (lockcheck == false) {

            let idx = taskarr.indexOf(myobj);
            let cb = taskarr[idx];
            if (ticketcolorchange.classList[1] == colours[0]) {
                ticketcolorchange.classList.remove(ticketcolorchange.classList[1]);
                ticketcolorchange.classList.add(colours[1]);
                cb.a = colours[1];
                localStorage.setItem("alltasks", JSON.stringify(taskarr));
                console.log(taskarr);
            } else if (ticketcolorchange.classList[1] == colours[1]) {
                ticketcolorchange.classList.remove(ticketcolorchange.classList[1]);
                ticketcolorchange.classList.add(colours[2]);
                cb.a = colours[2];
                localStorage.setItem("alltasks", JSON.stringify(taskarr));
                console.log(taskarr);
            } else if (ticketcolorchange.classList[1] == colours[2]) {
                ticketcolorchange.classList.remove(ticketcolorchange.classList[1]);
                ticketcolorchange.classList.add(colours[3]);
                cb.a = colours[3];
                localStorage.setItem("alltasks", JSON.stringify(taskarr));
                console.log(taskarr);
            } else if (ticketcolorchange.classList[1] == colours[3]) {
                ticketcolorchange.classList.remove(ticketcolorchange.classList[1]);
                ticketcolorchange.classList.add(colours[0]);
                cb.a = colours[0];
                localStorage.setItem("alltasks", JSON.stringify(taskarr));
                console.log(taskarr);
            }

        }
    })


    let delcheck = false;
    del.addEventListener("click", function() {
        if (delcheck == false && lockcheck == false) {
            del.style.backgroundColor = "rgb(43, 41, 41)";
            delcheck = !delcheck;

        } else if (delcheck == true && lockcheck == false) {
            del.style.backgroundColor = "rgb(85, 82, 82)";
            delcheck = !delcheck;

        }
    })

    mywork.addEventListener("click", function() {
        if (delcheck == true && lockcheck == false) {
            mywork.remove();
            let idx = taskarr.indexOf(myobj);
            taskarr.splice(idx, 1);
            localStorage.setItem("alltasks", JSON.stringify(taskarr));
            console.log(taskarr);

        }
    })


}
for (let i = 0; i < filterOptions.length; i++) {
    filterOptions[i].addEventListener("click", function() {
        if (lockcheck == false) {
            localarr = taskarr;
            let coloured = filterOptions[i].querySelector(".filter-color");
            let colour = coloured.classList[0];
            let reqarr = localarr.filter(function(allelements) {
                return allelements.a == colour;
            })
            taskarr = [];
            let remallele = document.querySelectorAll(".ticket");
            let length = remallele.length;
            for (let j = 0; j < length; j++) {
                remallele[j].remove();
            }

            // localStorage.setItem("alltasks", JSON.stringify(taskarr));


            for (let j = 0; j < reqarr.length; j++) {
                let b = reqarr[j].a;
                let i = reqarr[j].b;
                let d = reqarr[j].c;

                createticket(d, b, i);
            }
            taskarr = localarr;
            localStorage.setItem("alltasks", JSON.stringify(taskarr));
        }
    });
}
fav.addEventListener("click", function() {
    if (lockcheck == false) {
        localarr = taskarr;
        taskarr = [];
        let remallele = document.querySelectorAll(".ticket");
        let length = remallele.length;
        for (let j = 0; j < length; j++) {
            remallele[j].remove();
        }
        for (let j = 0; j < localarr.length; j++) {
            let b = localarr[j].a;
            let i = localarr[j].b;
            let d = localarr[j].c;

            createticket(d, b, i);
        }
        localStorage.setItem("alltasks", JSON.stringify(taskarr));
    }
})