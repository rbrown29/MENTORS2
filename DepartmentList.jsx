import React from "react";
import DepartmentBlock from "./DepartmentBlock.jsx";

const DEPT_COL = "dept";
const NAME_COL = "name";
const DEPT_COL_ASC = "+dept";
const DEPT_COL_DESC = "-dept";
const NAME_COL_ASC = "+name";
const NAME_COL_DESC = "-name";
const UPWARD_TRI = "\u25B2";
const DOWNWARD_TRI = "\u25BC";

class DepartmentHeader extends React.Component {
   
    render() {
        var order = this.props.order;
        return (
            <thead>
                <tr>
                    <th style={{cursor: "pointer"}} scope="col" onClick={this.props.clickHandler.bind(this, DEPT_COL)}>Department&nbsp;{
                        (order === DEPT_COL_ASC) ? UPWARD_TRI : (order === DEPT_COL_DESC) ? DOWNWARD_TRI : ""
                    }</th>
                    <th style={{cursor: "pointer"}} scope="col" onClick={this.props.clickHandler.bind(this, NAME_COL)}>Mentor&nbsp;{
                        (order === NAME_COL_ASC) ? UPWARD_TRI : (order === NAME_COL_DESC) ? DOWNWARD_TRI : ""
                    }</th>
                </tr>
            </thead>
        );
    }
}

export default class DepartmentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { order: DEPT_COL_ASC };
    }
    changeOrder(col) {
        console.log("Old order: " + this.state.order);
        if (col == DEPT_COL){
            if (this.state.order == DEPT_COL_ASC) {
                this.setState({ order: DEPT_COL_DESC });
            } else {
                this.setState({ order: DEPT_COL_ASC });
            }
        } else {
            if (this.state.order == NAME_COL_ASC) {
                this.setState({ order: NAME_COL_DESC });
            } else {
                this.setState({ order: NAME_COL_ASC });
            }
        }
        
    }
    render() {
        console.log("Order changed to " + this.state.order);
        function compareDepartments(d1, d2){
            var mentorIds = this.props.mentorIds;
            var n1, n2;
            switch (this.state.order) {
                case DEPT_COL_ASC:
                    return d1.dept.localeCompare(d2.dept);
                case DEPT_COL_DESC:
                    return d2.dept.localeCompare(d1.dept);
                case NAME_COL_ASC:
                    if (d1.mentorid == "0") {
                        n1 = "\u2014";
                    }else {
                        n1 = mentorIds[d1.mentorid].lastname;
                    }
                    if (d2.mentorid == "0") {
                        n2 = "\u2014";
                    } else {
                        n2 = mentorIds[d2.mentorid].lastname;
                    }
                    return n1.localeCompare(n2);
                case NAME_COL_DESC:
                    if (d1.mentorid == "0") {
                        n1 = "\u2014";
                    }else {
                        n1 = mentorIds[d1.mentorid].lastname;
                    }
                    if (d2.mentorid == "0") {
                        n2 = "\u2014";
                    } else {
                        n2 = mentorIds[d2.mentorid].lastname;
                    }
                    return n2.localeCompare(n1);
            }
        }
        const departments = this.props.departments.sort(compareDepartments.bind(this)).map(department => <DepartmentBlock key={department.dept} department={department}
            mentorIds={this.props.mentorIds} />);
        return (
            <table>
                <DepartmentHeader order={this.state.order} clickHandler={this.changeOrder.bind(this)} />
                <tbody>
                    {departments}
                </tbody>
            </table>

        );
    }
}