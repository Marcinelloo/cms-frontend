import {USER_ROLES} from "../../constants/user";

export const NAVIGATION = (translations) => [
    {
        name: translations?.dashboard,
        link: "/dashboard",
        role: [USER_ROLES.STUDENT, USER_ROLES.LECTURER, USER_ROLES.ADMIN],
        icon: "fa-solid fa-home",
    },
    {
        name: "Advert",
        link: "/advert",
        role: [USER_ROLES.ADVERTISER],
        icon: "fa fa-ad",
    },
    {
        name: "News",
        link: "/news",
        role: [],
        icon: "fa-regular fa-newspaper",
    },
    {
        name: translations?.classes,
        link: "/classes",
        role: [USER_ROLES.LECTURER, USER_ROLES.STUDENT],
        icon: "fa-solid fa-book",
    },
    {
        name: "Assignments",
        link: "/assignments",
        role: [USER_ROLES.LECTURER, USER_ROLES.STUDENT],

        icon: "fa-solid fa-tasks",
    },
    {
        name: "Attendance",
        link: "/attendance",
        role: [USER_ROLES.LECTURER, USER_ROLES.STUDENT],

        icon: "fa-regular fa-calendar-check",
    },
    {
        name: "Time Table",
        link: "/time-table",
        role: [USER_ROLES.LECTURER, USER_ROLES.STUDENT],

        icon: "fa-regular fa-clock",
    },
    {
        name: translations?.users,
        link: "/users",
        role: [USER_ROLES.ADMIN],
        icon: "fa-solid fa-users",
    },
    {
        name: "Petitions",
        link: "/petitions",
        role: [USER_ROLES.STUDENT],
        icon: "fa-solid fa-ticket",
    },
    {
        name: translations?.majors,
        link: "/majors",
        role: [USER_ROLES.ADMIN],
        icon: "fa-solid fa-building-columns",
    },
    {
        name: translations?.classes,
        link: "/class-admin",
        role: [USER_ROLES.ADMIN],
        icon: "fa-solid fa-book",
    },
    {
        name: "Classrooms",
        link: "/classrooms",
        role: [USER_ROLES.ADMIN],
        icon: "fa-solid fa-person-shelter",
    },
    {
        name: translations?.groups,
        link: "/groups",
        role: [USER_ROLES.ADMIN],
        icon: "fa-solid fa-people-group",
    },
    {
        name: translations?.settings,
        link: "/settings",
        role: [USER_ROLES.ADMIN, USER_ROLES.LECTURER, USER_ROLES.STUDENT, USER_ROLES.ADVERTISER],
        icon: "fa-solid fa-gears",
    },
];

