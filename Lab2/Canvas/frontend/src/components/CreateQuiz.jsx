import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../config';
import SideNavBar from './SideNavBar';

class CreateQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            navBarData:Config.facultyNavbarData,
            CourseId:1,
            FacultyId:localStorage.getItem('userId'),
            questions:[{questionStatement:"", optionA:"", optionB:"", optionC:"", optionD:""}]
        }
    }

    addNewQuestion = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            questions: [...prevState.questions, {questionStatement:"", optionA:"", optionB:"", optionC:"", optionD:""}],
        }));
        console.log("this.state.questions");
        console.log(this.state.questions);
    }

    onSubmit = (e) => {
        e.preventDefault();
        let params = this.state;
        delete params.navBarData;
        console.log(JSON.stringify(params));
        axios.post(`${Config.BASE_URL}/createQuiz`, params)
            .then(response => {
                console.log(response.data);
                console.log(`Response status - ${response.status}`);
            })
    }

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

    render(){
        let {questions} = this.state
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"120px" ,position:"relative"}}>
                    <SideNavBar navBarData ={this.state.navBarData} clickActionData={this.state.clickActionData}></SideNavBar>
                </div>
                <div className="col-md-9 col-sm-9 col-xs-9">
                    <form onSubmit={this.onSubmit} onChange={this.onChange}>
                        <div class="form-group row">
                            <label for="Startdate" class="col-2 col-form-label">Start Date</label>
                            <div class="col-4">
                               <input class="form-control" type="datetime-local" id="Startdate" name="Startdate"/>
                            </div>
                            <label for="DueDate" class="col-2 col-form-label">Due Date</label>
                            <div class="col-4">
                               <input class="form-control" type="datetime-local" id="DueDate" name="DueDate"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="MaximummMarks" class="col-2 col-form-label">Maximumm Grade</label>
                            <div className="col-4">
                                <input class="form-control" type="number" id="MaximummMarks" name="MaximummMarks"/>   
                            </div>
                            <div className="col-4">
                                <button onClick={this.addNewQuestion}>Add New Question</button>
                            </div>
                        </div>
                        {
                            questions.map((val, idx)=> {
                                let questionId = `question-${idx}`, optionAId = `optionA-${idx}`, optionBId = `optionB-${idx}`, optionCId = `optionC-${idx}`, optionDId = `optionD-${idx}`, correctAnswerId = `correctAnswer-${idx}`, marksId = `marks-${idx}`
                                return (
                                    <div id={idx}>
                                        <div className="clear"><br/></div>
                                        <div className="row">
                                            <div className="col">
                                            </div>
                                                <input type="text" className="form-control" id={questionId} name={questionId} placeholder="Question Statement"/>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" className="form-control"  id={optionAId} name={optionAId} placeholder="Option A"/>
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control"  id={optionBId} name={optionBId} placeholder="Option B"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" className="form-control"  id={optionCId} name={optionCId} placeholder="Option C"/>
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control"  id={optionDId} name={optionDId} placeholder="Option D"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label className="mr-sm-2" for={correctAnswerId}>Correct Answer</label>
                                                <select className="custom-select mr-sm-2" id={correctAnswerId} name={correctAnswerId}>
                                                    <option value="1" >Choose</option>
                                                    <option value="1" >Option A</option>
                                                    <option value="2">Option B</option>
                                                    <option value="3">Option C</option>
                                                    <option value="3">Option C</option>
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label className="mr-sm-2" for={marksId}>Marks</label>
                                                <input type="number" className="form-control"  id={marksId} name={marksId} placeholder="Max Score for this question"/>
                                            </div>
                                        </div>
                                        <div className="clear"><br/></div>
                                    </div>
                                )
                            })
                        }
                        <input type="submit" value="Create Quiz" />
                    </form>
                </div>
            </div>  
        );
    }
}

export default CreateQuiz;