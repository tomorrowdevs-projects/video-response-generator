const results = {
    b2b: {
        TRUE: 'video1',
        FALSE: 'video2',
    },
    biggest_complain: {
        FUTURE: 'video3',
        WHICH_LEARNING_PATH: 'video4',
        TOO_OLD: 'video5',
        WORK_QUICKLY: 'video6',
        NOT_SURE_ABOUT_BOOTCAMPS: 'video7',
        WHICH_COURSE: 'video8',
        NO_PRACTICE: 'video9',
        TOO_MUCH_MONEY: 'video10',
    },
    has_attended_courses: {
        TRUE: 'video11',
        FALSE: 'video12',
    },
    is_developer_already: {
        TRUE: 'video13',
        FALSE: 'video14',
    },
    is_currently_working: {
        TRUE: 'video15',
        FALSE: 'video16',
    },
    type_of_courses: {
        VIDEO: 'video17',
        OTHER: 'video18',
        BOOTCAMP: 'video19',
    },
    knows_theory: {
        TRUE: 'video20',
        FALSE: 'video21',
    },
    has_attended_courses: {
        TRUE: 'video22',
        FALSE: 'video23',
    },
    has_projects: {
        TRUE: 'video24',
        FALSE: 'video25',
    },
    type_of_project: {
        SMALL_ALGORITHMS: 'video26',
        WEBSITE: 'video27',
        WEB_APPLICATION: 'video28',
        BOT: 'video29',
        OTHER: 'video30',
    },
    need_basics: {
        TRUE: 'video31',
        FALSE: 'video32',
    },
    field_complexity: {
        HARD: 'video33',
        MEDIUM: 'video34',
    },
    need_mentorship: {
        TRUE: 'video35',
        FALSE: 'video36',
    },
    motivation: {
        JOB: {
            years: {
                BELOW_35: 'video37',
                ABOVE_35: 'video38',
            },
        },
        FREELANCE: {
            years: {
                BELOW_35: 'video39',
                ABOVE_35: 'video40',
            },
        },
        PERSONAL_PROJECT: {
            years: {
                BELOW_35: 'video41',
                ABOVE_35: 'video42',
            },
        },
        LEARNING: {
            years: {
                BELOW_35: 'video43',
                ABOVE_35: 'video44',
            },
        },
    },
    what_is_searching_for: {
        DIRECT_LESSONS: '',
        VIDEO_COURSES: '',
        DAILY_LESSONS: '',
        MENTORSHIP: '',
        TRY_PROGRAMMING: '',
        JOB_GUARANTEE: '',
        CERTIFICATION: '',
        LEARN_LANGUAGE: '',
    },
    time_available: {
        TOO_LOW: '',
        NOT_ENOUGH: '',
        TOO_MUCH: '',
        OK: '',
    },
    time_deadline: {
        '1_3_MONTHS': '',
        '3_6_MONTHS': '',
        MORE_6_MONTHS: '',
    },
    need_degree: {
        TRUE: '',
        FALSE: '',
    },
    product: {
        MENTORSHIP: '',
        ZERO_KNOWLEDGE: '',
        MEMBERSHIP: '',
        LEARNING_PATH: '',
    },
    courses_downsides: {
        NO_SUPPORT: '',
        TOO_FAST: '',
        INSUFFICENT_EXPLANATIONS: '',
        NOT_FOR_ME: '',
    },
};

const sequence = [
    'b2b',
    'years',
    'is_developer_already',
    'is_currently_working',
    'has_attended_courses',
    'type_of_courses',
    'knows_theory',
    'has_projects',
    'type_of_project',
    'need_basics',
    'field_complexity',
    'need_mentorship',
    'motivation',
    'need_degree',
    'biggest_complain',
    'what_is_searching_for',
    'time_available',
    'time_deadline',
];

module.exports = { results, sequence };
