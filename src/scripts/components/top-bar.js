function generateBreadcrumbs(basePath) {
	const breadcrumbs = document.createElement('nav');
	breadcrumbs.setAttribute('aria-label', 'breadcrumb');
	const breadcrumbList = document.createElement('ol');
	breadcrumbList.classList.add('breadcrumb');

	const home = document.createElement('li');
	home.classList.add('breadcrumb-item');
	const homeLink = document.createElement('a');
	homeLink.href = `${basePath}/index.html`;
	homeLink.innerText = 'Treningi';
	home.appendChild(homeLink);
	breadcrumbList.appendChild(home);

	const workoutId = getQueryParameterFromUrl('workoutId');
	if (workoutId) {
		homeLink.classList.add('active');
		const workout = getWorkoutById(workoutId);
		const workoutName = workout.name;
		const workoutNameElement = document.createElement('li');
		workoutNameElement.classList.add('breadcrumb-item');
		workoutNameElement.innerText = workoutName;
		workoutLink = document.createElement('a');
		workoutLink.href = `${basePath}/workout.html?id=${workoutId}`;
		breadcrumbList.appendChild(workoutNameElement);
	}
}

function getBasePath() {
	const basePath = window.location.href.split('/').slice(0, -1).join('/');
	console.log(basePath);
	return basePath;
}

export function setupTopBar() {
	const topBar = document.getElementById('top-bar');
	const inxexPath = getBasePath();
	const basePath = getBasePath();
}
