import fs from 'fs'
import { addCourseOffering, register, allotCourse, cancelRegistration } from './courseService.js'
import db from './db.js'

const filename = process.argv[2]

fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err
    var inputLines = data.toString().split("\n")
    // Add your code here to process input commands
    for (var i = 0; i < inputLines.length; i++) {
        let line = inputLines[i]
        if (line.length > 0) {
            const input = line.split(" ")
            const command = input[0]
            const params = input.slice(1)
            switch (command) {
                case "ADD-COURSE-OFFERING":
                    addCourseOffering(params, db);
                    break;
                case "REGISTER":
                    db.read();
                    register(params, db);
                    break;
                case "ALLOT-COURSE":
                    db.read();
                    allotCourse(params, db);
                    break;
                case "CANCEL":
                    db.read();
                    cancelRegistration(params, db);
                    break;
                default:
                    break;
            }
        }
    }
})
