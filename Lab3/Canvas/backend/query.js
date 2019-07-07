const crypt = require('./encryption');
const {client} = require(`./db`);
const {CourseModel}= require('./models/course')

var Queries = {}

Queries.findUser = (user, successCallBack, failureCallback) => {
    console.log(user);
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({Email:user.Email, userType:user.userType}, (error, result) => {
            if(result){
                successCallBack(result)
            } else {
                failureCallback(error);
            }
        })
        
    })
}

Queries.findUserById = (user, successCallBack, failureCallback) => {
    console.log(user);
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({SjsuId:user.SjsuId}, (error, result) => {
            if(result){
                successCallBack(result)
            } else {
                failureCallback(error);
            }
        })
        
    })
}

Queries.createUser = (user, successCallBack, failureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({Email:user.Email}, (error, result) => {
            if(result){
                failureCallback("User already registered");
            } else {
                collection.insertOne(user, function(err, res) {
                    if (err) {
                        console.log(`${err}`);
                    } 
                    successCallBack("1 document inserted");
                });
            }
        })
    })
}

Queries.findUserProfile = (user, successCallback, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({SjsuId:user.SjsuId}, (error, result) => {
            if(result){
                console.log(`result query`);
                console.log(result);
                successCallback({profileData:result});
            } else {
                faliureCallback(`User with SJSU ID ${user.SjsuId} Not Found : ${error}`);
            }
        })
    });
}

Queries.updateUserProfile = (user, successCallback, faliureCallback) => {
    const query = {SjsuId:user.SjsuId};
    Object.keys(UserModel).forEach(function (item) {
        UserModel[item] = user[item];
    });
    const update = {$set:UserModel};
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.updateOne(query, update, (error, result) => {
            if(result){
                console.log(`result query`);
                console.log(result);
                successCallback({profileData:result});
            } else {
                faliureCallback(`User with SJSU ID ${user.SjsuId} Not Found : ${error}`);
            }
        })
    });
}

Queries.enrollCourse = (course, successCallback, faliureCallback) => {
    client.connect(err => {
        console.log(`course.courseId  = ${course.courseId}`);
        const collection = client.db("canvas").collection("courses");
            collection.findOne({courseId:course.courseId}, (error, result) => {
                if(result){
                    console.log(result);
                    const userCollection = client.db("canvas").collection("user");
                    const query = {SjsuId:course.SjsuId};
                    const update = {$push:{courseEnrolled:{$each:[result]}}};
                    client.connect(err => {
                        userCollection.updateOne(query, update, (error, res) => {
                            if(res){
                                successCallback(`Student Enrolled`);
                            } else {
                                faliureCallback(`${error}`);
                            }
                        })
                    });
    
                } else {
                    console.log(`Student Enrolled`);
                    successCallback(`Student Enrolled`)
                }
        })
    })
}

Queries.findEnrolledCourses = (user, successCallBack, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({SjsuId:user.SjsuId}, (error, result) => {
            if(result){
                if(result.courseEnrolled)
                    successCallBack(result.courseEnrolled);
                else if(result.courseCreated)
                    successCallBack(result.courseCreated);
                else
                    successCallBack([]);
            } else {
                
                    faliureCallback(error);    
            }
        })
        
    })
}

Queries.findCreatedCourses = (user, successCallBack, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({SjsuId:user.SjsuId}, (error, result) => {
            if(result){
                successCallBack(result.courseCreated);
            } else {
                failureCallback(error);
            }
        })    
    })
}

Queries.createCourse = (course, successCallback, faliureCallback) => {
    Object.keys(CourseModel).forEach(function (item) {
        CourseModel[item] = course[item];
    });
    client.connect(err => {
        const collection = client.db("canvas").collection("courses");
        collection.find({}).toArray((err, res) => {
            if (err){
                faliureCallback("DB Connection Failed");
            } else {
                let courseId = res.length + 1;
                CourseModel.courseId = courseId;
                collection.insertOne(CourseModel, function(err, res) {
                    if (err) 
                        faliureCallback(err);
                    else{
                        const userCollection = client.db("canvas").collection("user");
                        const query = {SjsuId:CourseModel.SjsuId};
                        const update = {$push:{courseCreated:{$each:[CourseModel]}}};
                        client.connect(err => {
                        userCollection.updateOne(query, update, (error, result) => {
                            if(result){
                                successCallback(`Course Successfully Added`);
                            } else {
                                faliureCallback(`User with SJSU ID ${CourseModel.SjsuId} Not Found : ${error}`);
                            }
                        })
                    });            
                    }
                })
            }
        })  
    })
}

Queries.searchCourse = (course, successCallback, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("courses");
        collection.find({}).toArray((err, res) => {
            if (err){
                faliureCallback("DB Connection Failed");
            } else {
                successCallback(res);
            }
        })
    });
}

module.exports = Queries;