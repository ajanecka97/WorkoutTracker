export function defaultCompare(a, b, descending = false) {
	if (a < b) {
		return descending ? 1 : -1;
	}
	if (a > b) {
		return descending ? -1 : 1;
	}
	return 0;
}

export function compareDates(date1, date2, descending = false) {
	if (descending) {
		return date1 < date2 ? 1 : -1;
	}
	return date1 > date2 ? 1 : -1;
}

export function compareDatesFromStrings(date1, date2, descending = false) {
	return compareDates(new Date(date1), new Date(date2), descending);
}

export function groupByProperty(array, property, transformFunction = (x) => x) {
	return array.reduce(function (groups, item) {
		var val = transformFunction(item[property]);
		groups[val] = groups[val] || [];
		groups[val].push(item);
		return groups;
	}, {});
}

export function groupByPropertySorted(
	array,
	property,
	transformFunction = (x) => x,
	sortFunction = defaultCompare,
	descending = false
) {
	var objectAsArray = Object.entries(groupByProperty(array, property, transformFunction)).map(
		([key, value]) => ({
			key,
			value,
		})
	);

	objectAsArray.sort((a, b) => sortFunction(a.key, b.key, descending));
	return objectAsArray;
}

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function impale(text, separator = ' ') {
	return text.split(separator).join('-');
}

export function getQueryParameterFromUrl(parameter) {
	return new URLSearchParams(window.location.search).get(parameter);
}

export function generateUUID() {
	// Public Domain/MIT
	var d = new Date().getTime(); //Timestamp
	var d2 =
		(typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16; //random number between 0 and 16
		if (d > 0) {
			//Use timestamp until depleted
			r = (d + r) % 16 | 0;
			d = Math.floor(d / 16);
		} else {
			//Use microseconds since page-load if supported
			r = (d2 + r) % 16 | 0;
			d2 = Math.floor(d2 / 16);
		}
		return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
	});
}

export function sortByProperty(
	array,
	property,
	transformFunction = (x) => x,
	sortFunction = defaultCompare,
	descending = false
) {
	const returnArtray = array.sort((a, b) => {
		console.log(
			a[property],
			b[property],
			transformFunction(a[property]),
			transformFunction(b[property])
		);
		return sortFunction(
			transformFunction(a[property]),
			transformFunction(b[property]),
			descending
		);
	});
	console.log(returnArtray);
	return returnArtray;
}

export function toLocaleDateString(date) {
	if (!date) return '-';
	return new Date(date).toLocaleDateString();
}

export function getCurrentFileName() {
	return window.location.pathname.split('/').pop();
}
