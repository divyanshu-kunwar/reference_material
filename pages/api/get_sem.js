let noOfSem = 6;
let sem = ["1st Semester", "2nd Semester",
"3rd Semester",
"4th Semester",
"5th Semester",
"6th Semester",
"7th Semester",
"8th Semester",
"9th Semester",
"10th Semester",
"11th Semester",
"12th Semester"]
export default function sendSem(req, res) {
    let options = [];
    for (let i = 1; i <= noOfSem; i++) {
        options.push(sem[i-1]);
    }
    
        res.status(200).json(
        {
            options: options,
              selected: 0,
              title: "Select Semester",
        }
    )

}