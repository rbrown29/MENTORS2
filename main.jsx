import React from 'react';
import ReactDOM from 'react-dom';
import MentorList from './MentorList.jsx';
import DepartmentList from './DepartmentList.jsx';

$(
    function () {
        var mentors;
        var mentorIds;
        var departments;
        var combo;

        function selectItem(item) {
            var mentorList = [];
            var yourMentor = $("#your_mentor");

            departments.forEach(function (department) {
                if (department.dept.toLowerCase().indexOf(item.toLowerCase()) > -1) {
                    if (department.mentorid !== "0" && mentorList.indexOf(department.mentorid) == -1) {
                        mentorList.push(department.mentorid);
                    }
                }
            });
            if (mentorList.length === 0) {
                ReactDOM.render(
                    <div>
                        <h3>No Mentor Assigned!</h3>
                        <p>I&apos;'m sorry, there is currently no mentor assigned to that department</p>
                        <br style={{ clear: "left" }} />
                    </div>,
                    document.getElementById('your_mentor'));
            } else {
                ReactDOM.render(
                    <div>
                        <h3>{mentorList.length == 1 ? "Your Mentor" : "Your Mentors"}</h3>
                        <MentorList mentors={mentorList.map(id => mentorIds[id])} />
                        <br style={{ clear: "left" }} />
                    </div>,
                    document.getElementById('your_mentor')
                );

            }
        }

        combo = new Combo($("#department_combo"), $("mentor_search"), selectItem);

        function rerender() {
            console.log(mentors);
            if (mentors) {
                ReactDOM.render(
                    <MentorList mentors={mentors} />,
                    document.getElementById('meet_the_mentors')
                );
            }
            if (mentorIds && departments) {
                ReactDOM.render(
                    <DepartmentList departments={departments} mentorIds={mentorIds} />,
                    document.getElementById('department_table')
                );
            }
        }
        $.getJSON('http://localhost/CIS233W/lab9/reactMentors/depatments.php', (data) => {
            departments = data;
            combo.setItems(departments.map(department => department.dept));
            rerender();
        });
        $.getJSON('http://localhost/CIS233W/lab9/reactMentors/mentors.php', (data) => {
            mentors = data;
            mentorIds = {};
            mentors.forEach((mentor) => { mentorIds[mentor.id = mentor] });
            rerender();
        });
    }
);
