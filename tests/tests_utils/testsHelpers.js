// RAW PARSER HELPER
//
const expectedDataAfterParser = {
    b2b: 'TRUE',
    years: 'BELOW_35',
    biggest_complain: 'FUTURE',
    courses_downsides: '',
    email: '',
    field_complexity: '',
    has_attended_courses: 'FALSE',
    has_projects: 'FALSE',
    is_currently_working: 'FALSE',
    is_developer_already: 'TRUE',
    knows_theory: 'FALSE',
    motivation: 'FREELANCE',
    name: '',
    need_basics: '',
    need_degree: 'FALSE',
    need_mentorship: '',
    not_for_td: '',
    product: '',
    surname: '',
    test_failed: '',
    time_available: '',
    time_deadline: '',
    type_of_courses: '',
    type_of_project: '',
    what_is_searching_for: '',
};
// PLAYLIST GENERATOR HELPERS
//
const expectedPlaylistAfterGenerator = [
    'video1',
    'video13',
    'video16',
    'video23',
    'video21',
    'video25',
    'video39',
    'video3',
];

// RECURSIVE PARSER HELPERS
//
const fakeParsedDataForRecursive = {
    years: 'BELOW_35',
    need_degree: 'TRUE',
    is_developer_already: 'TRUE',
};
const fakeNestedObject = {
    years: {
        BELOW_35: {
            need_degree: {
                TRUE: {
                    is_developer_already: {
                        TRUE: 'correct_video',
                        FALSE: '',
                    },
                },
                FALSE: '',
            },
        },
        ABOVE_35: '',
    },
};

module.exports = {
    expectedDataAfterParser,
    expectedPlaylistAfterGenerator,
    fakeNestedObject,
    fakeParsedDataForRecursive,
};
