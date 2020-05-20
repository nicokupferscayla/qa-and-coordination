var jira______scayla = 'jira\.scayla\.com/browse';
var check_check_check_check______scayla;
var check_check_check_check2_____scayla;
var check_check_check_checkclose_____scayla;

var qa_time__ = 0;
var coordinate_time__ = 0;
var frontend_time__ = 0;
var backend_time__ = 0;
var frontend_title_options____ = ['', 'Create Component', 'Update Component'];
var frontend_title____;
var qa_title_____ = 'QA - testing';
var qa_title_____2 = 'QA - testing';
var backend_title_____ = 'Implement Endpoint';
var backend_title_____2 = 'Implement Endpoint';
var coordinate_title____ = 'BE - FE Coordination';
var coordinate_title____2 = 'BE - FE Coordination';

if (window.location.href.match(jira______scayla)) {
    if (!isDialogOpen_____scayla()) {
        addButton_____scayla();
    } else {
        check_check_check_check2_____scayla = setInterval(() => {
            if (!isDialogOpen_____scayla()) {
                addButton_____scayla();
                clearInterval(check_check_check_check2_____scayla);
            }
        }, 500);
    }
}

function addButton_____scayla() {
    var elem = document.createElement('button');
    elem.onclick = runCode______scayla;
    elem.innerHTML = 'Create Tasks';
    elem.style.cssText =
        'z-index:10000000;position: fixed; top: 3px; right: 565px;' +
        'background-color:#2684ff; display: inline-block; padding: 8px;color: #eee;border: 0;' +
        'font-weight: bold;font-size: 13px;border-radius: 4px';
    document.body.appendChild(elem);
}

function isDialogOpen_____scayla() {
    return document.querySelectorAll("#create-subtask-dialog").length
        && document.querySelectorAll("#project-single-select > .icon").length
}

/**
 * Runs the function that sets the template bug
 */
function runCode______scayla() {
    if (!isDialogOpen_____scayla()) {

//        if (!document.getElementById('stqc_show')) {
//            alert("There must be at least one subtask in the story");
//            return;
//        }
        qa_time__ = prompt('How many hours for QA?\nex: (2w 3d 4h) or empty');
        if (qa_time__) {
            qa_title_____ = prompt('Name of QA task? \nleave empty for "' + qa_title_____2 + '".') || qa_title_____2
        }
        coordinate_time__ = prompt('How many hours for Coordination? \nex: (2w 3d 4h) or empty');
        if (coordinate_time__) {
            coordinate_title____ = prompt('Name of Coordination task? \nleave empty for "' + coordinate_title____2 + '".') || coordinate_title____2
        }
        backend_time__ = prompt('How many hours for the Backend Task? \nex: (2w 3d 4h) or empty');
        if (backend_time__) {
            backend_title_____ = prompt('Name of Backend task? \nleave empty for "' + backend_title_____2 + '".') || backend_title_____2
        }
        frontend_time__ = prompt('How many hours for the Frontend? \nex: (2w 3d 4h) or empty');
        if (frontend_time__) {
            var my_fe_title___ = prompt('Name of Frontend Task? \n(1) Create Component, (2) Update Component or enter text.');
            if (isNaN(my_fe_title___)) {
                frontend_title____ = my_fe_title___
            } else {
                frontend_title____ = frontend_title_options____[+my_fe_title___] || frontend_title_options____[1];
            }
        }

        setIssue______scayla(coordinate_title____, coordinate_time__, 'task', true).then((value) => {
            setIssue______scayla(frontend_title____, frontend_time__, 'frontend', true).then((value) => {
                setIssue______scayla(backend_title_____, backend_time__, 'backend', true).then((value) => {
                    setIssue______scayla(qa_title_____, qa_time__, 'task', false).then((value) => {
                        setTimeout(() => {
                            alert('Gerne gerne, immer!');
                        }, 500);
                    })
                })
            });
        });
    } else {
        alert("Please close modal first");
        // setTypeBug______scayla();
    }

}

