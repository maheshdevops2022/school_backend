const fs = require("fs");
const csv = require("csv-parser");

const bcrypt = require("bcrypt");

const pool = require("../Configs/dbConfig");
const { userInfo } = require("os");

const uploadTeachers = async (req, res) => {
  const teachers = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      teachers.push(row);
    })
    .on("end", async () => {
      try {
        for (const teacher of teachers) {
          const hashedPassword = await bcrypt.hash(teacher.password, 10);

          //insert into user table

          const [userResult] = await pool.query(
            `insert into user

                    (email,password,role)
                    values (?,?,?)
                    `,
            [teacher.email, hashedPassword, "teacher"]
          );

          //teacher table insert

          await pool.query(
            `
                    insert into teachers
                    (
                    userId,
                    name,
                    surname,
                    gender,

                    mobile,
                    subject,
                    date,
                    experience,
                    salary

                    )
                    values 
                    (?,?,?,?,?,?,?,?,?)
                    `,
            [
              userResult.insertId,
              teacher.name,
              teacher.surname,
              teacher.gender,
              teacher.mobile,
              teacher.subject,
              teacher.date,
              teacher.experience,
              teacher.salary,
            ]
          );
        }

        res.status(200).json({
          status: "success",
          message: `${teachers.length} teachers uploaded successfully`,
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

module.exports = { uploadTeachers };
