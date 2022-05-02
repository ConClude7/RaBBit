let Users, Num;
var Table_ReLoad = () => {
    axios({
        method: 'GET',
        url: My_Url + "/manage/scores",
    }).then((res) => {
        CreateTable(res.data, res.data.length, name);
    })

}

var CreateTable = (value, length, name) => {
    console.log(value, length, name);
    let res = value;
    const User_Tbody = document.getElementById("User_Tbody");
    User_Tbody.style.opacity = "0";
    User_Tbody.style.visibility = "hidden";
    let User_Data, Td_Width;
    sleep(250).then(() => {
        User_Tbody.style.visibility = "visible";
        User_Tbody.style.opacity = "1";
        User_Data = ["username", "studentid", "webscore", "sqlscore", "rfidscore", "javascore", "linuxscore"];
        Td_Width = ["8%", "12%", "13%", "13%", "13%", "13%", "13%", "15%"];
        let Button_Font = ["删除", "编辑"];
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
            const td = document.createElement("td");
            td.style.width = Td_Width[0];
            td.style.textAlign = "center";
            td.innerText = Users[i][0];
            tr.appendChild(td);
            if (screen.width < 768) {
                tr.setAttribute("onclick", Table_Function[1]);
            }
            Table.appendChild(tr);
            for (let m = 1; m < User_Data.length; m++) {
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

var NewScore = () => {
    let Create_Value = {};
    const Select = document.getElementById("NewScore_Class_Select").value;
    Create_Value.classid = Select;
    for (let i = 0; i < 7; i++) {
        const NewUser_Input = document.getElementsByClassName("NewScore_Score")[i];
        switch (i) {
            case 0:
                Create_Value.username = NewUser_Input.value;
                break;
            case 1:
                Create_Value.studentid = NewUser_Input.value;
                break;
            case 2:
                Create_Value.webscore = NewUser_Input.value;
                break;
            case 3:
                Create_Value.sqlscore = NewUser_Input.value;
                break;
            case 4:
                Create_Value.rfidscore = NewUser_Input.value;
                break;
            case 5:
                Create_Value.javascore = NewUser_Input.value;
                break;
            case 6:
                Create_Value.linuxscore = NewUser_Input.value;
                break;
            default:
                break;
        }
    }
    console.log(Create_Value);
    axios({
        method: 'POST',
        url: My_Url + "/score/create",
        data: Create_Value
    }).then((res) => {
        console.log(res);
        Prompt(res.data, 4500);
        Message_Box(0, 0, "NewScore", false);
        Table_ReLoad("Score");
    })
}


var Tbody_Button = (num, state) => {
    Num = num;

    if (state) {
        console.log("编辑");
        Message_Box("40rem", "30rem", "Score", true);
        Score_UP_Div(num);

    } else if (!state) {
        console.log("删除");
        axios({
            method: 'POST',
            url: My_Url + "/score/delete",
            data: {
                studentid: Users[Num][1],
            }
        }).then((res) => {
            console.log(res);
            Prompt(res.data.message, 4500);
            Table_ReLoad("Score");
        })
    }
}

var Score_UP_Div = (num) => {
    console.log(Users[num]);
    document.getElementById("Score_Name").innerText = Users[num][0];
    document.getElementById("Score_Id").innerText = Users[num][1];
    let Score_Name = ['Web前端开发：', '数据库管理及应用：', 'RFID技术与应用：', '程序设计基础：', 'Linux系统管理：'];
    const Score_Input_P = document.getElementsByClassName("Score_Input_P");
    for (let i = 0; i < Score_Name.length; i++) {
        let n = i + 2;
        Score_Input_P[i].innerText = Score_Name[i] + "原成绩 " + Users[num][n] + "分";
    }
}

var ScoreUP = () => {
    let State = 0;
    let Num_State = 0;
    let Data = new Array();
    const Score_Input = document.getElementsByClassName("Score_Input");
    for (let i = 0; i < 5; i++) {
        Data[i] = Score_Input[i].value;
        console.log(Score_Input[i].value.length);
        if (Score_Input[i].value.length == "1" || Score_Input[i].value.length == "2") {
            State += 1;
        }
    }
    Data[5] = Users[Num][1];
    if (State == 5) {
        console.log(Data);
        axios({
            method: "POST",
            url: My_Url + "/score/update",
            data: Data
        }).then((res) => {
            console.log(res);
            Prompt(res.data.message, 4500);
            Message_Box(0, 0, "Score", false);
            Table_ReLoad("Score");
        })
    } else {
        Prompt("请输入所有正确成绩", 4500)
    }

}

var Find_User = (State) => {
    const Input = document.getElementById("Manage_User");
    if (State && Input.value.length != 0) {
        console.log(Input.value);
        axios({
            method: "POST",
            url: My_Url + "/manage/scorefind",
            data: {
                font: Input.value
            }
        }).then((res) => {
            console.log(res.data.doc);
            CreateTable(res.data.doc, res.data.doc.length);
        })
    } else if (!State) {
        console.log("!!!");
        Manage_Input(false, 'Score');
        Input.value = null;
    } else if (Input.value.length = 0) {
        Prompt("未输入查询信息", 4500);
    }
}