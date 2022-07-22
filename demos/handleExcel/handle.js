/*
 * @Date: 2021-07-22 10:48:37
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-07-22 18:01:07
 * @FilePath: /DayCode/demos/handleExcel/handle.js
 */

/**
 * node-xlsx解析excel数据
 */

// 所需要的node包
const fs = require("fs");
const { isEmpty, isDate } = require("lodash");
const xlsx = require("node-xlsx");
const util = require("util");
const color = require("color");
const dayjs = require("dayjs");

let fnCommon = {
  /**
   * 解析excel数据并返回
   * @param {excel地址} path
   * @param {列名} rowName
   * @param {需要获取哪个sheet页数据，不传默认返回第一个} sheetName
   */
  readXlsx: async function (p) {
    let path = p.path,
      sheetName = p.sheetName,
      format = p.format;
    let excel_path = __dirname + path;
    // cellDate将日期转换为正却日期
    // let data = await xlsx.parse(fs.readFileSync(excel_path), {
    //   cellDates: true,
    // });
    let data = await xlsx.parse(fs.readFileSync(excel_path));
    console.log("data", JSON.stringify(data));
    let sheet_datas = data.reduce(function (current, x, index) {
      x.data = x.data ? x.data : [];
      if (!x.data.length) return current;
      let currentRowName = [...new Array(x.data[0].length).keys()];
      let arr = x.data.reduce(function (c, v, k) {
        if (!v.length || !k) return c;
        let obj = {};
        currentRowName.forEach(function (y, i) {
          let d = v[i] || String(v[i]) ? String(v[i]) : "";
          obj[y] = d;
          // if (isNaN(d) && !isNaN(Date.parse(d))) {
          //   obj[y] = dayjs(d).format("YYYY-MM-DD");
          // }
        });
        c.push(obj);
        return c;
      }, []);
      current[x.name] = arr;
      return current;
    }, {});
    // sheet_datas = format ? util.inspect(sheet_datas, false, 6) : JSON.stringify(sheet_datas);
    // console.log("sheet_datas",sheet_datas)
    // return JSON.stringify(eval("("+sheet_datas+")"));
    sheetName && sheet_datas[sheetName]
      ? (sheet_datas = sheet_datas[sheetName])
      : "";
    return JSON.stringify(sheet_datas);
  },
  /**
   * 写数据到指定文件中
   * @param {*} path
   * @param {*} sheets_data
   */
  writeFile: async function (file_path, sheets_data) {
    let datajson = {};
    try {
      await fs.writeFile(file_path, sheets_data, function (err, result) {
        datajson = result;
      });
    } catch (e) {
      console.log("错误:", e);
    }
    return datajson;
  },
  toDate: (date) => {
    if (isNaN(date) && !isNaN(Date.parse(date))) {
      return date;
    } else {
      //   return moment(new Date(1900, 0, date)).subtract(1).format('YYYY-MM-DD');
    }
  },
};

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

var handleXlsx1 = async function () {
  let excel_data = await fnCommon.readXlsx({
    path: "/索通字段.xlsx",
    rowName: ["jobgrade_code", "jobgrade_name", "type", "type_name"],
    format: true,
  });
  await fnCommon.writeFile("data.text", excel_data);
  excel_data = JSON.parse(excel_data);
  excel_data.shift();
  console.log("excel_data", excel_data);
  let obj = excel_data.reduce(
    function (c, n, s) {
      n.jobgrade_code
        ? c["JobCode"].push({
            code: n.jobgrade_code,
            name: n.jobgrade_name,
          })
        : "";
      n.type
        ? c["EmployeeCategoryCode"].push({
            code: n.type,
            name: n.type_name,
          })
        : "";
      return c;
    },
    {
      EmployeeCategoryCode: [],
      JobCode: [],
    }
  );
  console.log("解析成功！", JSON.stringify(obj));
};
// handleXlsx1()

