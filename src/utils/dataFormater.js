export default function dataFormater(date) {
   const newDate = new Date(date);
   // output must be: dd/mm/yyyy hh:mm
   const day = newDate.getDate();
   const month = newDate.getMonth() + 1;
   const year = newDate.getFullYear();
   const hour = newDate.getHours();
   const minutes = newDate.getMinutes();

   const formatedDate = `${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
   }/${year} ${hour < 10 ? `0${hour}` : hour}:${
      minutes < 10 ? `0${minutes}` : minutes
   }`;

   const dates = {
      onlyDate: `${day < 10 ? `0${day}` : day}/${
         month < 10 ? `0${month}` : month
      }/${year}`,
      onlyHour: `${hour < 10 ? `0${hour}` : hour}:${
         minutes < 10 ? `0${minutes}` : minutes
      }`,
      formatedDate,
   };

   return dates;
}
