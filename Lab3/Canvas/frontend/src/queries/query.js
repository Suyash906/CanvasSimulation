import {gql} from 'apollo-boost';
const login  = gql`
query login($Email: String, $password: String, $userType: String) {
    login(Email: $Email, password: $password, userType: $userType){
      success
      userType
      token
      SjsuId
    }
}`

const profile  = gql`query profile($SjsuId: ID) {
    profile(SjsuId: $SjsuId){
        success
        Name
        Email
        phoneNumber
        city
        country
        hometown
        languages
        aboutMe
        userType
    }
}`

const dashboard  = gql`query dashboard($SjsuId: ID) {
    dashboard(SjsuId: $SjsuId){
        message
        courseData {
            CourseName
            CourseDept
            CourseRoom
            CourseCode
            CourseCapacity
            CourseDescription
            WaitlistCapacity
        }
    }
}`

const searchCourses  = gql`query searchCourses{
    searchCourses {
        message
      courseData {
        CourseName
        CourseDept
        CourseRoom
        CourseCode
        CourseCapacity
        CourseDescription
        WaitlistCapacity
      }
    }
}`

export {
    login,
    profile,
    dashboard,
    searchCourses
}