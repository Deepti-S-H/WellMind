export const areAllFieldsFilled = (data) => {
    const fieldNames = Object.keys(data);
    const fieldsToCheck = {};
    fieldNames.forEach((fieldName) => {
        fieldsToCheck[fieldName] = data[fieldName];
    });

    for (const field in fieldsToCheck) {
        if (fieldsToCheck[field] === "") {
            return "inactive-btn";
        }
    }

    return "active-btn";
};

export const isDataArray = (variable) => {
    return Array.isArray(variable);
}

export const typeOfData = (variable) => {
    return typeof variable;
}

export default function calculateUsedTime() {
    let startTime;
    startTime = performance.now(); 
    localStorage.setItem("currentTime", startTime);
   
}


