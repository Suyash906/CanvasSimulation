const graphql = require(`graphql`);
const _ = require('lodash');
const Queries = require('../query');
const crypt  = require('../encryption');
const jwt = require('jsonwebtoken');
const {UserModel} = require(`../models/user`);
const applicationConfig = require('../config/application');
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLSchema,  
    GraphQLID,
    GraphQLBoolean,
    GraphQLList 
}  = graphql;

const ProfileType = new GraphQLObjectType({
    name: `User`,
    fields: () => ({
        SjsuId: {type:GraphQLID},
        Name: {type:GraphQLString},
        Email: {type:GraphQLString},
        phoneNumber: {type:GraphQLInt},
        city: {type:GraphQLString},
        country: {type:GraphQLString},
        hometown: {type:GraphQLString},
        languages: {type:GraphQLString},
        profileImagePath: {type:GraphQLString},
        password: {type:GraphQLString},
        userType: {type:GraphQLString},
        aboutMe: {type:GraphQLString},
        success:{type:GraphQLBoolean},
        message:{type:GraphQLString}
    })
})

const LoginType = new GraphQLObjectType({
    name: `login`,
    fields: () => ({
        SjsuId: {type:GraphQLID},
        userType: {type:GraphQLString},
        token: {type:GraphQLString},
        success: {type:GraphQLBoolean},
        message: {type:GraphQLString}
    })
})

const CourseType = new GraphQLObjectType({
    name: `createCourse`,
    fields: () => ({
        success: {type:GraphQLBoolean},
        message: {type:GraphQLString}
    })
})

const UpdateProfileType = new GraphQLObjectType({
    name: `updateProfile`,
    fields: () => ({
        success: {type:GraphQLBoolean},
        message: {type:GraphQLString}
    })
})

const CourseDetailsType = new GraphQLObjectType({
    name: `coursedetails`,
    fields: () => ({
        CourseName: {
            type: GraphQLString
        },
        CourseDept: {
            type: GraphQLString
        },
        CourseDescription: {
            type: GraphQLString
        },
        CourseRoom: {
            type: GraphQLString
        },
        CourseCapacity: {
            type: GraphQLInt
        },
        WaitlistCapacity: {
            type: GraphQLInt
        },
        CourseCode: {
            type: GraphQLInt
        },
        CourseTem: {
            type: GraphQLString
        }
    })
})

const DashboardType = new GraphQLObjectType({
    name: `dashboard`,
    fields: () => ({
        courseData: {type : new GraphQLList(CourseDetailsType)},
        message: {type:GraphQLString}
    })
})



const SearchCoursesType = new GraphQLObjectType({
    name: `searchCourses`,
    fields: () => ({
        courseData: {type : new GraphQLList(CourseDetailsType)},
        message: {type:GraphQLString}
    })
})

