function compareDates(date1, date2, descending = false){
    if(descending){
        return date1 < date2 ? 1 : -1;
    }
    return date1 > date2 ? 1 : -1;
}