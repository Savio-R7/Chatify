import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="navbar bg-base-300 h-14 min-h-14 px-5 border-b border-b-black">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost h-10 min-h-10 lg:hidden me-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</div>
					<ul tabIndex={0} className="menu dropdown-content bg-base-300 rounded-box z-[1] mt-4 w-48 p-2 shadow gap-2">
						<li>
							<NavLink to="/" className="justify-between">
								Home
								<svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="SVGRepo_bgCarrier" strokeWidth={0} />
									<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
									<g id="SVGRepo_iconCarrier">
										{" "}
										<path fillRule="evenodd" clipRule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="currentColor" />{" "}
									</g>
								</svg>
							</NavLink>
						</li>
						<li>
							<NavLink to="/app" className="justify-between">
								Application
								<svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="SVGRepo_bgCarrier" strokeWidth={0} />
									<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
									<g id="SVGRepo_iconCarrier">
										{" "}
										<path fillRule="evenodd" clipRule="evenodd" d="M13.6288 20.4718L13.0867 21.3877C12.6035 22.204 11.3965 22.204 10.9133 21.3877L10.3712 20.4718C9.95073 19.7614 9.74049 19.4063 9.40279 19.2098C9.06509 19.0134 8.63992 19.0061 7.78958 18.9915C6.53422 18.9698 5.74689 18.8929 5.08658 18.6194C3.86144 18.1119 2.88807 17.1386 2.3806 15.9134C2 14.9946 2 13.8297 2 11.5V10.5C2 7.22657 2 5.58985 2.7368 4.38751C3.14908 3.71473 3.71473 3.14908 4.38751 2.7368C5.58985 2 7.22657 2 10.5 2H13.5C16.7734 2 18.4101 2 19.6125 2.7368C20.2853 3.14908 20.8509 3.71473 21.2632 4.38751C22 5.58985 22 7.22657 22 10.5V11.5C22 13.8297 22 14.9946 21.6194 15.9134C21.1119 17.1386 20.1386 18.1119 18.9134 18.6194C18.2531 18.8929 17.4658 18.9698 16.2104 18.9915C15.36 19.0061 14.9349 19.0134 14.5972 19.2098C14.2595 19.4062 14.0492 19.7614 13.6288 20.4718ZM8 11.75C7.58579 11.75 7.25 12.0858 7.25 12.5C7.25 12.9142 7.58579 13.25 8 13.25H13.5C13.9142 13.25 14.25 12.9142 14.25 12.5C14.25 12.0858 13.9142 11.75 13.5 11.75H8ZM7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H16C16.4142 8.25 16.75 8.58579 16.75 9C16.75 9.41421 16.4142 9.75 16 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9Z" fill="currentColor" />{" "}
									</g>
								</svg>
							</NavLink>
						</li>
					</ul>
				</div>
				<a className="text-2xl font-bold" href="/">
					ChatIO
				</a>
			</div>
			<div className="navbar-end hidden lg:flex">
				<ul className="menu menu-horizontal px-1 gap-2">
					<li>
						<NavLink to="/" className="">
							Home
							<svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth={0} />
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
								<g id="SVGRepo_iconCarrier">
									{" "}
									<path fillRule="evenodd" clipRule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="currentColor" />{" "}
								</g>
							</svg>
						</NavLink>
					</li>
					<li>
						<NavLink to="/app" className="">
							Application
							<svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth={0} />
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
								<g id="SVGRepo_iconCarrier">
									{" "}
									<path fillRule="evenodd" clipRule="evenodd" d="M13.6288 20.4718L13.0867 21.3877C12.6035 22.204 11.3965 22.204 10.9133 21.3877L10.3712 20.4718C9.95073 19.7614 9.74049 19.4063 9.40279 19.2098C9.06509 19.0134 8.63992 19.0061 7.78958 18.9915C6.53422 18.9698 5.74689 18.8929 5.08658 18.6194C3.86144 18.1119 2.88807 17.1386 2.3806 15.9134C2 14.9946 2 13.8297 2 11.5V10.5C2 7.22657 2 5.58985 2.7368 4.38751C3.14908 3.71473 3.71473 3.14908 4.38751 2.7368C5.58985 2 7.22657 2 10.5 2H13.5C16.7734 2 18.4101 2 19.6125 2.7368C20.2853 3.14908 20.8509 3.71473 21.2632 4.38751C22 5.58985 22 7.22657 22 10.5V11.5C22 13.8297 22 14.9946 21.6194 15.9134C21.1119 17.1386 20.1386 18.1119 18.9134 18.6194C18.2531 18.8929 17.4658 18.9698 16.2104 18.9915C15.36 19.0061 14.9349 19.0134 14.5972 19.2098C14.2595 19.4062 14.0492 19.7614 13.6288 20.4718ZM8 11.75C7.58579 11.75 7.25 12.0858 7.25 12.5C7.25 12.9142 7.58579 13.25 8 13.25H13.5C13.9142 13.25 14.25 12.9142 14.25 12.5C14.25 12.0858 13.9142 11.75 13.5 11.75H8ZM7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H16C16.4142 8.25 16.75 8.58579 16.75 9C16.75 9.41421 16.4142 9.75 16 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9Z" fill="currentColor" />{" "}
								</g>
							</svg>
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
}
