const results = {
    "b2b": {
        "TRUE": "video1",
        "FALSE": "video2"
    },
    "biggest_complain": {
        "FUTURE": "",
        "WHICH_LEARNING_PATH": "",
        "TOO_OLD": "",
        "WORK_QUICKLY": "",
        "NOT_SURE_ABOUT_BOOTCAMPS": "",
        "WHICH_COURSE": "",
        "NO_PRACTICE": "",
        "TOO_MUCH_MONEY": "",
    },
    "has_attended_courses": {
        "TRUE": "",
        "FALSE": "",
    },
    "is_developer_already": {
        "TRUE": "",
        "FALSE": "",
    },
    "is_currently_working": {
        "TRUE": "",
        "FALSE": "",
    },
    "type_of_courses": {
        "VIDEO": "",
        "OTHER": "",
        "BOOTCAMP": "",
    },
    "knows_theory": {
        "TRUE": "",
        "FALSE": "",
    },
    "has_projects": {
        "TRUE": "",
        "FALSE": "",
    },
    "type_of_project": {
        "SMALL_ALGORITHMS": "",
        "WEBSITE": "",
        "WEB_APPLICATION": "",
        "BOT": "",
        "OTHER": "",
    },
    "need_basics": {
        "TRUE": "",
        "FALSE": "",
    },
    "field_complexity": {
        "HARD": "",
        "MEDIUM": "",
    },
    "need_mentorship": {
        "TRUE": "",
        "FALSE": "",  
    },
    "motivation": {
        "JOB":"",
        "FREELANCE":"",
        "PERSONAL_PROJECT":"",
        "LEARNING":"",
    },
    "what_is_searching_for": {
        "DIRECT_LESSONS":"",
        "VIDEO_COURSES":"",
        "DAILY_LESSONS":"",
        "MENTORSHIP":"",
        "TRY_PROGRAMMING":"",
        "JOB_GUARANTEE":"",
        "CERTIFICATION":"",
        "LEARN_LANGUAGE":"",
    },
    "time_available": {
        "TOO_LOW":"",
        "NOT_ENOUGH":"",
        "TOO_MUCH":"",
        "OK":"",
    },
    "time_deadline": {
        "1_3_MONTHS":"",
        "3_6_MONTHS":"",
        "MORE_6_MONTHS":"",
    },
    "need_degree" : {
        "TRUE": "",
        "FALSE": "", 
    }
}

const sequence = [  "b2b", 
                    "is_developer_already", 
                    "is_currently_working", 
                    "has_attended_courses", 
                    "type_of_courses", 
                    "knows_theory", 
                    "has_projects", 
                    "type_of_project",
                    "need_basics", 
                    "field_complexity", 
                    "need_mentorship", 
                    "motivation", 
                    "need_degree", 
                    "biggest_complain", 
                    "what_is_searching_for", 
                    "time_available", 
                    "time_deadline"
                ]

module.exports = {results, sequence}
