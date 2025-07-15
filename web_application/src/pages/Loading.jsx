export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)]">
			<h5 className="text-8xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">ChatIO</h5>
			<h5 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Application Loading</h5>
			<span className="loading loading-infinity w-52 h-32 bg-gradient-to-r from-primary to-secondary"></span>
		</div>
	);
}
