const StudentData = require('../Model/StudentData');
var XLSX       = require('xlsx');


const PostStudentData = ((req,res,next)=>{
    var workbook =  XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x=0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        console.log('XLDATA',xlData)
        StudentData.insertMany(xlData,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log("hello "+data);
            }
        })
        x++;
    });
    res.redirect('/');

});

const getStudentData = ((req,res,next)=>{

    StudentData.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data!=''){
                res.send(data);
            }else{
                res.send({});
            }
        }
    });
});




module.exports = {getStudentData,PostStudentData};