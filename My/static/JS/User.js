let Users, UP_Name, UP_ID, UP_Number, UP_Admin, New_ID;

var Find_User = (State) => {
    const Input = document.getElementById("Manage_User");
    if (State && Input.value.length != 0) {
        console.log(Input.value);
        axios({
            method: "POST",
            url: My_Url + "/manage/userfind",
            data: {
                font: Input.value
            }
        }).then((res) => {
            console.log(res.data.doc);
            CreateTable(res.data.doc, res.data.doc.length, "User");
        })
    } else if (!State) {
        console.log("!!!");
        Manage_Input(false, 'User');
        Input.value = null;
    } else if (Input.value.length = 0) {
        Prompt("未输入查询信息", 4500);
    }
}

var CreateTable = (value, length, name) => {
    NewUser_Input();
    console.log(value, length, name);
    let res = value;
    const User_Tbody = document.getElementById("User_Tbody");
    User_Tbody.style.opacity = "0";
    User_Tbody.style.visibility = "hidden";
    let User_Data, Td_Width;
    sleep(250).then(() => {
        User_Tbody.style.visibility = "visible";
        User_Tbody.style.opacity = "1";
        User_Data = ["img", "id", "username", "number", "logintime", "admin"];
        Td_Width = ["8%", "15%", "7%", "17%", "30%", "8%", "15%"];
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
            let img = document.createElement("img");
            img.src = Users[i][0];
            img.style.borderRadius = "50%";
            img.style.width = "3.5rem";
            img.style.height = "3.5rem";
            tr.appendChild(td);
            td.appendChild(img);
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

var Tbody_Button = (Id, State) => {
    console.log(Users[Id]);
    UP_Name = Users[Id][2];
    UP_ID = Users[Id][1];
    UP_Number = Users[Id][3];
    UP_Admin = Users[Id][5];
    let Width = "30rem";
    let Height = "40rem";

    const Content_Main = document.getElementById("Content_Main");
    if (State) {
        //编辑用户信息
        console.log("!!!!");
        Message_Box(Height, Width, "UserUP", true);
        const Element = document.getElementsByClassName("UserUP_Input");
        const Select = document.getElementById("Admin_Select");
        const Img = document.getElementById("UserUP_Img_In");
        Element[0].placeholder = Users[Id][2];
        Element[1].placeholder = Users[Id][1];
        Element[2].placeholder = Users[Id][3];
        Select.value = Users[Id][5];
        Img.src = Users[Id][0];

    } else if (!State) {
        //删除用户信息
        Message_Box("100px", "300px", "Delete", true);
        /* DeleteUser(); */
    }
}

var DeleteUser = () => {
    axios({
        method: "POST",
        url: My_Url + "/manage/deleteuser",
        data: {
            id: UP_ID
        }
    }).then((res) => {
        if (res.data.message = "success") {
            Prompt("删除成功", 4500);
            Message_Box(0, 0, "Delete", false);
            Table_ReLoad();
        } else {
            Prompt("删除失败", 4500);
        }
    })
}

var UserUP = () => {
    const Element = document.getElementsByClassName("UserUP_Input");
    const Select = document.getElementById("Admin_Select");
    let UP_State = false;
    let UP_Value = {};
    UP_Value.id = UP_ID;
    if (Element[0].value.length != 0) {
        UP_Value.username = Element[0].value;
        UP_State = true;
    } else {
        UP_Value.username = UP_Name;
    }
    if (Element[1].value.length != 0) {
        UP_Value.newid = Element[1].value;
        New_ID = Element[1].value
        UP_State = true;
    } else {
        UP_Value.newid = UP_ID;
    }
    if (Element[2].value.length != 0) {
        UP_Value.number = Element[2].value;
        UP_State = true;
    } else {
        UP_Value.number = UP_Number;
    }
    if (Select.value != UP_Admin) {
        UP_Value.admin = Select.value;
        UP_State = true;
    } else {
        UP_Value.admin = UP_Admin;
    }
    if (UP_State) {
        console.log(UP_Value);
        axios({
            method: "POST",
            url: My_Url + "/manage/userup",
            data: UP_Value
        }).then((res) => {
            console.log(res);
            if (res.data == "Success") {
                UP_ID = New_ID;
                Prompt("修改成功", 4500);
                for (let i = 0; i < Element.length; i++) {
                    Element[i].value = null;
                }
                Message_Box('0', '0', 'UserUP', false);

                Table_ReLoad();
            } else if (res.data.message == "用户已存在") {
                Prompt(res.data.message, 4500);
            }
        })
    } else {
        Prompt("未修改信息", 4500)
    }
}

var NewUser_Input = () => {
    let Element_Name = ['Name', 'PassWord', 'ID', 'Number'];
    for (let i = 0; i < Element_Name.length; i++) {
        let Element_Funciton = "NewUser_P(" + i + ")";
        let Input_Funciton = "NewUser_P(" + i + "," + true + ")";
        const NewUser_Input = document.getElementsByClassName("NewUser_" + Element_Name[i]);
        let Text = NewUser_Input[1].focus();
        NewUser_Input[0].setAttribute("onclick", Element_Funciton);
        NewUser_Input[0].setAttribute("onclick", Text);
        NewUser_Input[1].setAttribute("onclick", Element_Funciton);
        NewUser_Input[1].setAttribute("onblur", Input_Funciton);
    }
}

var NewUser_P = (Num, onblur) => {
    let Element_Name = ['Name', 'PassWord', 'ID', 'Number'];
    const P = document.getElementsByClassName("NewUser_" + Element_Name[Num])[0];
    P.style.marginLeft = "200px";
    const Input_Length = document.getElementsByClassName("NewUser_" + Element_Name[Num])[1].value.length;
    if (onblur) {
        if (Input_Length != 0) {
            P.style.marginLeft = "250px";
            P.style.transform = "scale(0)";
            P.style.opacity = "0";
        } else {
            P.style.transform = "scale(1)";
            P.style.opacity = "1";
            P.style.marginLeft = "10px";

        }
    }
}

var NewUser = (State) => {
    let Element_Name = ['Name', 'PassWord', 'ID', 'Number'];
    let Create_State = 0;
    let Create_Value = {};
    const Select = document.getElementById("NewUser_Admin_Select").value;
    Create_Value.admin = Select;
    for (let i = 0; i < Element_Name.length; i++) {
        const NewUser_Input = document.getElementsByClassName("NewUser_" + Element_Name[i])[1];
        if (State) {
            switch (i) {
                case 0:
                    Create_Value.name = NewUser_Input.value;
                    break;
                case 1:
                    Create_Value.password = NewUser_Input.value;
                    break;
                case 2:
                    Create_Value.id = NewUser_Input.value;
                    break;
                case 3:
                    Create_Value.number = NewUser_Input.value;
                    break;
                default:
                    break;
            }
        } else if (!State) {
            NewUser_Input.value = null;
            NewUser_P(i, true);
        }
    }
    if (State) {
        for (let i = 0; i < Element_Name.length; i++) {
            const Input_Length = document.getElementsByClassName("NewUser_" + Element_Name[i])[1].value.length;
            if (Input_Length != 0) {
                Create_State += 1;
            }
        }
        if (Create_State == 4) {
            console.log(Create_Value);
            axios({
                method: "POST",
                url: My_Url + "/manage/User/Create",
                data: {
                    Create_Value
                }
            }).then((res) => {
                if (res.data.message == "Success") {
                    Message_Box("0", "0", "NewUser", false);
                    Table_ReLoad();
                    NewUser(false);
                    Prompt("创建用户成功!",
                        4500);
                } else {
                    Prompt(res.data.message, 4500);
                }
            })
        } else {
            Prompt("输入信息为空", 4500);
        }
    }

}

var Table_ReLoad = () => {
    axios({
        method: 'GET',
        url: My_Url + "/manage/users"
    }).then((res) => {
        CreateTable(res.data, res.data.length, name);
    })
}