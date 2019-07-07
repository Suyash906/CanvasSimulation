import {gql} from 'apollo-boost';

const signUp = gql`
mutation($SjsuId:ID, $password:String, $Name: String, $Email: String, $userType:String){
    signUp(SjsuId: $SjsuId, password:$password, Name:$Name, Email:$Email, userType:$userType){
      status,
      msg
    }
}`


const createCourse = gql`mutation($CourseName: String, $CourseDept: String, $CourseDescription: String, $CourseRoom:String, $CourseCapacity:Int, $WaitlistCapacity:Int, $CourseTem: String, $CourseCode: Int, $SjsuId:ID){
    createCourse(CourseName:$CourseName, CourseDept: $CourseDept, CourseDescription:$CourseDescription, CourseRoom: $CourseRoom, CourseCapacity:$CourseCapacity, WaitlistCapacity:$WaitlistCapacity, CourseTem: $CourseTem, CourseCode: $CourseCode, SjsuId:$SjsuId){
           success,
      message
    }
  }
`
const updateProfile = gql`mutation($SjsuId:ID, $Name: String, $Email: String, $phoneNumber: Int, $city: String, $country: String, $hometown: String, $languages:String, $aboutMe:String){
    updateProfile(SjsuId:$SjsuId, Name:$Name, Email:$Email, phoneNumber:$phoneNumber, city:$city, country:$country, hometown:$hometown, languages:$languages, aboutMe:$aboutMe){
        success,
        message
    }
}`

const enrollCourse = gql`mutation($SjsuId:ID, $courseId:ID){
    enrollCourse(SjsuId:$SjsuId, courseId:$courseId){
        success,
        message
    }
}`
export {signUp, createCourse, updateProfile, enrollCourse};