/*
 * @Date: 2021-07-22 10:48:37
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-17 16:20:27
 * @FilePath: /DayCode/demos/handleExcel/handle.js
 */

/**
 * node-xlsx解析excel数据
 */

// 所需要的node包
const fs = require("fs");
const { isEmpty } = require("lodash");
const xlsx = require("node-xlsx");
const util = require("util");

let fnCommon = {
    /**
     * 解析excel数据并返回
     * @param {excel地址} path 
     * @param {列名} rowName 
     * @param {需要获取哪个sheet页数据，不传默认返回第一个} sheetName 
     */
    readXlsx: async function(p) {
        let path=p.path, sheetName=p.sheetName, format=p.format;
        let excel_path = __dirname+path;
        let data = await xlsx.parse(fs.readFileSync(excel_path));
        // console.log("data",JSON.stringify(data))
        let sheet_datas = data.reduce(function(current, x,index) {
            x.data = x.data ? x.data : [];
            let currentRowName = [...new Array(x.data[0].length).keys()];
            let arr = x.data.reduce(function(c,v,k) {
                if(!v.length || !k) return c;
                let obj = {};
                currentRowName.forEach(function(y, i) {
                    obj[y] = v[i]||'';
                });
                c.push(obj)
                return c;
            }, []);
            current[x.name] = arr;
            return current;
        }, {});
        // sheet_datas = format ? util.inspect(sheet_datas, false, 6) : JSON.stringify(sheet_datas);
        // console.log("sheet_datas",sheet_datas)
        // return JSON.stringify(eval("("+sheet_datas+")"));
        return JSON.stringify(sheet_datas);
    },
    /**
     * 写数据到指定文件中
     * @param {*} path 
     * @param {*} sheets_data 
     */
    writeFile: async function(file_path, sheets_data) {
        let datajson = {};
        try{
            await fs.writeFile(file_path, sheets_data, function(err, result) {
                datajson = result;
            })
        }catch(e) {
            console.log("错误:",e);
        }
        return datajson;
    }
}

/**
 * 解析excel数据到指定data.text文件中
 */
/* var handleXlsx = async function() {
    let excel_data = await fnCommon.readXlsx({
        path: '/人员名单.xlsx',
        rowName: ['people_name','people_no','ou','position'],
        format:true,
    });
    await fnCommon.writeFile("data.text", excel_data);
    console.log("解析成功！")
}
handleXlsx() */


var handleXlsx1 = async function() {
    let excel_data = await fnCommon.readXlsx({
        path: '/索通字段.xlsx',
        rowName: ['jobgrade_code','jobgrade_name','type','type_name'],
        format:true,
    });
    await fnCommon.writeFile("data.text", excel_data);
    excel_data = JSON.parse(excel_data);
    excel_data.shift();
    console.log("excel_data",excel_data)
    let obj = excel_data.reduce(function(c,n,s) {
        n.jobgrade_code ? c['JobCode'].push({
            code: n.jobgrade_code,
            name: n.jobgrade_name,
        }) : "";
        n.type ? c["EmployeeCategoryCode"].push({
            code: n.type,
            name: n.type_name,
        }) : "";
        return c;
    }, {"EmployeeCategoryCode":[], "JobCode":[]});
    console.log("解析成功！",JSON.stringify(obj));
}
// handleXlsx1()


var handleXlsx2 = async function() {
    let excel_data = await fnCommon.readXlsx({
        path: '/十院自定义字段.xlsx',
        format:true,
    });
    await fnCommon.writeFile("data.text", excel_data);
    excel_data = JSON.parse(JSON.stringify(excel_data));
    console.log("excel_data",excel_data)
    // let obj = excel_data.reduce(function(c,n,s) {
    //     n.jobgrade_code ? c['JobCode'].push({
    //         code: n.jobgrade_code,
    //         name: n.jobgrade_name,
    //     }) : "";
    //     n.type ? c["EmployeeCategoryCode"].push({
    //         code: n.type,
    //         name: n.type_name,
    //     }) : "";
    //     return c;
    // }, {"EmployeeCategoryCode":[], "JobCode":[]});
    // console.log("解析成功！",JSON.stringify(obj));
}
handleXlsx2()

