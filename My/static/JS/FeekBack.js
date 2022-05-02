let Num;
var CreateTable = (value, length) => {
    console.log(value, length);
    let res = value;
    const User_Tbody = document.getElementById("User_Tbody");
    User_Tbody.style.opacity = "0";
    User_Tbody.style.visibility = "hidden";
    let User_Data, Td_Width;
    sleep(250).then(() => {
        User_Tbody.style.visibility = "visible";
        User_Tbody.style.opacity = "1";
        User_Data = ["userid", "type", "uptime", "text"];
        Td_Width = ["15%", "7%", "30%", "33%", "15%"];
        let Button_Font = ["删除", "回复"];
        Users = new Array();
        for (let n = 0; n < length; n++) {
            let Test = new Array();
            for (let m = 0; m < User_Data.length; m++) {
                Test[m] = res[n][User_Data[m]];
            }
            Test[6] = res[n]._id;
            Users.push(Test);
        }
        console.log(Users);
        let Table = document.getElementById("User_Tbody");
        Table.innerHTML = null;
        for (let i = 0; i < Users.length; i++) {
            let Table_Function = ["Tbody_Button(" + i + "," + false + ")", "Tbody_Button(" + i + "," + true + ")"]
            const tr = document.createElement("tr");
            Table.appendChild(tr);
            if (screen.width < 768) {
                tr.setAttribute("onclick", Table_Function[1]);
            }
            for (let m = 0; m < User_Data.length; m++) {
                const td = document.createElement("td");
                td.innerText = Users[i][m];
                td.style.width = Td_Width[m];
                tr.appendChild(td);
            }
            const Button_td = document.createElement("td");
            Button_td.className = "Button_Hidden";
            tr.appendChild(Button_td);

            for (let n = 0; n < 2; n++) {
                let button = document.createElement("button");
                button.className = "Td_Button";
                button.id = "Td_Button_" + n;
                button.setAttribute("onclick", Table_Function[n]);
                button.innerText = Button_Font[n];
                Button_td.appendChild(button);
            }
        }
        document.getElementById("Switch").checked = false;
        AutoPage();
    })
}

var Tbody_Button = (num, state) => {
    Num = num;
    console.log(Users[Num]);
    const Id = Users[Num][0];
    const Date = Users[Num][3];
    const _id = Users[Num][6];
    console.log(_id);
    if (state) {
        console.log("回复");
    } else if (!state) {
        console.log("删除");
    }
}

var Cant_Home = () => {
    const Id = Users[Num][0];
    const Date = Users[Num][3];
    const Reason = document.getElementById("Return_Textarea").value;
    const _id = Users[Num][6];
    axios({
        method: "POST",
        url: My_Url + "/home/cant",
        data: {
            id: Id,
            _id: _id,
            text: Reason,
            date: Date,
            state: "已处理(驳回)"
        }
    }).then((res) => {
        Table_ReLoad("Leave");
        Prompt(res.data.message, 4500);

    })
}

var Find_User = (State) => {
    const Input = document.getElementById("Manage_User");
    if (State && Input.value.length != 0) {
        console.log(Input.value);
        axios({
            method: "POST",
            url: My_Url + "/manage/homefind",
            data: {
                font: Input.value
            }
        }).then((res) => {
            console.log(res.data.doc);
            CreateTable(res.data.doc, res.data.doc.length);
        })
    } else if (!State) {
        console.log("!!!");
        Manage_Input(false, 'User');
        Input.value = null;
    } else if (Input.value.length = 0) {
        Prompt("未输入查询信息", 4500);
    }
}