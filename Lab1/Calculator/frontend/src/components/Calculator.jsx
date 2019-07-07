import ReactDOM from "react-dom";
import React, { Component } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class Calculator extends Component{
    constructor(props){
        super(props);
        this.state = {result: "0"}
    }

    computeResult(){
        var data = {
            expression: this.state.result
        }
        axios.post('http://localhost:5001/', data)
            .then((response) => {
            console.log("response.data.result:" + response.data.result)
            if (response.data.result !== undefined) {
                this.setState({
                  result: response.data.result,
      
                });
            }
        })
    }

    appendString(string){
        if(this.state.result === "0"){
            this.setState({result:string});
        } else {
            console.log(this.state.result);
            console.log(string);
            this.setState({result:this.state.result+string});
        }
    }

    clearResultBox(){
        this.setState({
            result:"0"
        });
    }

    render(){
        return(
        <div style={{width:"30%", marginTop: "10%",marginLeft: "35%"}}>
            <table className="table table-bordered table-condensed text-center table-curved">
                <tr>
                    <td colspan="5">
                        <input disabled style={{width:"100%"}} type="text" placeholder="Result" name="result" value={this.state.result} />
                    </td>
                </tr>
                <tr>
                    <td style={{width:"20%"}} className="align-middle"><button className="btn btn-secondary" onClick={() => this.appendString(9)}>&nbsp;9&nbsp;</button></td>
                    <td style={{width:"20%"}} className="align-middle"><button className="btn btn-secondary"  onClick={() => this.appendString("8")}>&nbsp;8&nbsp;</button></td>
                    <td style={{width:"20%"}} className="align-middle"><button className="btn btn-secondary"  onClick={() => this.appendString("7")}>&nbsp;7&nbsp;</button></td>
                    <td style={{width:"20%"}} className="align-middle" rowspan="2"  onClick={() => this.appendString("+")}><button class="btn btn-secondary btn-lg">+</button></td>
                    <td style={{width:"20%"}} className="align-middle" rowspan="2"><button class="btn btn-secondary btn-lg"  onClick={() => this.appendString("-")}>-</button></td>
                </tr>
                <tr>
                    <td className="align-middle"><button className="btn btn-secondary" onClick={() => this.appendString("6")}>&nbsp;6&nbsp;</button></td>
                    <td className="align-middle"><button className="btn btn-secondary" onClick={() => this.appendString("5")}>&nbsp;5&nbsp;</button></td>
                    <td className="align-middle"><button className="btn btn-secondary" onClick={() => this.appendString("4")}>&nbsp;4&nbsp;</button></td>
                </tr>
                <tr>
                    <td style={{width:"20%"}} className="align-middle"><button className="btn btn-secondary" onClick={() => this.appendString("3")}>&nbsp;3&nbsp;</button></td>
                    <td style={{width:"20%"}} className="align-middle"><button className="btn btn-secondary" onClick={() => this.appendString("2")}>&nbsp;2&nbsp;</button></td>
                    <td style={{width:"20%"}} className="align-middle"><button className="btn btn-secondary" onClick={() => this.appendString("1")}>&nbsp;1&nbsp;</button></td>
                    <td style={{width:"20%"}} className="align-middle" rowspan="2"><button className="btn btn-secondary btn-lg" onClick={() => this.appendString("*")}>*</button></td>
                    <td style={{width:"20%"}} className="align-middle" rowspan="2"><button className="btn btn-secondary btn-lg" onClick={() => this.appendString("/")}>/</button></td>
                </tr>
                <tr>
                    <td class="align-middle"><button class="btn btn-secondary " onClick={() => this.clearResultBox()}>CLR</button></td>
                    <td class="align-middle"><button class="btn btn-secondary" onClick={() => this.appendString("0")}>&nbsp;0&nbsp;</button></td>
                    <td class="align-middle"><button class="btn btn-secondary" onClick={() => this.computeResult()}>=</button></td>
                </tr>
            </table>
        </div>

        );

    }
}

export default Calculator;