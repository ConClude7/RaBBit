const {
    User,
    Score,
    Course,
    Homes,
    Life,
    FeekBack,
} = require('./models');
const express = require('express');
const app = express();
const fs = require('fs');
const Secret = "YHH_Token123";
const jwt = require('jsonwebtoken');
var path = require("path")
const multer = require('multer');
var upload = multer({});


var Time = () => {
    let date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var w = date.getDay();
    var w1 = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var h = date.getHours();
    h = h < 10 ? '0' + h : h;
    var min = date.getMinutes();
    min = min < 10 ? '0' + min : min;
    var s = date.getSeconds();
    s = s < 10 ? '0' + s : s;
    let Login_Time = y + '年' + m + '月' + d + '日' + h + ':' + min + ':' + s + ' ' + w1[w];
    return (Login_Time);
}

var Time_End = () => {
    let date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var w = date.getDay();
    var w1 = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var h = date.getHours();
    h = h < 10 ? '0' + h : h;
    var min = date.getMinutes() + 32;
    if (min >= 60) {
        min = min - 60;
        h += 1;
    }
    min = min < 10 ? '0' + min : min;
    var s = date.getSeconds();
    s = s < 10 ? '0' + s : s;
    let Login_Time = y + '年' + m + '月' + d + '日' + h + ':' + min + ':' + s + ' ' + w1[w];
    return (Login_Time);
}

//跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
})
app.use(express.json());
app.use(express.static('static'));
app.use(express.static('public'));

app.get('/', function (req, res) {
    fs.readFile('./static/Html/index.html', function (err, data) {
        if (err) {
            return res.end('404 not found')
        } else {
            res.end(data)
        }
    })
})

app.get('/manage/users', async function (req, res) {
    const users = await User.find();
    res.send(users);
})

app.get('/manage/scores', async function (req, res) {
    const scores = await Score.find();
    res.send(scores);
})

app.post('/manage/deleteuser', async function (req, res) {
    try {
        console.log(req);
        User.deleteOne({
            id: req.body.id
        }).then(function () {
            res.send("Success");
        })
    } catch (error) {
        console.error(error);
        res.send({
            message: 'Wrong'
        })
    }
})

app.post('/manage/deletescore', async function (req, res) {
    try {
        console.log(req);
        Score.deleteOne({
            id: req.body.id
        }).then(function () {
            res.send("Success");
        })
    } catch (error) {
        console.error(error);
        res.send({
            message: 'Wrong'
        })
    }
})

app.post('/manage/userup', async function (req, res) {
    console.log(req.body);
    try {
        User.updateOne({
            id: req.body.id,
        }, {
            $set: {
                username: req.body.username,
                number: req.body.number,
                admin: req.body.admin,
                id: req.body.newid
            }
        }, function (err, val) {
            if (val) {
                console.log("Success"),
                    res.send(
                        "Success"
                    )
            }
        });
    } catch (error) {
        if (err.code == 11000) {
            console.log("用户已存在");
            res.send({
                message: "用户已存在"
            });
        } else {
            console.log(error);
        }
    }
})

app.post('/manage/userfind', async function (req, res) {
    let regexp = new RegExp(req.body.font, 'i');
    console.log(regexp);
    User.find({
        $or: [{
                id: {
                    $regex: regexp
                }
            },
            {
                username: {
                    $regex: regexp
                }
            },
            {
                number: {
                    $regex: regexp
                }
            }
        ]
    }, (err, doc) => {
        if (err) {
            res.send({
                isSuccess: false,
                msg: "查询失败"
            })
        } else {
            res.send({
                doc
            })
        }
    })
})

app.post('/home/scores', async function (req, res) {
    /* const {
        Score
    } = require('./models'); */
    const scores = await Score.findOne({
        "studentid": req.body.StudentID,
    });
    res.send(scores);

    /* const scores = await Score.find({
        "studentid": req.body.StudentID,
    });
    res.send(scores); */
})

app.post('/score/create', async function (req, res) {
    try {
        console.log(req.body);
        const scores = await Score.create({
            username: req.body.username,
            classid: req.body.classid,
            studentid: req.body.studentid,
            webscore: req.body.webscore,
            sqlscore: req.body.sqlscore,
            rfidscore: req.body.rfidscore,
            javascore: req.body.javascore,
            linuxscore: req.body.linuxscore,
        });
        if (scores) {
            res.send("添加成功")
        }
    } catch (error) {
        if (error.code === 11000) {
            res.send = "该学生已有成绩";
        } else(console.log(error));
    }
})