const SignUpType = new GraphQLObjectType({
    name: `signUp`,
    fields: () => ({
        status: {type:GraphQLString},
        msg: {type:GraphQLString}
    })
})
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        login: {
            type: LoginType,
            args: {Email: {type:GraphQLString}, password: {type:GraphQLString}, userType: {type:GraphQLString}},
            async resolve(parent, args){
                console.log(`args`);
                console.log(args);
                return new Promise(async (resolve, reject) => {
                    await Queries.findUser({Email:args.Email, userType:args.userType}, 
                        (result)=>{
                            crypt.compareHash(args.password, result.password, (err, passwordMatched) => {
                                if (passwordMatched && !err) {
                                    var token = jwt.sign({ SjsuId:result.SjsuId },applicationConfig.secretKey, {
                                        expiresIn: 10800
                                    });
                                    console.log({ success: true, userType: result.userType, token:  token , SjsuId:result.SjsuId});
                                    resolve({ success: true, userType: result.userType, token:  token , SjsuId:result.SjsuId})
                                }
                            });       
                        }, (error)=>{
                            resolve({ success: false, message:"Authentication failed. Passwords did not match."})
                        }
                    );

                });
            }
        },
        profile: {
            type: ProfileType,
            args: {SjsuId: {type:GraphQLID}},
            async resolve(parent, args){
                console.log(`args`);
                console.log(args);
                return new Promise(async (resolve, reject) => {
                    await Queries.findUserById({SjsuId:args.SjsuId}, 
                        (result)=>{
                            console.log(`result`);
                            console.log(result);
                            resolve({success: true, message:"User Found", SjsuId:result.SjsuId, Name:result.Name, Email:result.Email, phoneNumber:result.phoneNumber, city:result.city, country:result.country, hometown:result.hometown, languages:result.languages, aboutMe:result.aboutMe});       
                        }, (error)=>{
                            resolve({ success: false, message:"Authentication failed. Passwords did not match."})
                        }
                    );

                });
            }
        },
        dashboard: {
            type: DashboardType,
            args: {SjsuId: {type:GraphQLID}},
            async resolve(parent, args){
                console.log(`args`);
                console.log(args);
                return new Promise(async (resolve, reject) => {
                    await Queries.findEnrolledCourses({SjsuId:args.SjsuId}, 
                        (result)=>{
                            console.log(`result`);
                            console.log(result);
                            resolve({success: true, message: "Courses Found", courseData:result});       
                        }, (error)=>{
                            resolve({ success: false, message:"Authentication failed. Passwords did not match."})
                        }
                    );

                });
            }
        },
        searchCourses : {
            type: SearchCoursesType
            ,
            async resolve(parent, args){
                console.log(`args`);
                console.log(args);
                return new Promise(async (resolve, reject) => {
                    await Queries.searchCourse({}, 
                        (result)=>{
                            console.log(`result`);
                            console.log(result);
                            resolve({success: true, message: "Courses Found", courseData:result});       
                        }, (error)=>{
                            resolve({ success: false, message:"Authentication failed. Passwords did not match."})
                        }
                    );

                });
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        signUp : {
            type: SignUpType,
            args: {
                SjsuId: {
                    type: GraphQLID
                },
                password: {
                    type: GraphQLString
                },
                Name: {
                    type: GraphQLString
                },
                Email: {
                    type: GraphQLString
                },
                userType: {
                    type: GraphQLString
                },
            },
            async resolve(parent, args){
                console.log(`args`);
                console.log(args);
                return new Promise(async (resolve, reject) => {
                    await crypt.createHash(args.password, function (passwordResponse) {
                        Object.keys(UserModel).forEach(function (item) {
                            UserModel[item] = args[item];
                        });
                        UserModel.password = passwordResponse;
                    })
                    await Queries.createUser(UserModel, 
                        (result)=>{
                            console.log({
                                status:`Success`,
                                msg: "User added"
                            });
                            resolve({
                                status:`Success`,
                                msg: "User added"
                            })       
                        }, (error)=>{
                            resolve({
                                status:"error",
                                msg:"System Error, Try Again."
                            })
                        }
                    );

                });
            }

        }, 
        createCourse : {
            type: CourseType,
            args: {
                CourseName: {
                    type: GraphQLString
                },
                CourseDept: {
                    type: GraphQLString
                },
                CourseDescription: {
                    type: GraphQLString
                },
                CourseRoom: {
                    type: GraphQLString
                },
                CourseCapacity: {
                    type: GraphQLInt
                },
                WaitlistCapacity: {
                    type: GraphQLInt
                },
                CourseCode: {
                    type: GraphQLInt
                },
                CourseTem: {
                    type: GraphQLString
                },SjsuId: {
                    type:GraphQLID
                }
            },
            async resolve(parent, args){
                console.log(`args`);
                console.log(args);
                return new Promise(async (resolve, reject) => {
                    await Queries.createCourse(args, 
                        (result)=>{
                            console.log({success:true,message:`Course Created`});
                            resolve({success:true,message:`Course Created`})       
                        }, (error)=>{
                            console.log({success:false, message:`Course Created`});
                            resolve({success:false, message:`Course Created`})
                        }
                    );
                });
            }
        }, 
        enrollCourse : {
            type: CourseType,
            args: {
                courseId: {
                    type: GraphQLID
                },
                SjsuId:{
                    type: GraphQLID
                }
            },
            async resolve(parent, args){
                console.log(`args`);
                console.log(args);
                return new Promise(async (resolve, reject) => {
                    await Queries.enrollCourse(args, 
                        (result)=>{
                            console.log({success:true,message:`Course Enrolled`});
                            resolve({success:true,message:`Course Enrolled`});       
                        }, (error)=>{
                            console.log({success:true, message:`Course cannnot be enrolled. Error Connecting to server`});
                            resolve({success:false, message:`Course cannnot be enrolled. Error Connecting to server`})
                        }
                    );
                });
            }
        },
        updateProfile : {
            type: UpdateProfileType,
            args: {
                    SjsuId: {type:GraphQLID},
                    Name: {type:GraphQLString},
                    Email: {type:GraphQLString},
                    phoneNumber: {type:GraphQLInt},
                    city: {type:GraphQLString},
                    country: {type:GraphQLString},
                    hometown: {type:GraphQLString},
                    languages: {type:GraphQLString},
                    aboutMe: {type:GraphQLString}
            },
            async resolve(parent, args){
                console.log(`args`);
                console.log(args);
                return new Promise(async (resolve, reject) => {
                    await Queries.updateUserProfile(args, 
                        (result)=>{
                            console.log({success:true,message:`Profile Updated`});
                            resolve({success:true,message:`Profile Updated`});       
                        }, (error)=>{
                            console.log({success:true, message:`Profile cannnot be updated. Error Connecting to server`});
                            resolve({success:false, message:`Profile cannnot be updated. Error Connecting to server`})
                        }
                    );
                });
            }
        }
        
    })
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})