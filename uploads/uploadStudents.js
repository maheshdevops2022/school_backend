const fs = require("fs");
const csv = require("csv-parser");
const bcrypt = require("bcrypt");
const pool = require("../Configs/dbConfig");

const uploadStudents = async (req, res) => {
  const students = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      students.push(row);
    })
    .on("end", async () => {
      try {
        for (const student of students) {

          const hashedPassword = await bcrypt.hash(
            student.password,
            10
          );

          // Users table insert
          const [userResult] = await pool.query(
            `
            INSERT INTO user
            (email,password,role)
            VALUES (?,?,?)
            `,
            [
              student.email,
              hashedPassword,
              "student",
            ]
          );

          // Students table insert
          await pool.query(
            `
            INSERT INTO students
            (
              userId,
              name,
              surname,
              fathersname,
              studentsClass,
              mobile,
              village,
              gender
            )
            VALUES (?,?,?,?,?,?,?,?)
            `,
            [
              userResult.insertId,
              student.name,
              student.surname,
              student.fathersname,
              student.studentsClass,
              student.mobile,
              student.village,
              student.gender,
            ]
          );
        }

        res.status(200).json({
          status: "success",
          message: `${students.length} students uploaded successfully`,
        });

      } catch (error) {
        console.log(error);

        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
    });
};

module.exports = { uploadStudents };