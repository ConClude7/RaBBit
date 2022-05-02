let Users, Machine;
var CreateTable = (value, length) => {
    console.log(value, length);
    Machine = value;
    let res = value;
    const User_Tbody = document.getElementById("User_Tbody");
    User_Tbody.style.opacity = "0";
    User_Tbody.style.visibility = "hidden";
    let User_Data, Td_Width;
    sleep(250).then(() => {
        User_Tbody.style.visibility = "visible";
        User_Tbody.style.opacity = "1";
        User_Data = ["mid", "mname", "maddress", "mstate", "date"];
        Td_Width = ["15%", "14%", "30%", "7%", "20%", "14%"];
        let Button_Font = ["删除", "查看"];
        Users = new Array();
        for (let n = 0; n < length; n++) {
            let Test = new Array();
            for (let m = 0; m < User_Data.length; m++) {
                Test[m] = res[n][User_Data[m]];
            }
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

let Delete_Num;

var Tbody_Button = (num, state) => {
    Delete_Num = num;
    if (state) {
        console.log(Machine[num]);
        let Element_Name = ['mid', 'mname', 'maddress', 'date', 'mstate', 'userid', 'starttime', 'endtime'];
        let Font = ['设备号\n', '设备名\n', '设备地址\n', '添加时间\n', '当前状态\n', '用户ID：', '订单开始：', '订单结束：']
        console.log("查看");
        Message_Box("30rem", "40rem", "Life_info", true);
        for (let i = 0; i < Element_Name.length; i++) {
            const Element_Font = document.getElementById("Info_" + Element_Name[i]);
            Element_Font.innerText = Font[i] + Machine[num][Element_Name[i]];
        }
        const Info_right = document.getElementById("Info_right").style.background;
        console.log(Machine[num].mstate)
        if (Machine[num].mstate == "正在使用") {
            document.getElementById("Info_right").style.background = "lightcoral";
        } else {
            document.getElementById("Info_right").style.background = "lightgreen";
        }

    } else {
        console.log("删除");
        Message_Box("100px", "300px", 'Delete', true)
    }
}

var DeleteM = () => {
    axios({
        method: "POST",
        url: My_Url + "/life/delete",
        data: {
            mid: Users[Delete_Num][0]
        }
    }).then((res) => {
        Prompt(res.data.message, 4500);
        Message_Box(0, 0, 'Delete', false);
        Table_ReLoad("Life");
    })
}

var M_New = () => {
    let Data = new Array();
    let State
    let Element_Name = ['Id', 'Name', 'Address'];
    for (let i = 0; i < 3; i++) {
        Data[i] = document.getElementById("Input_" + Element_Name[i]).value;
        if (Data[i].length == 0) {
            State = true;
        }
    }
    if (State) {
        Prompt("输入信息为空", 4500);
    } else {
        console.log(Data);
        axios({
            method: 'POST',
            url: My_Url + "/life/create",
            data: {
                mid: Data[0],
                mname: Data[1],
                maddress: Data[2]
            }
        }).then((res) => {
            console.log(res);
            if (res.data.message !== "设备已存在") {
                Prompt(res.data.message, 4500);
                Table_ReLoad("Life");
                Message_Box('0', '0', 'Life', false);
            } else {
                Prompt(res.data.message, 4500);

            }

        })
    }

}

var Find_User = (State) => {
    const Input = document.getElementById("Manage_User");
    if (State && Input.value.length != 0) {
        console.log(Input.value);
        axios({
            method: "POST",
            url: My_Url + "/manage/lifefind",
            data: {
                font: Input.value
            }
        }).then((res) => {
            console.log(res.data.doc);
            CreateTable(res.data.doc, res.data.doc.length, "Life");
        })
    } else if (!State) {
        console.log("!!!");
        Manage_Input(false, 'User');
        Input.value = null;
    } else if (Input.value.length = 0) {
        Prompt("未输入查询信息", 4500);
    }
}