var handleXlsx2 = async function () {
  let excel_data = await fnCommon.readXlsx({
    path: "/十院自定义字段.xlsx",
  });
  await fnCommon.writeFile("data.text", excel_data);
  excel_data = JSON.parse(excel_data);
  let datas = [
    ...excel_data["聘任职称"],
    ...excel_data["职业、执业证书"],
  ].reduce((c, n) => {
    // console.log("c,n", c,n)
    n[0] ? c.push(n[0]) : "";
    return c;
  }, []);
  // console.log("datas",datas);

  // data1
  let data1 = await fnCommon.readXlsx({
    path: "/十院自定义字段1.xls",
    sheetName: "第一页",
  });
  await fnCommon.writeFile("data.text", data1);
  data1 = JSON.parse(data1);
  data1 = data1.reduce((c, n) => {
    if (datas.includes(n[3]) || datas.includes(n[4])) {
      c.push(n[0]);
    }
    return c;
  }, []);

  // data2
  let data2 = await fnCommon.readXlsx({
    path: "/十院自定义字段2.xls",
    sheetName: "第一页",
  });
  await fnCommon.writeFile("data.text", data2);
  data2 = JSON.parse(data2);
  data2 = data2.reduce((c, n) => {
    if (datas.includes(n[5])) {
      c.push(n[0]);
    }
    return c;
  }, []);

  let total = [...new Set([...data1, ...data2])];

  console.log("data1", data1, data1.length, [...new Set(data1)].length);
  console.log("data2", data2, data2.length, [...new Set(data2)].length);
  console.log("total", JSON.stringify(total), total.length);

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
};
// handleXlsx2()
var handleXlsx22 = async function () {
  let excel_data = await fnCommon.readXlsx({
    path: "/十院自定义字段.xlsx",
  });
  await fnCommon.writeFile("data.text", excel_data);
  excel_data = JSON.parse(excel_data);
  console.log("datas", excel_data);

  let datas = [
    ...excel_data["聘任职称"],
    ...excel_data["职业、执业证书"],
  ].reduce((c, n) => {
    // console.log("c,n", c,n)
    n[0] ? c.push(n[0]) : "";
    return c;
  }, []);
  console.log("datas", datas);
  return false;

  // data1
  let data1 = await fnCommon.readXlsx({
    path: "/十院自定义字段3.xls",
    sheetName: "第一页",
  });
  await fnCommon.writeFile("data.text", data1);
  data1 = JSON.parse(data1);
  data1 = data1.reduce((c, n) => {
    if (datas.includes(n[3]) || datas.includes(n[4])) {
      c.push(n[0]);
    }
    return c;
  }, []);
  console.log(
    "data1",
    data1,
    data1.length,
    [...new Set(data1)].length,
    JSON.stringify([...new Set(data1)])
  );

  return false;

  // data2
  let data2 = await fnCommon.readXlsx({
    path: "/十院自定义字段2.xls",
    sheetName: "第一页",
  });
  await fnCommon.writeFile("data.text", data2);
  data2 = JSON.parse(data2);
  data2 = data2.reduce((c, n) => {
    if (datas.includes(n[5])) {
      c.push(n[0]);
    }
    return c;
  }, []);

  let total = [...new Set([...data1, ...data2])];

  console.log("data1", data1, data1.length, [...new Set(data1)].length);
  console.log("data2", data2, data2.length, [...new Set(data2)].length);
  console.log("total", JSON.stringify(total), total.length);
};
// handleXlsx22();

var handleXlsx3 = async function () {
  let excel_data = await fnCommon.readXlsx({
    path: "/离职人员情况(3).xlsx",
    format: true,
  });
  await fnCommon.writeFile("data.text", excel_data);
  excel_data = JSON.parse(JSON.stringify(excel_data));
  console.log("excel——data:", excel_data);
};
// handleXlsx3();

var handleXlsx4 = async function () {
  let excel_data = await fnCommon.readXlsx({
    path: "/人像卡名单不在一卡通系统的人员.xlsx",
  });
  await fnCommon.writeFile("data.json", excel_data);
  excel_data = JSON.parse(excel_data);
  // console.log("excel——data:", excel_data);
};
handleXlsx4();
