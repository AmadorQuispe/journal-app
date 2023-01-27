const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getLongMonthName = (date) => {
    return monthNames[date.getMonth()];
}

export const getShortMonthName = (date) => {
    return monthNames[date.getMonth()].substring(0, 3);
}

export const getDateNow = () => {
  return new Date().toDateString();
}