function setIssue______scayla(title, time, issueType, thereAreMore) {
    return new Promise((complete, rejected) => {
        if (!isNaN(+time)) {
            complete();
        } else {
            console.log('dialog open?', isDialogOpen_____scayla())
            if (!isDialogOpen_____scayla()) {
                console.log('open from menu')
                document.getElementById('opsbar-operations_more').click();
                setTimeout(() => {
                    document.getElementById('create-subtask').click();
                }, 100);
            }
            check_check_check_check______scayla = setInterval(() => {
                if (isDialogOpen_____scayla()) {
                    clearInterval(check_check_check_check______scayla);

                    // var content_____scayla = document.querySelectorAll('#create-subtask-dialog > .jira-dialog-content')[0];
                    // content_____scayla && (content_____scayla.style.opacity = 0.1);

                    (new Promise((complete3) => {
                        document.querySelectorAll("#issuetype-single-select > .icon")[0].click();
                        setTimeout(() => {
                            jQuery('#issuetype-suggestions li').removeClass('active');
                            var issue;
                            if (issueType === 'task') {
                                issue = jQuery('#issuetype-suggestions li.aui-list-item-li-sub-task');
                            } else if (issueType === 'frontend') {
                                issue = jQuery('#issuetype-suggestions li.aui-list-item-li-frontend-task');
                            } else if (issueType === 'backend') {
                                issue = jQuery('#issuetype-suggestions li.aui-list-item-li-backend-task');
                            }
                            if (issue.length) {
                                issue.addClass("active");
                                setTimeout(() => {
                                    issue.trigger('click');
                                }, 100);
                            } else {
                                document.querySelectorAll("#issuetype-single-select > .icon")[0].click();
                            }
                            setTimeout(() => {
                                check_check_check_check______scayla = setInterval(() => {
                                    if (!loading()) {
                                        clearInterval(check_check_check_check______scayla);
                                        // console.log('before', checkbox_____createanother, checkbox_____createanother.prop('checked'), thereAreMore);
                                        if (jQuery('#qf-create-another').prop('checked') !== thereAreMore) {
                                            console.log('DIFFERENT - clicked on it');
                                            jQuery('#qf-create-another').trigger('click', {isTrusted: true});
                                        }
                                        // console.log('after', checkbox_____createanother, checkbox_____createanother.prop('checked'), thereAreMore);
                                        // and complete
                                        setTimeout(() => {
                                            complete3();
                                        }, 100);
                                    }
                                }, 30);
                            }, 200);
                        }, 100);
                    })).then(() => {
                        jQuery('.aui-nav > li[data-mode="source"] > a')[0].click();
                        // if (document.getElementById("description").value === "") {
                        document.getElementById("description").value =
                            `h2. ${title}

(note: original estimate was ${time}.)`;
                        // }
                        // if (document.getElementById("summary").value === "") {
                        document.getElementById("summary").value = title;
                        // }

                        document.getElementById('timetracking_originalestimate').value = time;
                        // setTimeout(() => {
                        //     var wysiwyg = jQuery('.aui-nav > li[data-mode="wysiwyg"] > a');
                        //     wysiwyg && wysiwyg[0].click();
                        // }, 600);

                        console.log('is it checked?', jQuery('#qf-create-another').prop('checked'), thereAreMore);
                        document.getElementById('create-issue-submit').click();
                        setTimeout(() => {
                            check_check_check_checkclose_____scayla = setInterval(() => {
                                if (
                                    (thereAreMore && !loading()) ||
                                    (!thereAreMore && !isDialogOpen_____scayla())
                                ) {
                                    clearInterval(check_check_check_checkclose_____scayla);
                                    setTimeout(() => {
                                        complete();
                                    }, 200);
                                }
                            }, 50)
                        }, 100);
                    })
                }

            })
        }

    })
}

function loading() {
    return jQuery('aui-spinner').length;
}
