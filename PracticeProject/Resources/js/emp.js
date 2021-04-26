const api_url = "https://localhost:44324/api/employee";

async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);

    $("#empList").tablesorter();

    $(function () {
        getpagination(5);
    });
    //Pagination Script will run when the table data is loaded
    var table = '#empList';
    $('#maxRows').on('change', function () {
        var maxrow = parseInt($(this).val());
        if (parseInt($(this).val()) == 5000) {
            maxrow = 10;
        }
        getpagination(maxrow);
    });

    function activePage() {
        var $el = $('[data-page].active');

        if ($el.length) {
            return $el.data('page');
        }

        return 0; // just needs to not exist so finder fails
    }

    $(function () {
        $('.prev-btn, .next-btn').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation(); // prevent the parent event from firing

            var page = activePage() + ($(event.target).hasClass('prev-btn') ? -1 : 1);

            $('[data-page="' + page + '"]').trigger('click');
        });
    })

    function getpagination(maxows) {
        $('table tr:eq(0)').prepend('<th>S.No</th>');
        var id = 0;
        $('table tr:gt(0)').each(function () {
            id++;
            $(this).prepend('<td> ' + id + '</td>');
        })
        $('.pagination').html('')
        var trnum = 0;
        var maxrows = maxows;
        var totalrows = $(table)[0].rows.length;
        $(table + ' tr:gt(0)').each(function () {
            trnum++;
            if (trnum > maxrows) {
                $(this).hide()
            }
            if (trnum <= maxrows) {
                $(this).show();
            }
        });
        //if(totalrows > maxrows){
        var pagenum = Math.ceil(totalrows / maxrows);
        $('.pagination').append('<li class="page-item"><a class="page-link prev-btn" href="#">Previous</a></li>').show();
        for (var i = 1; i <= pagenum; i++) {
            $('.pagination').append('<li class="page-item" data-page="' + i + '"><a class="page-link" href="#">' + i + '</a></li>').show();
        }
        $('.pagination').append('<li class="page-item"><a class="page-link next-btn" href="#">Next</a></li>').show();
        //}
        $('.pagination li:first-child').addClass('active');
        $('.pagination li').on('click', function () {
            var pagenum = $(this).attr('data-page');
            var trIndex = 0;
            $('.pagination li').removeClass('active');
            $(this).addClass('active');
            $('table tr:gt(0)').each(function () {
                trIndex++;
                if (trIndex > (maxrows * pagenum) || trIndex <= ((maxrows * pagenum) - maxrows)) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        });
    };//end of pagination
}

getapi(api_url);

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function show(data) {
    let lastEmployeeId = 0;
    for (let r of data) { 
        lastEmployeeId = r;
        var tbodyRef = document.getElementById('empList').getElementsByTagName('tbody')[0];

        // Insert a row at the end of table
        var newRow = tbodyRef.insertRow();

        // Insert a cell at the end of the row
        var newCell1 = newRow.insertCell();
        var newCell2 = newRow.insertCell();
        var newCell3 = newRow.insertCell();
        var newCell4 = newRow.insertCell();
        var newCell5 = newRow.insertCell();
        var newCell6 = newRow.insertCell();

        // Append a text node to the cell
        var newText1 = document.createTextNode(r.employeeCode);
        var newText2 = document.createTextNode(r.name);
        var newText3 = document.createTextNode(r.email);
        var newText4 = document.createTextNode(r.designation);
        var newText5 = document.createTextNode(r.joiningDate);

        var editAnchor = document.createElement('a');
        editAnchor.href = "./UpdateEmployee.html";

        var editIcon = document.createElement('i');
        editIcon.className += "fas fa-pencil fa-sm";
        editAnchor.appendChild(editIcon);
        
        
        //<i class="fas fa-pencil fa-lg">
        editAnchor.addEventListener('click', function () {
            var empId = r.id;
            localStorage.setItem('empId', empId);

            var empCode = r.employeeCode;
            localStorage.setItem('empCode', empCode);

            var empName = r.name;
            localStorage.setItem('empName', empName);

            var empEmail = r.email;
            localStorage.setItem('empEmail', empEmail);

            var empDesignation = r.designation;
            localStorage.setItem('empDesignation', empDesignation);

            var joinDate = r.joiningDate;
            localStorage.setItem('joinDate', joinDate);

            var permAddr = r.permanentAddress;
            localStorage.setItem('permAddr', permAddr);

            var commAddr = r.communicationAddress;
            localStorage.setItem('commAddr', commAddr);
        });
        editAnchor.innerHTML += " Edit &nbsp;&nbsp;"

        var delAnchor = document.createElement('a');
        delAnchor.href = "./DeleteEmployee.html";
        delAnchor.style.color = 'red';
        var delIcon = document.createElement('i');
        delIcon.className += "fas fa-trash fa-sm";
        delAnchor.appendChild(delIcon);

        delAnchor.addEventListener('click', function () {
            var empId = r.id;
            localStorage.setItem('empId', empId);

            var empCode = r.employeeCode;
            localStorage.setItem('empCode', empCode);

            var empName = r.name;
            localStorage.setItem('empName', empName);

            var empEmail = r.email;
            localStorage.setItem('empEmail', empEmail);

            var empDesignation = r.designation;
            localStorage.setItem('empDesignation', empDesignation);

            var joinDate = r.joiningDate;
            localStorage.setItem('joinDate', joinDate);

            var permAddr = r.permanentAddress;
            localStorage.setItem('permAddr', permAddr);

            var commAddr = r.communicationAddress;
            localStorage.setItem('commAddr', commAddr);
        });
        delAnchor.innerHTML += " Delete"
        /*var delAnchor = document.createElement('a');
        var linkDel = document.createTextNode(" Delete");
        delAnchor.appendChild(linkDel);*/

        newCell1.appendChild(newText1);
        newCell2.appendChild(newText2);
        newCell3.appendChild(newText3);
        newCell4.appendChild(newText4);
        newCell5.appendChild(newText5);
        newCell6.appendChild(editAnchor);
        newCell6.appendChild(delAnchor);
    }
    localStorage.setItem('lastEmpId',lastEmployeeId.id);
}   

//Script for search
function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("empList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}