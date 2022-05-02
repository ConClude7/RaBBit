var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/express', {
    useNewUrlParser: true,
});

const UserScheme = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        set(psw) {
            return require('bcrypt').hashSync(psw, 10);
        }
    },
    id: {
        type: String,
        unique: true
    },
    number: {
        type: String,
        unique: true
    },
    img: {
        type: String
    },
    logintime: {
        type: String
    },
    admin: {
        type: String
    },
});

const ScoreScheme = new mongoose.Schema({
    studentid: {
        type: String,
        unique: true
    },
    classid: {
        type: String
    },
    username: {
        type: String
    },
    webscore: {
        type: Number
    },
    sqlscore: {
        type: Number
    },
    rfidscore: {
        type: Number
    },
    javascore: {
        type: Number
    },
    linuxscore: {
        type: Number
    }
})

const CourseScheme = new mongoose.Schema({
    classname: {
        type: String,
        unique: true,
    },
    0: {
        type: String,
    },
    1: {
        type: String,
    },
    2: {
        type: String,
    },
    3: {
        type: String,
    },
    4: {
        type: String,
    },
    5: {
        type: String,
    },
    6: {
        type: String,
    },
    7: {
        type: String,
    },
    8: {
        type: String,
    },
    9: {
        type: String,
    },
    10: {
        type: String,
    },
    11: {
        type: String,
    },
    12: {
        type: String,
    },
    13: {
        type: String,
    },
    14: {
        type: String,
    },
    15: {
        type: String,
    },
    16: {
        type: String,
    },
    17: {
        type: String,
    },
    18: {
        type: String,
    },
    19: {
        type: String,
    },
})

const HomeScheme = new mongoose.Schema({
    id: {
        type: String
    },
    classnum: {
        type: String
    },
    classname: {
        type: String
    },
    reason: {
        type: String
    },
    date: {
        type: String
    },
    text: {
        type: String
    },
    state: {
        type: String
    },
    username: {
        type: String
    },
    returndate: {
        type: String,
    }
})

const LifeScheme = new mongoose.Schema({
    userid: {
        type: String
    },
    mid: {
        type: String,
        unique: true
    },
    mname: {
        type: String
    },
    mtype: {
        type: String
    },
    maddress: {
        type: String
    },
    mstate: {
        type: String
    },
    date: {
        type: String,
    },
    starttime: {
        type: String
    },
    endtime: {
        type: String
    },
})

const FeekBackScheme = new mongoose.Schema({
    userid: {
        type: String
    },
    uptime: {
        type: String
    },
    type: {
        type: String
    },
    text: {
        type: String
    },
})

const User = mongoose.model('User', UserScheme);

const Score = mongoose.model('Score', ScoreScheme);

const Course = mongoose.model('Course', CourseScheme);

const Homes = mongoose.model('Home', HomeScheme);

const Life = mongoose.model('Life', LifeScheme);

const FeekBack = mongoose.model('FeekBack', FeekBackScheme);

module.exports = {
    User,
    Score,
    Course,
    Homes,
    Life,
    FeekBack
};