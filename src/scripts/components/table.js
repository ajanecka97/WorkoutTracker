export function renderHeader(table, columns, hasActionButtons) {
	const thead = document.createElement('thead');
	thead.classList.add('c-table__header');
	const tr = document.createElement('tr');
	columns.forEach((column) => {
		const th = document.createElement('th');
		th.innerText = column;
		th.classList.add('c-table__cell');
		tr.appendChild(th);
	});
	if (hasActionButtons) {
		const th = document.createElement('th');
		th.innerText = '';
		th.classList.add('c-table__cell');
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	table.appendChild(thead);
}

export function renderRow(table, row, actionButtonsGroup) {
	const tr = document.createElement('tr');
	tr.classList.add('c-table__row');
	row.forEach((cell) => {
		const td = document.createElement('td');
		td.classList.add('c-table__cell');
		td.innerText = cell;
		tr.appendChild(td);
	});
	if (actionButtonsGroup.length) {
		const td = document.createElement('td');
		td.classList.add('c-table__cell');
		actionButtonsGroup.forEach((actionButton) => {
			td.appendChild(actionButton);
		});
		tr.appendChild(td);
	}
	table.appendChild(tr);
}

export function renderRowMobile(table, headers, row, actionButtonsGroup) {
	const tr = document.createElement('tr');
	const td = document.createElement('td');
	tr.classList.add('c-table__row');
	const content = document.createElement('div');
	content.classList.add('content');
	headers.forEach((header, index) => {
		const p = document.createElement('p');
		p.innerHTML = `<b>${header}:</b> ${row[index]}`;
		content.appendChild(p);
	});
	td.appendChild(content);
	tr.appendChild(td);
	if (actionButtonsGroup.length) {
		const actionsTd = document.createElement('td');
		const buttonContainer = document.createElement('div');
		buttonContainer.classList.add('button-container');
		actionButtonsGroup.forEach((actionButton) => {
			buttonContainer.appendChild(actionButton);
		});
		actionsTd.appendChild(buttonContainer);
		tr.appendChild(actionsTd);
	}

	table.appendChild(tr);
}

export function renderTableDesktop(table, headers, rows, actionButtons) {
	renderHeader(table, headers, actionButtons[0]?.length > 0 ?? false);
	rows.forEach((row, index) => {
		renderRow(table, row, actionButtons[index]);
	});
}

export function renderTableMobile(table, headers, rows, actionButtons) {
	rows.forEach((row, index) => {
		renderRowMobile(table, headers, row, actionButtons[index]);
	});
}

export function renderTable(table, headers, rows, actionButtons, mobileBreakpoint) {
	table.innerHTML = '';
	if (window.innerWidth < mobileBreakpoint) {
		renderTableMobile(table, headers, rows, actionButtons);
	} else {
		renderTableDesktop(table, headers, rows, actionButtons);
	}
}

export function setupTableRenderListener(
	table,
	headers,
	rows,
	actionButtons = [],
	mobileBreakpoint = 576
) {
	renderTable(table, headers, rows, actionButtons, mobileBreakpoint);
	window.addEventListener('resize', () => {
		renderTable(table, headers, rows, actionButtons, mobileBreakpoint);
	});
}
