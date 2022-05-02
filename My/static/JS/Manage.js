let Menu_State = false;
let Element_ID;
let Left_Menu_State;
let Left_State = true;
let Screen_Full = false;
let Tr_State = false;

let My_Url = 'http://192.168.31.176:8081';


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

window.onresize = function () {
    AutoPage();
}

window.onload = function () {

    const Content_Box = document.getElementById("Content_Box");
    /*  Body.setAttribute("style", "filter:" + "blur(0px)"); */
    Content_Box.setAttribute("style", "opacity:" + "1");
    checkCookie();
    Where();

}

window.onpopstate = function (event) {
    console.log(event.state);
}

var Page = (Page) => {
    const PageName = Page;
    document.getElementById("Content_Box").setAttribute("style", "opacity:" + "0%");
    sleep(250).then(() => {
        if (PageName == "Home") {
            window.location.href = "../../";
        } else {
            window.location.href = "../" + PageName + ".html";
        }

    })
}

var Full_Screen = (Element) => {
    const Element_Full = document.getElementById(Element);
    const Full_Img = document.getElementsByClassName("Full_Img");
    if (!Screen_Full) {
        if (Element_Full.requestFullscreen) {
            Element_Full.requestFullscreen();
        } else if (Element_Full.mozRequestFullScreen) {
            Element_Full.mozRequestFullScreen();
        } else if (Element_Full.webkitRequestFullscreen) {
            Element_Full.webkitRequestFullscreen();
        } else if (Element_Full.msRequestFullscreen) {
            Element_Full.msRequestFullscreen();
        }
        for (let i = 0; i < Full_Img.length; i++) {
            Full_Img[i].src = "../../IMG/NoFull.png";
        }
        Screen_Full = true;
    } else {
        if (document.exitFullScreen) {
            document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        for (let i = 0; i < Full_Img.length; i++) {
            Full_Img[i].src = "../../IMG/Full.png";
        }
        Screen_Full = false;
    }
}

var Menu_Hidden = () => {
    const Menu = document.getElementById("Left_Menu");
    const Img = document.getElementsByClassName("First_Img");
    const Font_First = document.getElementsByClassName("First_Font");
    const Font_Second = document.getElementsByClassName("Menu_second");
    const Title = document.getElementById("Title_Menu_Button");
    const Title_Font = document.getElementById("Title_Menu_Font");
    const Main = document.getElementById("Content_Box");
    const Content_Title = document.getElementById("Content_Title");
    if (Left_State) {
        document.getElementById("List_Img").src = "../../IMG/List_True.png";
        Title.style.opacity = "0";
        Title.style.visibility = "hidden";
        Title.style.height = "0";
        Title.style.width = "0";
        Title_Font.innerText = "R"
        for (let j = 0; j < Font_Second.length; j++) {
            Font_Second[j].style.opacity = "0";
            Font_Second[j].style.visibility = "hidden";
            Font_Second[j].style.height = "0";
            Font_Second[j].style.width = "0";
        }
        for (let i = 0; i < Font_First.length; i++) {
            const N = 2 * i + 1;
            const X = 2 * i;
            const M = [Font_First[i], Img[N]];
            for (let n = 0; n < 2; n++) {
                M[n].style.opacity = "0";
                M[n].style.visibility = "hidden";
                M[n].style.height = "0";
                M[n].style.width = "0";
            }
            Img[X].style.marginLeft = "25px";
        }
        Left_State = false;
        Menu.style.width = "50px";
        Content_Title.style.width = "calc(100% - 50px)";
        Main.style.width = "calc(100% - 50px)";
    } else {
        document.getElementById("List_Img").src = "../../IMG/List_False.png";
        Title.style.opacity = "1";
        Title.style.visibility = "visible";
        Title.style.height = "29px";
        Title.style.width = "72px";
        for (let i = 0; i < Font_First.length; i++) {
            const N = 2 * i + 1;
            const X = 2 * i;
            Img[X].style.margin = "0 8px";
            Font_First[i].style.width = "100px";
            Img[N].style.width = "20px";
            Font_First[i].style.height = "44px";
            Img[N].style.height = "20px";
            Img[N].style.visibility = "visible";
            Font_First[i].style.visibility = "visible";
            Img[N].style.opacity = "1";
            Font_First[i].style.opacity = "1";
        }
        for (let j = 0; j < Font_Second.length; j++) {
            Font_Second[j].style.width = "100%";
            Font_Second[j].style.height = "44px";
            Font_Second[j].style.visibility = "visible";
            Font_Second[j].style.opacity = "1";
        }
        Left_State = true;
        Menu.style.width = "200px";
        Title_Font.innerText = "RaBBit";
        Content_Title.style.width = "calc(100% - 200px)";
        Main.style.width = "calc(100% - 200px)";
    }
}

var Manage_Page = (Name) => {
    const PageName = Name;
    document.getElementsByTagName("body")[0].setAttribute("style", "opacity:" + "0%");
    sleep(250).then(() => {
        if (PageName == "Home") {
            window.location.href = "../../";
        } else {
            window.location.href = "./" + PageName + ".html";
        }

    })
}

var Where = () => {
    const Menu = document.getElementById("Here");
    const Element = Menu.children;
    const Hidden = Menu.parentNode;
    const Px = Hidden.children.length * 44;
    for (let i = 0; i < Element.length; i++) {
        Element[i].style.filter = "brightness(200%)";
    }
    Hidden.style.height = Px + "px";
    Element[2].style.transform = "rotate(180deg)";
    const here = document.getElementById("here");
    here.style.filter = "brightness(200%)";
    here.style.backgroundColor = "#353535";
}

var AutoPage = function () {
    var Self = this;
    const Th_Hidden = document.getElementById("Th_Hidden");
    const Button_Hidden = document.getElementsByClassName("Button_Hidden");
    const Hidden_Font = document.getElementsByClassName("Hidden_Font");
    const Content_Find = document.getElementById("Content_Find");
    if (screen.width < 768) {
        Menu_Hidden();
        Little_Menu(true);
        document.getElementById("Input_Font_User").innerText = "输入信息"
        Content_Find.style.height = "10%";
        Th_Hidden.style.display = "none";
        for (let i = 0; i < Button_Hidden.length; i++) {
            Button_Hidden[i].style.display = "none"
        }
        for (let i = 0; i < Hidden_Font.length; i++) {
            Hidden_Font[i].style.display = "none"
        }
        Self.width = 1550;
        Self.fontSize = 15;
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
        Little_Menu(false);
        Content_Find.style.height = "25%";
        Th_Hidden.style.display = "";
        for (let i = 0; i < Button_Hidden.length; i++) {
            Button_Hidden[i].style.display = ""
        }
        for (let i = 0; i < Hidden_Font.length; i++) {
            Hidden_Font[i].style.display = ""
        }
    }
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

window.onresize = function () {
    AutoPage();
}

function setCookie(cname, id, day) {
    var d = new Date();
    if (day !== 0) {
        d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
    } else {
        var expires = "expires=0";
    }
    document.cookie = cname + "=" + id + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    const UserID = getCookie("UserID");
    const UserName = getCookie("UserName");
    if (UserID !== "") {
        //这里可以放页面加载时函数，避免重复使用 window.onload();
        SomeThing_Load(UserName, UserID);
        Font_OnLoad();
    } else {
        Page('Home');
    }
    if (getCookie("Admin") == "学生") {
        Page("Home");
    }
}

var SomeThing_Load = (Name, ID) => {
    const Name_Font = document.getElementsByClassName("UserName");
    const ID_Font = document.getElementsByClassName("UserID");
    const User_Img = document.getElementsByClassName("UserImg");
    for (let i = 0; i < Name_Font.length; i++) {
        Name_Font[i].innerText = "Hi! " + getCookie("UserName");
    }
    for (let i = 0; i < User_Img.length; i++) {
        User_Img[i].src = getCookie("Img");
    }
    /* NewUser_Input(); */
    document.getElementById("Lock_Page").style.backgroundImage = "url('https://api.isoyu.com/bing_images.php')";
    /*   Name_Font.innerText = Name;
      ID_Font.innerText = ID; */

    if (getCookie("Lock")) {
        Page_Lock(true);
    }

}

Font_OnLoad = () => {
    const Font_First = document.getElementById("Onload_First");
    const Font_Second = document.getElementById("Onload_Second");
    const First = document.getElementById("Here").children[1].innerText;
    const Second = document.getElementById("here").innerText;
    Font_First.innerText = First;
    Font_Second.innerText = Second;

}

var Table_ReLoad = (name) => {
    switch (name) {
        case "User":
            url = My_Url + "/manage/users"
            break;
        case "Score":
            url = My_Url + "/manage/scores"
            break;
        case "Leave":
            url = My_Url + "/home/getall"
            break;
        case "Life":
            url = My_Url + "/life/all"
            break;
        case "FeekBack":
            url = My_Url + "/feekback/all"
            break;
        default:
            break;
    }
    axios({
        method: 'GET',
        url: url
    }).then((res) => {
        CreateTable(res.data, res.data.length, name);
    })
}

var Left_Menu = (Num) => {
    const Hidden_Div = document.getElementsByClassName("Menu_Hidden");
    const N = Num * 2 + 1;
    const Img = document.getElementsByClassName("First_Img");
    const Element = Hidden_Div[Num];
    const Turn_Img = Img[N];
    for (let i = 0; i < Hidden_Div.length; i++) {
        let M = i * 2 + 1;
        Hidden_Div[i].setAttribute("style", "height:44px");
        Img[M].style.transform = "rotate(0deg)";
    }
    switch (Num) {
        case 0:
            Element.style.height = "88px";
            break;
        case 1:
            Element.style.height = "264px";
            break
        default:
            break;
    }

    Turn_Img.style.transform = "rotate(180deg)";
}

var Manage_Input_Num = function (Element_Name, Max_Num) {
    const Element = Element_Name;
    const Max = Max_Num;
    const Element_Input = document.getElementById("Manage_" + Element);
    const Element_Font = document.getElementById("Input_Font_" + Element);
    const Element_Length = Element_Input.value.length;
    Manage_Input(Element_Length, Element);
    if (Element_Length == 0) {
        const Message = Element_Font.innerText + "不允许为空!";
        Prompt(Message, 4500);
    } else if (Element_Length !== Max && Max !== 0) {
        /* const Message = Element_Font.innerText + "为" + Max + "位!";
        Prompt(Message, 4500); */
    }
}

var Manage_Input = function (Show, Element_Name) {
    const Element = Element_Name;
    const Show_State = Show;
    const Input_Font = document.getElementById("Input_Font_" + Element);
    if (Show_State) {
        Input_Font.style.fontSize = "7.5px";
        Input_Font.style.margin = "-60px 0 0 0rem";
    } else {
        Input_Font.style.fontSize = "15px";
        Input_Font.style.margin = "-30px 0 0 30px";
    }
}

var Input_Div = function (Show, Element_Name) {
    const Element = Element_Name;
    const Show_State = Show;
    const Input_Div = document.getElementById("Manage_Main_" + Element);
    if (Show_State) {
        Input_Div.style.borderColor = "#0070C9";
        Input_Div.style.boxShadow = "0 0 0 3px rgb(131 192 253 / 50%)";
    } else {
        Input_Div.style.borderColor = "#d6d6d6";
        Input_Div.style.boxShadow = "none";
    }
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

var Page_Lock = (State) => {
    const Load_Page = document.getElementById("Lock_Page");
    const Load_h1 = document.getElementById("Lock_h1");
    const Load_h2 = document.getElementById("Lock_h2");
    const Time = document.getElementById("Time");
    const Lock_Login = document.getElementById("Lock_Login");
    Load_Page.style.filter = "brightness(1)"
    /* background: url("https://api.isoyu.com/bing_images.php") no-repeat; */
    let D = new Date();
    let Font = "";
    if (State) {
        Load_Page.style.visibility = "visible";
        Load_Page.style.zIndex = "99";
        Load_Page.style.opacity = "1";
        Load_Page.style.backgroundImage = "url('https://api.isoyu.com/bing_images.php')";
        Time.style.visibility = "visible";
        Time.style.opacity = "1";
        const N = D.getMonth() + 1;
        Font += D.getFullYear();
        Font += "年" + N + "月" + D.getDate() + "号, " + Week();
        Load_h2.innerText = Font;
        /*  setCookie("Lock", true); */
        document.cookie = "Lock=true;Path=/;";
    } else if (!State) {
        Load_Page.style.filter = "brightness(0.5)"
        Lock_Login.style.visibility = "visible";
        Lock_Login.style.zIndex = "100";
        Lock_Login.style.opacity = "1";
    }


}

var Login = async function () {
    const ID = getCookie("UserID");
    let GET_Password = document.getElementById("Lock_PassWord");
    var PassWord = GET_Password.value;
    axios({
        method: 'post',
        url: My_Url + '/home/login',
        data: {
            'ID': ID,
            'PassWord': PassWord
        }
    }).then(function (res) {
        if (res.data.message == "Wrong") {
            Prompt("密码错误", 4500);
        } else if (res.data.message == "Success") {
            GET_Password.value = null;
            const Lock_Page = document.getElementById("Lock_Page");
            const Lock_Login = document.getElementById("Lock_Login");
            const Time = document.getElementById("Time");
            Time.style.opacity = "0";
            Time.style.visibility = "hidden";
            Lock_Page.style.opacity = "0";
            Lock_Page.style.zIndex = "-1";
            Lock_Page.style.visibility = "hidden";
            Lock_Login.style.opacity = "0";
            Lock_Login.style.zIndex = "-1";
            Lock_Login.style.visibility = "hidden";
            document.cookie = "Lock=;Path=/;expires=0";
        }
    })
}

var Week = () => {
    let D = new Date();
    let Week = D.getDay();
    let Week_Name = "";
    switch (Week) {
        case 1:
            Week_Name += "星期一"
            break;
        case 2:
            Week_Name += "星期二"
            break;
        case 3:
            Week_Name += "星期三"
            break;
        case 4:
            Week_Name += "星期四"
            break;
        case 5:
            Week_Name += "星期五"
            break;
        case 6:
            Week_Name += "星期六"
            break;
        case 0:
            Week_Name += "星期七"
            break;
        default:
            break;
    }
    return (Week_Name);
}

var Switch_Table = () => {
    const Switch = document.getElementById("Switch").checked;
    const Tbody = document.getElementById("User_Tbody");
    let Num = Tbody.children.length;
    if (Switch == true) {
        for (let i = 1; i <= Num / 2; i++) {
            let n = i * 2 - 1;
            for (let j = 0; j < Tbody.children[n].children.length; j++) {
                Tbody.children[n].children[j].style.background = "#fafafc";
            }
        }
    } else if (Switch == false) {
        for (let i = 1; i <= Num / 2; i++) {
            let n = i * 2 - 1;
            for (let j = 0; j < Tbody.children[n].children.length; j++) {
                Tbody.children[n].children[j].style.background = "#FFF";
            }
        }
    }
}

var Tr_Big = () => {
    const tr = document.getElementsByTagName("tr");
    const td = document.getElementsByTagName("td");
    let Height, Font_Size, Img_Src;
    if (!Tr_State) {
        Height = "7rem";
        Font_Size = "2rem";
        Img_Src = "../../Img/Tr_False.png";
        Tr_State = true;
    } else {
        Height = "5rem";
        Font_Size = "1.1rem";
        Img_Src = "../../Img/Tr_True.png";
        Tr_State = false;
    }
    for (let n = 1; n < tr.length; n++) {
        tr[n].style.height = Height;
    }
    for (let n = 0; n < td.length; n++) {
        td[n].style.fontSize = Font_Size;
    }
    document.getElementById("Tr_Big_Img").src = Img_Src;
}

var Little_Menu = (boolean) => {
    const Menu_Box = document.getElementById("Menu_Box");
    const Menu_IMG = document.getElementsByClassName("Menu_IMG");
    const Menu_Font = document.getElementsByClassName("Menu_Font");
    const Menu_Div = Menu_Box.children;
    let Box_width, Box_height, Div_width, Div_height, Img_height, Font_height,
        Font_Size, Line_height, Box_filter;
    if (boolean) {
        Box_filter = "blur(0)";
        Box_width = "80%";
        Box_height = "25%";
        Div_width = "50px";
        Div_height = "65px";
        Img_height = "50px";
        Font_height = "15px";
        Font_Size = "10px";
        Line_height = "15px";
    } else if (!boolean) {
        Box_filter = "blur(0.4px)";
        Box_width = "43rem";
        Box_height = "20rem";
        Div_width = "4rem";
        Div_height = "6rem";
        Img_height = "4rem";
        Font_height = "2rem";
        Font_Size = "0.85rem";
        Line_height = "2rem";
    }
    Menu_Box.style.filter = Box_filter;
    Menu_Box.style.width = Box_width;
    Menu_Box.style.height = Box_height;

    for (let i = 0; i < Menu_Div.length; i++) {
        Menu_Div[i].style.width = Div_width;
        Menu_Div[i].style.height = Div_height;
    }
    for (let i = 0; i < Menu_IMG.length; i++) {
        Menu_IMG[i].style.height = Img_height;
    }
    for (let i = 0; i < Menu_Font.length; i++) {
        Menu_Font[i].style.height = Font_height;
        Menu_Font[i].style.fontSize = Font_Size;
        Menu_Font[i].style.lineHeight = Line_height;
    }
}

var Exit = () => {
    document.cookie = "UserID=;Path=/;expires=0";
    location.reload();
}

var Message_Box = (height, width, element, show) => {
    console.log(height, width, element, show);
    const Message_Box = document.getElementById("Message_Box");
    const Element = document.getElementById("Message_" + element);
    const Content_Main = document.getElementById("Content_Main");
    if (screen.width < 768) {
        width = "90%";
        height = "80%";
    }
    Element.style.height = height;
    Element.style.width = width;
    if (show) {
        Element.style.display = "";
        Message_Box.style.visibility = "visible";
        Message_Box.style.opacity = "1";
        Content_Main.style.filter = "brightness(40%)";
    } else if (!show) {
        Content_Main.style.filter = "brightness(100%)";
        Message_Box.style.opacity = "0";
        Message_Box.style.visibility = "hidden";
        Element.style.display = "none";

    }
}