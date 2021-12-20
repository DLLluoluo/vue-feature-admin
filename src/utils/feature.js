/* js精度计算 */
/**
 * 
 * @param { Number/String } arg1 运算数参数1
 * @param { Number/String } arg2 运算数参数2
 * @returns 
 */
//加法
function floatAdd(arg1,arg2){
  var r1,r2,m; 
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
  m=Math.pow(10,Math.max(r1,r2))
  return (arg1*m+arg2*m)/m 
}

//减法 
function floatSub(arg1,arg2){
  var r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  n=(r1>=r2)?r1:r2;
  return ((arg1*m-arg2*m)/m).toFixed(n);
}

//乘法
function floatMul(arg1,arg2){
  var m=0,s1=arg1.toString(),s2=arg2.toString(); 
  try{m+=s1.split(".")[1].length}catch(e){} 
  try{m+=s2.split(".")[1].length}catch(e){} 
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
}

//除法
function floatDiv(arg1,arg2){
  var t1=0,t2=0,r1,r2; 
  try{t1=arg1.toString().split(".")[1].length}catch(e){} 
  try{t2=arg2.toString().split(".")[1].length}catch(e){} 
  r1=Number(arg1.toString().replace(".","")) 
  r2=Number(arg2.toString().replace(".",""))
  return (r1/r2)*Math.pow(10,t2-t1); 
}

export {
  floatAdd,
  floatSub,
  floatMul,
  floatDiv,
}