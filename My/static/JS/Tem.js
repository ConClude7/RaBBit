let Menu_State = false;
let Element_ID;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

window.onload = function () {
    AutoPage();
    const Body = document.getElementsByTagName("body")[0];
    /* Body.setAttribute("style", "filter:" + "blur(0px)"); */
    Body.setAttribute("style", "opacity:" + "1");
    checkCookie();
    if (getCookie("Admin") == "学生") {
        document.getElementById("Menu_Admin").style.display = "none";
    } else {
        document.getElementById("Menu_Admin").style.display = "";
    }
    console.log(getCookie("Lock"))
    if (getCookie("Lock") == "true") {
        document.cookie = "UserID=;Path=/;expires=0";
        document.cookie = "Lock=true;Path=/;";
        window.location.replace("/");
    }
    const Name_Font = document.getElementsByClassName("UserName");
    const ID_Font = document.getElementsByClassName("UserID");
    const User_Img = document.getElementsByClassName("UserImg");
    for (let i = 0; i < Name_Font.length; i++) {
        Name_Font[i].innerText = "Hi! " + getCookie("UserName");
    }
    for (let i = 0; i < User_Img.length; i++) {
        User_Img[i].src = getCookie("Img");
    }
}

window.onresize = function () {
    AutoPage();
}

window.onclick = function (location) {
    Element_ID = location.target.id;
    const Menu = document.getElementById("Menu_Box");
    const Menu_Turn = document.getElementById("Title_Menu_Turn");
    if (Menu_State == false && (Element_ID == "Title_Menu_Button" || Element_ID == "Title_Menu_Turn")) {
        Menu.style.visibility = "visible";
        Menu.style.opacity = 1;
        Title_Menu_Turn.style.transform = "rotate(0deg)";
        Menu_State = true;
    } else if (Menu_State && Element_ID !== "Menu_Box") {
        Menu.style.visibility = "hidden";
        Menu.style.opacity = 0;
        Title_Menu_Turn.style.transform = "rotate(-90deg)";
        Menu_State = false;
    }
}

window.onpopstate = function (event) {
    console.log(event.state);
}

var Left_Menu = (Num) => {
    const Element = document.getElementById("Left_Menu_" + Num);
    Element.style.height = "88px";
}

var Prompt = function (Content, Time) {
    const Message = Content;
    const Prompt = document.getElementById("Prompt");
    const Prompt_Box = document.getElementById("Prompt_Box");
    Prompt_Box.style.visibility = "visible";
    Prompt_Box.style.opacity = "1";
    Prompt.innerText = Message;
    sleep(Time).then(() => {
        Prompt_Box.style.opacity = "0";
        Prompt_Box.style.visibility = "hidden";
    })
}

function Page(page) {
    const PageName = page;
    document.getElementsByTagName("body")[0].setAttribute("style", "opacity:" + "0%");
    sleep(250).then(() => {
        if (PageName == "Home") {
            window.location.href = "../";
            /* history.pushState("Online", '', '../'); */
            /* history.go(); */
        } else if (PageName == "Manage") {
            window.location.href = "./Manage/" + PageName + ".html";
        } else {
            /* history.pushState(null, '', PageName + '.html');
            history.go(); */
            window.location.href = "./" + PageName + ".html";
        }

    })

}

var AutoPage = function (pagename) {
    var Self = this;
    const Title = document.getElementById("Title_Menu_Font");
    if (screen.width < 768) {
        Title.innerHTML = "R";
        Title.style.marginRight = "1rem";
        Menu_Font = document.getElementsByClassName("Menu_Font")[0].setAttribute("style", "opacity:0");
        Self.width = 750;
        Self.fontSize = 15;
        try {
            AutoPage_Score();
        } catch (error) {
            console.log(error);
        }
        try {
            AutoPage_Course();
        } catch (error) {
            console.log(error);
        }
        try {
            AutoPage_Life();
        } catch (error) {
            console.log(error);
        }
        Self.widthProportion = function () {
            var p = (document.body && document.body.clientWidth || document.getElementsByTagName(
                    "html")[0]
                .offsetWidth) / Self.width;
            return p;
        };
        Self.changePage = function () {
            document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + Self
                .widthProportion() *
                Self.fontSize + "px");
        }
        Self.changePage();

        window.addEventListener('resize', function () {
            Self.changePage();
        }, false);
    } else {
        Title.innerHTML = "RaBBits";
    }
}