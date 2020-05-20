module.exports.getDate = function(){
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return today.toLocaleDateString("en-US", options);
};

module.exports.getDay = function(){
  const today = new Date();
  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options);
};

exports.getDateFromToday = (days) =>{
  const currentDate = new Date(); 
  return currentDate.setDate(currentDate.getDate() + days);
}

exports.getFormattedDate = (date)=>{
  return String(date).substring(4, 15);
}