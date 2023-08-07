import { replaceAndTitleCase, generateCourseId, removeControlCharacters, toKebabCase, extractNameFromEmail } from './utilities.js'
import { addCourseOffering, register, allotCourse, cancelRegistration } from './courseService.js';

import assert from 'assert';
import { expect } from 'chai';

import { JSONFile } from 'lowdb/node'
import { Low } from 'lowdb'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// db.json file path
const filePath = path.join(__dirname, 'mock_db.json');

const adapter = new JSONFile(filePath)
const db = new Low(adapter, { courses: [] });

describe('replaceAndTitleCase', () => {
    it('should replace all underscores and dashes with spaces and title case the string', () => {
        const input = 'hello_world';
        const expected = 'Hello World';
        const actual = replaceAndTitleCase(input);

        assert.equal(actual, expected);
    });
});

describe('generateCourseId', () => {
    it('should generate a course id', () => {
        const input = ['hello', 'world'];
        const expected = 'OFFERING-HELLO-WORLD';
        const actual = generateCourseId(...input);

        assert.equal(actual, expected);
    });
});

describe('removeControlCharacters', () => {
    it('should remove control characters from a string', () => {
        const input = 'hello\nworld';
        const expected = 'helloworld';
        const actual = removeControlCharacters(input);

        assert.equal(actual, expected);
    });
});

describe('toKebabCase', () => {
    it('should convert a string to kebab case', () => {
        const input = 'hello world';
        const expected = 'hello-world';
        const actual = toKebabCase(input);

        assert.equal(actual, expected);
    });
});

describe('extractNameFromEmail', () => {
    it('should extract name from email', () => {
        const input = 'john-star@gmail.com';
        const expected = 'John Star';
        const actual = extractNameFromEmail(input);

        assert.equal(actual, expected);
    });
});

describe('addCourseOffering', () => {
    it('should add a course offering', async () => {
        const input = ['data-science', 'dr-jacob-shwoltz', '29072023', 2, 4];
        const result = {
            "id": "OFFERING-DATA-SCIENCE-DR-JACOB-SHWOLTZ",
            "name": "Data Science",
            "instructor": "Dr Jacob Shwoltz",
            "date": "29072023",
            "minEmployees": 2,
            "maxEmployees": 4,
            "registrations": []
        }

        addCourseOffering(input, db);

        await db.write();
        await db.read();

        expect(db.data.courses).to.deep.include.members([result]);
    });
});

describe('register', () => {
    it('should register an employee', async () => {
        const input = ['james-holt@gmail.com', 'OFFERING-DATA-SCIENCE-DR-JACOB-SHWOLTZ'];
        const result = {
            "id": "REG-COURSE-JAMES-HOLT-DATA-SCIENCE",
            "employeeName": "James Holt",
            "employeeEmail": "james-holt@gmail.com",
            "courseId": "OFFERING-DATA-SCIENCE-DR-JACOB-SHWOLTZ",
            "status": "ACCEPTED",
            "alloted": false
          }

        register(input, db);

        await db.write();
        await db.read();

        expect(db.data.courses[0].registrations).to.deep.include.members([result]);
    });
});

describe('allotCourse', () => {
    it('should allot a course', async () => {
        const input = ['OFFERING-DATA-SCIENCE-DR-JACOB-SHWOLTZ'];
        const result = {
            "id": "REG-COURSE-JAMES-HOLT-DATA-SCIENCE",
            "employeeName": "James Holt",
            "employeeEmail": "james-holt@gmail.com",
            "courseId": "OFFERING-DATA-SCIENCE-DR-JACOB-SHWOLTZ",
            "status": "ACCEPTED",
            "alloted": true
          }

        allotCourse(input, db);

        await db.write();
        await db.read();

        expect(db.data.courses[0].registrations).to.deep.include.members([result]);
    });
});

describe('cancelRegistration', () => {
    it('should cancel a registration', async () => {
        const input = ['REG-COURSE-JAMES-HOLT-DATA-SCIENCE'];
        const result = {
            "id": "REG-COURSE-JAMES-HOLT-DATA-SCIENCE",
            "employeeName": "James Holt",
            "employeeEmail": "james-holt@gmail.com",
            "courseId": "OFFERING-DATA-SCIENCE-DR-JACOB-SHWOLTZ",
            "status": "CANCEL_REJECTED",
            "alloted": true
          }
        cancelRegistration(input, db);

        await db.write();
        await db.read();

        expect(db.data.courses[0].registrations).to.deep.include.members([result]);
    });
});