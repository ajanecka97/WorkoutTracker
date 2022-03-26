export function compareDates(date1, date2, descending = false) {
	if (descending) {
		return date1 < date2 ? 1 : -1;
	}
	return date1 > date2 ? 1 : -1;
}

export function groupByProperty(array, property) {
	return array.reduce(function (groups, item) {
		var val = item[property];
		groups[val] = groups[val] || [];
		groups[val].push(item);
		return groups;
	}, {});
}

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function impale(text) {
	return text.split(" ").join("-");
}