app.post('/score/delete', async function (req, res) {
    try {
        await Score.deleteOne({
            studentid: req.body.studentid,
        })
        res.send({
            message: "删除成功"
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/score/update', async function (req, res) {
    try {
        console.log(req.body);
        await Score.updateOne({
            studentid: req.body[5],
        }, {
            $set: {
                webscore: req.body[0],
                sqlscore: req.body[1],
                rfidscore: req.body[2],
                javascore: req.body[3],
                linuxscore: req.body[4],
            }
        })
        res.send({
            message: "修改成功"
        })
    } catch (error) {
        console.log(error);
    }
})

app.post('/course/create', async function (req, res) {
    const course = await Course.create({
        classname: "03211903",
        course1_1: null,
        course1_2: "Web前端开发",
        course1_3: "数据库管理及应用",
        course1_4: null,
        course2_1: "程序设计基础",
        course2_2: "数据库管理及应用",
        course2_3: null,
        course2_4: "Linux系统管理",
        course3_1: "RFID技术与应用",
        course3_2: "RFID技术与应用",
        course3_3: null,
        course3_4: null,
        course4_1: "Linux系统管理",
        course4_2: null,
        course4_3: "Web前端开发",
        course4_4: null,
        course5_1: "程序设计基础",
        course5_2: "Web前端开发",
        course5_3: null,
        course5_3: "Linux系统管理",
    });
    res.send(course);
})

app.post('/home/register', async function (req, res) {
    let admin = req.body.ID;
    if (admin.slice(0, 1) == "#") {
        admin = "教师";
    } else {
        admin = "学生";
    }
    try {
        const user = await User.create({
            username: req.body.UserName,
            password: req.body.PassWord,
            id: req.body.ID,
            number: req.body.Number,
            admin: admin,
            img: "/img/User_Null.png",
            logintime: null,
        });
        if (user) {
            res.send({
                message: "Success"
            });
        }
    } catch (error) {
        if (error.code === 11000) {
            res.send({
                message: "用户已存在!"
            });
        } else(console.log(error));
    }
});

app.post('/manage/User/Create', async (req, res) => {
    try {
        console.log(req);
        const user = await User.create({
            username: req.body.Create_Value.name,
            password: req.body.Create_Value.password,
            id: req.body.Create_Value.id,
            number: req.body.Create_Value.number,
            admin: req.body.Create_Value.admin,
            img: "/img/User_Null.png",
            logintime: null,
        });
        if (user) {
            res.send({
                message: "Success"
            });
        }
    } catch (error) {
        if (error.code === 11000) {
            res.send({
                message: "用户已存在!"
            });
        } else(console.log(error));
    }
})

app.post('/home/login', async function (req, res) {



    const user = await User.findOne({
        id: req.body.ID,
    });
    if (!user) {
        return res.send({
            message: "Null"
        })
    }
    const Boolean_PassWord = require('bcrypt').compareSync(
        req.body.PassWord, user.password)
    if (!Boolean_PassWord) {
        return res.send({
            message: "Wrong"
        })
    }
    if (Boolean_PassWord) {
        User.updateOne({
            id: req.body.ID,
        }, {
            $set: {
                logintime: Time()
            }
        }, function (err, val) {
            console.log(val);
        });
        res.send({
            user,
            message: "Success"
        })
    }
})

app.post('/home/img', async function (req, res) {
    const id = req.body.ID;
    const Img = await Course.findOne({
        id: id,
    });
    res.send(Img.img);
})

app.post('/course/all', async function (req, res) {
    const classname = req.body.ClassName;
    const courses = await Course.findOne({
        classname: classname,
    });
    res.send(courses);
})

app.post("/file/img", upload.single("UserImg"), (req, res) => {
    const ImgId = req.body.UserID;
    var {
        buffer,
        mimetype,
        encoding,
        originalname,
        fieldname,
        size
    } = req.file;

    if (size >= 5000000) {
        return res.send({
            err: -1,
            message: "图片尺寸过大"
        })
    };

    const type = ["jpg", "gif", "png", "jpeg"];
    const extName = mimetype.split("/")[1]
    if (type.indexOf(extName) === -1) {
        return res.send({
            err: -2,
            message: "图片类型错误！"
        })
    };

    const ext = req.file.mimetype.split("/")[1];

    fs.writeFile(path.join(__dirname, "./public/img/" + ImgId + "." + ext), buffer, (err) => {
        if (err) {
            console.log(err);
            res.send({
                err: -3,
                message: "图片上传失败！"
            })
        } else {
            const ImgName = "/img/" + ImgId + "." + ext;
            console.log(ImgName);
            User.updateOne({
                id: ImgId
            }, {
                $set: {
                    img: ImgName
                }
            }, function (err, val) {
                console.log(val);
            });
            res.send({
                message: "图片上传成功！",
                path: ImgName
            })
        }
    })
})

app.post('/home/go', async function (req, res) {
    console.log(req.body);
    try {
        let home = Homes.create({
            id: req.body.id,
            username: req.body.username,
            classnum: req.body.classnum,
            classname: req.body.classname,
            reason: req.body.reason,
            date: Time(),
            text: "驳回原因",
            state: "未处理"
        });
        res.send({
            message: "申请提交成功",
            home
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: "申请提交失败"
        })
    }
})

app.post('/home/all', async function (req, res) {
    const ID = req.body.id;
    console.log(ID);
    try {
        const home = await Homes.find({
            id: ID,
        })
        res.send(home);
    } catch (error) {
        console.log(error);
    }
})

app.get('/home/getall', async function (req, res) {
    const homes = await Homes.find();
    res.send(homes);
})

app.post('/home/cant', async function (req, res) {
    let Text;
    console.log(req.body)
    if (req.body.state == "已处理(同意)") {
        Text = "同意";
    } else {
        Text = req.body.text;
    }
    Homes.updateOne({
        id: req.body.id,
        _id: req.body._id,
    }, {
        $set: {
            text: Text,
            state: req.body.state,
            returndate: Time(),
        }
    }, function (err, val) {
        console.log(val);
    });
    res.send({
        message: '驳回成功'
    })
})

app.post('/manage/homefind', async function (req, res) {
    let regexp = new RegExp(req.body.font, 'i');
    console.log(regexp);
    Homes.find({
        $or: [{
                id: {
                    $regex: regexp
                }
            },
            {
                state: {
                    $regex: regexp
                }
            },
            {
                username: {
                    $regex: regexp
                }
            }, {
                date: {
                    $regex: regexp
                }
            }, {
                classname: {
                    $regex: regexp
                }
            }
        ]
    }, (err, doc) => {
        if (err) {
            res.send({
                isSuccess: false,
                msg: "查询失败"
            })
        } else {
            res.send({
                doc
            })
        }
    })
})

app.get('/life/all', async (req, res) => {
    const life = await Life.find();
    res.send(life);
})

app.post('/life/delete', async (req, res) => {
    await Life.deleteOne({
        mid: req.body.mid
    })
    res.send({
        message: "删除成功"
    })
})

app.post('/life/create', async function (req, res) {
    console.log(req.body);
    try {
        const home = await Life.create({
            userid: "无人使用",
            mid: req.body.mid,
            mname: req.body.mname,
            mtype: "未使用",
            maddress: req.body.maddress,
            mstate: "空闲",
            date: Time(),
            starttime: "未使用",
            endtime: "未使用"
        });
        res.send({
            message: "机器添加成功",
            home
        });
    } catch (error) {
        if (error.code === 11000) {
            res.send({
                message: "设备已存在"
            })
        }
    }
})

app.post('/life/update', async (req, res) => {
    console.log(req.body);
    try {
        const life = await Life.updateOne({
            mid: req.body.mid,
        }, {
            userid: req.body.userid,
            mtype: req.body.mtype,
            mstate: "正在使用",
            starttime: Time(),
            endtime: Time_End()
        })
        res.send({
            message: "提交成功"
        })
    } catch (error) {
        console.log(error);
    }
})

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('应用实例，访问地址为 http://127.0.0.1:', host, port);
});

app.post('/manage/lifefind', async function (req, res) {
    let regexp = new RegExp(req.body.font, 'i');
    console.log(regexp);
    Life.find({
        $or: [{
                mid: {
                    $regex: regexp
                }
            },
            {
                maddress: {
                    $regex: regexp
                }
            },
            {
                date: {
                    $regex: regexp
                }
            },
            {
                endtime: {
                    $regex: regexp
                }
            },
            {
                mname: {
                    $regex: regexp
                }
            },
            {
                mstate: {
                    $regex: regexp
                }
            },
            {
                userid: {
                    $regex: regexp
                }
            }
        ]
    }, (err, doc) => {
        if (err) {
            res.send({
                isSuccess: false,
                msg: "查询失败"
            })
        } else {
            res.send({
                doc
            })
        }
    })
})

app.post('/manage/scorefind', async function (req, res) {
    let regexp = new RegExp(req.body.font, 'i');
    console.log(regexp);
    Score.find({
        $or: [{
                studentid: {
                    $regex: regexp
                }
            },
            {
                username: {
                    $regex: regexp
                }
            },
            {
                classid: {
                    $regex: regexp
                }
            }
        ]
    }, (err, doc) => {
        if (err) {
            res.send({
                isSuccess: false,
                msg: "查询失败"
            })
        } else {
            res.send({
                doc
            })
        }
    })
})

app.post('/life/feekback', async function (req, res) {
    console.log(req.body);
    try {
        FeekBack.create({
            userid: req.body.userid,
            uptime: Time(),
            type: req.body.type,
            text: req.body.text
        })
    } catch (error) {
        console.log(error);
        res.send("提交错误");
    }
})

app.get('/feekback/all', async function (req, res) {
    const Feeks = await FeekBack.find()
    res.send(Feeks);
})