$(function() {
    var mentors;
    var mentorIds;
    var departments;
    var combo;
    
    function mentorBlock(mentor) {
        return $('<div style="width: 120px" class="wp-caption alignleft"><img class="   " src="' 
                 + mentor.imageUrl + '" alt="' + mentor.firstName + ' ' + mentor.lastName 
                 + '" width="110" height="110" /><p class="wp-caption-text"><strong><a href="http://www.pcc.edu/scripts/sdquery.pl?all=' 
                 + mentor.directory + '">' + mentor.firstName + ' ' + mentor.lastName 
                 + '</a></strong><br />' + mentor.dept + ', ' + mentor.campus + '</p></div>');
    }
    
    function generateMentorBlocks() {
        var meet = $("#meet_the_mentors");
        
        mentors.forEach(function(mentor) {
            meet.append(mentorBlock(mentor));
        });
    }
    
    function generateDepartmentTable() {
        var table = $('<table><thead><tr><th scope="col">Department</th><th scope="col">Mentor</th></tr>')
        
        departments.forEach(function(department) {
            var id = department.mentorid;
            
            if(id !== "0") {
                var row = $('<tr><td>' + department.dept + "</td><td>" + mentorIds[id].lastName + "</td></tr>");
                table.append(row);
            } else {
                var row = $('<tr><td>' + department.dept + "</td><td>-</td></tr>");
                table.append(row);
            }
        });
        $("#department_table").append(table);
    }
    
    function selectItem(item) {
        var mentorList = [];
        var yourMentor = $("#your_mentor");
        
        departments.forEach(function(department) {
            if(department.dept.toLowerCase().indexOf(item.toLowerCase()) > -1) {
                if(department.mentorid !== "0" && mentorList.indexOf(department.mentorid) == -1) {
                    mentorList.push(department.mentorid);
                }
            }
        });
        if(mentorList.length === 0) {
            yourMentor.html("<h3>No Mentor Assigned!<h3><p>I'm sorry, there is currently no mentor assigned to that department. Please contact <a href='mailto:gkaminsk@pcc.edu'>Greg Kaminski</a> for more information about the Distance Learning Faculty Mentor program at PCC.</p>");
        } else if(mentorList.length == 1) {
            yourMentor.html("<h3>Your Mentor</h3>").append(mentorBlock(mentorIds[mentorList[0]]));
        } else {
            yourMentor.html("<h3>Your Mentors</h3>");
            mentorList.forEach(function(mentorId) {
               yourMentor.append(mentorBlock(mentorIds[mentorId])); 
            });
        }
        yourMentor.append("<br style='clear:left;'>");
    }
    
    function fetchDepartments() {
        $.getJSON("http://localhost/CIS233W/lab9/reactMentors/departments.php", function(data) {
            departments = data;
            generateDepartmentTable();
            combo.setItems(departments.map(function(deparment) {
                return deparment.dept;
            }));
        });
    }
    
    function fetchMentors() {
        $.getJSON("http://localhost/CIS233W/lab9/reactMentors/mentors.php", function(data) {
            mentors = data;
            mentorIds = new Object();
            generateMentorBlocks();
            mentors.forEach(function(mentor) {
               mentorIds[mentor.id] = mentor; 
            });
            fetchDepartments();
        });
    }
    
    combo = new Combo ($("#department_combo"), $("mentor_search"), selectItem);
    fetchMentors();
});