// import inflection from "inflection";
// import generate from "nanoid/generate";
import swal from "sweetalert2";

// export const getNounNames = (name = "") => {
//     return {
//         name,
//         singularName: inflection.singularize(name),
//         pluralName: inflection.pluralize(name),
//         titleizeName: inflection.titleize(name),
//         humanizeName: inflection.humanize(inflection.underscore(name)),
//     };
// };

export const isObjectEmpty = (object) => {
    return Object.keys(object).length === 0;
};

export const isArrayEmpty = (array) => {
    return array.length === 0;
};

export const sweetalert = (icon, title, message) => {
    return swal.fire({
        icon: icon,
        title: title,
        text: message,
    });
}

export const sweetalertIcon = {
    success: "success",
    error: "error"
}

// export const generateUUID = (length = 22, options = { numericOnly: false }) => {
//   let textPattern =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let numericOnlyPattern = "0123456789";

//   const pattern =
//     options && options.numericOnly ? numericOnlyPattern : textPattern;

//   let text = generate(pattern, length);
//   return text;
// };

export const getDate = (date) => {
    let d = new Date(date)
    if (d.getDate() < 10 && d.getMonth() < 10) {
      return d.getFullYear() + "-0" + (d.getMonth() + 1) + "-0" + d.getDate()
    } else {
      if (d.getDate() < 10) {
        // console.log('date ::', d.getFullYear() + "-" + (d.getMonth() + 1) + "-0" + d.getDate())
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-0" + d.getDate()
      } else if (d.getMonth() < 10) {
        return d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate()
      }
    }
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
    // return "2020-11-11"
  }