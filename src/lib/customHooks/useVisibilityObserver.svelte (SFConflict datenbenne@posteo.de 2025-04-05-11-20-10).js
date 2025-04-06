export function useVisibilityObserver(element, options = {}) {
	let visible = $state(false);

	$effect(() => {
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{
				root: null,
				rootMargin: options.offset || '0px',
			}
		);

		observer.observe(element);

		return () => observer.disconnect();
	});

	return {
		get isVisible() {
			return visible;
		}
	};
}
