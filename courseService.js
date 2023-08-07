import { replaceAndTitleCase, generateCourseId, removeControlCharacters, extractNameFromEmail, toKebabCase } from "./utilities.js";
const todaysDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '');

export const addCourseOffering = (params, db) => {
    if (params.length < 5) return console.log('INPUT_DATA_ERROR');
    const name = replaceAndTitleCase(params[0]);
    const instructor = replaceAndTitleCase(params[1]);
    const date = params[2];
    const minEmployees = parseInt(params[3], 10);
    const maxEmployees = parseInt(params[4], 10);
    const newCourseId = generateCourseId(params[0], params[1]);
    const courseExists = db.data.courses.find(course => course.id == newCourseId);
    if (!courseExists) {
        const courseOffering = {
            id: newCourseId,
            name,
            instructor,
            date,
            minEmployees,
            maxEmployees,
            registrations: [],
        }

        db.data.courses.push(courseOffering);
        db.write();
        console.log(courseOffering.id);
    }
}

export const register = (params, db) => {
    if (params.length < 2) return console.log('INPUT_DATA_ERROR');
    const employeeEmail = params[0];
    let courseId = removeControlCharacters(params[1]);

    let employeeName = extractNameFromEmail(employeeEmail);
    db.read();
    let course = db.data.courses.find(course => course.id === courseId.toUpperCase());
    if (course) {
        const registrationId = `REG-COURSE-${toKebabCase(employeeName)}-${toKebabCase(course.name)}`.toUpperCase();

        let registrationIdExists = course.registrations.find(registration => registration.id === registrationId);
        if (registrationIdExists) {
            return;
        }

        const registration = {
            id: registrationId,
            employeeName,
            employeeEmail,
            courseId,
            status: 'ACCEPTED',
            alloted: false,
        }
        if (course.date >= todaysDate) {
            if (course.registrations.length < course.maxEmployees) {
                let courseIndex = db.data.courses.findIndex(course => course.id === courseId.toUpperCase());
                db.data.courses[courseIndex].registrations.push(registration);
                db.write();
                console.log(`${registrationId} ${registration.status}`);
            }

            if (course.registrations.length == course.maxEmployees) {
                console.log('COURSE_FULL_ERROR');
            }
        }
        if (course.date < todaysDate) {
            console.log('COURSE_CANCELED');
        }
    }
}

export const allotCourse = (params, db) => {
    const courseId = removeControlCharacters(params[0]);
    const course = db.data.courses.find(course => {
        return course.id == courseId.toUpperCase()
    });
    if (course) {
        course.registrations = course.registrations.map(registration => {
            registration.alloted = true;
            return registration;
        });

        let data = course.registrations.sort((a, b) => a.id.localeCompare(b.id));
        data = data.map(registration => {
            return {
                registrationId: registration.id,
                emailId: registration.employeeEmail,
                courseId: registration.courseId,
                courseName: course.name,
                instructor: course.instructor,
                date: course.date,
                status: registration.status,
            }
        });

        console.table(data);
    }
}

export const cancelRegistration = (params, db) => {
    const registrationId = removeControlCharacters(params[0]);
    db.data.courses.map((course, courseIndex) => {
        let registrationIndex = -1;
        if (course.registrations) {
            registrationIndex = course.registrations.findIndex(registration => registration.id === registrationId);
        }

        if (registrationIndex > -1) {
            if (course.registrations[registrationIndex].alloted) {
                db.data.courses[courseIndex].registrations[registrationIndex].status = 'CANCEL_REJECTED';
                db.write();
                console.log('CANCEL_REJECTED');
            } else {
                db.data.courses[courseIndex].registrations[registrationIndex].status = 'CANCEL_ACCEPTED';
                db.write();
                console.log('CANCEL_ACCEPTED');
            }
        }
    });
}