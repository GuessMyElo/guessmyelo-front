export const Capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const gameList = {
    lol : "League of Legends"
}

export const objectIsEmpty = (object) => {
    let keys = [];
    let values = [];
    for(let key in object) {
        keys.push(key);
        if(isEmpty(object[key])) {
            values.push(object[key])
        }
    }
    
    return keys.length === 0 || values.length === 0;
}

export const isEmpty = (value) => {
  let empty = value === "" || value === undefined || value === null;
  if (!empty && typeof value === "object") {
    if (value instanceof Array) {
      empty = value.length === 0;
    } else if (value instanceof Date) {
      empty = JSON.stringify(value).length === 0;
    } else {
      empty = objectIsEmpty(value);
    }
  }

  return empty;
};
