import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/AxiosHooks";
import { useAuth } from "../contexts/AuthContext";

export default function HomeCard() {
	const { isPasswordProtected, isDecrypted, isUserLoggedIn, setToken } = useAuth();
	const axios = useAxios();
	const navigate = useNavigate();

	const [isOTPRequested, setIsOTPRequested] = useState(false);
	const [loginForm, setLoginForm] = useState({ phone: "" });
	const [loginError, setLoginError] = useState(null);
	const [signupForm, setSignupForm] = useState({ name: "", phone: "", countryCode: 0 });
	const [signupError, setSignupError] = useState(null);
	const [otpForm, setOtpForm] = useState({ oneTimePassword: "", phone: "" });
	const [otpError, setOtpError] = useState(null);

	const handleLoginChange = (e) => {
		setLoginForm({
			...loginForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignupChange = (e) => {
		setSignupForm({
			...signupForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleOTPFormChange = (e) => {
		setOtpForm({
			...otpForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleLoginRequest = async () => {
		if (!loginForm.phone) {
			setSignupError(null);
			setLoginError("Phone number is required");
			return;
		}
		axios
			.post("/user/otp/request", loginForm)
			.then((response) => {
				setOtpForm({
					...otpForm,
					phone: loginForm.phone,
				});
				setIsOTPRequested(true);
				setLoginError(null);
				setSignupError(null);
			})
			.catch((error) => {
				setSignupError(null);
				setLoginError(error.response.data.message);
			});
	};

	const handleSignupRequest = async () => {
		if (!signupForm.name || !signupForm.phone || !signupForm.countryCode) {
			setLoginError(null);
			setSignupError("All fields are required");
			return;
		}
		axios
			.post("/user/signup", signupForm)
			.then((response) => {
				setOtpForm({
					...otpForm,
					phone: signupForm.phone,
				});
				setIsOTPRequested(true);
				setLoginError(null);
				setSignupError(null);
			})
			.catch((error) => {
				setLoginError(null);
				setSignupError(error.response.data.message);
			});
	};

	const handleOTPVerify = async () => {
		if (!otpForm.oneTimePassword) {
			setOtpError("OTP is required");
			return;
		}
		axios
			.post("/user/login", otpForm)
			.then((response) => {
				setToken(response.data.token);
				navigate("/app");
			})
			.catch((error) => {
				setOtpError(error.response.data.message);
			});
	};

	return (
		<div className="card bg-base-300 w-full shadow-xl">
			<div className="card-body h-[34rem]">
				{isUserLoggedIn() ? (
					<>
						<h2 className="card-title justify-center mb-2 text-2xl">Notifications</h2>
						<div className="overflow-y-scroll h-80">
							<ul className="menu rounded-box w-full gap-2">
								<li>
									<a>
										Message from Glen Rodrigues <div className="badge badge-primary">99+</div>
									</a>
								</li>
								<li>
									<a>
										Message from ChatIO <div className="badge badge-primary">99+</div>
									</a>
								</li>
								{Array.from({ length: 5 }, (_, i) => (
									<li key={i}>
										<a>
											Message from Person {i + 1} <div className="badge badge-primary">{i + 1}</div>
										</a>
									</li>
								))}
							</ul>
						</div>
					</>
				) : (
					<>
						{isOTPRequested ? (
							<>
								<h2 className="card-title justify-center mb-2 text-2xl">Verify Phone Number</h2>
								<label className="input input-bordered flex items-center gap-2">
									<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g id="SVGRepo_bgCarrier" strokeWidth={0} />
										<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
										<g id="SVGRepo_iconCarrier">
											{" "}
											<path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" fill="currentColor" />{" "}
										</g>
									</svg>
									<input type="text" className="grow" name="phone" value={otpForm.phone} readOnly placeholder="Phone Number" />
								</label>
								<label className={`input input-bordered ${otpError ? "input-error" : ""} flex items-center gap-2`}>
									<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g id="SVGRepo_bgCarrier" strokeWidth={0} />
										<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
										<g id="SVGRepo_iconCarrier">
											{" "}
											<path fillRule="evenodd" clipRule="evenodd" d="M3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157ZM12.7502 10C12.7502 9.58579 12.4144 9.25 12.0002 9.25C11.586 9.25 11.2502 9.58579 11.2502 10V10.7012L10.6428 10.3505C10.2841 10.1434 9.8254 10.2663 9.61829 10.625C9.41119 10.9837 9.53409 11.4424 9.89281 11.6495L10.4997 11.9999L9.89258 12.3505C9.53386 12.5576 9.41095 13.0163 9.61806 13.375C9.82517 13.7337 10.2839 13.8566 10.6426 13.6495L11.2502 13.2987V14C11.2502 14.4142 11.586 14.75 12.0002 14.75C12.4144 14.75 12.7502 14.4142 12.7502 14V13.2993L13.3569 13.6495C13.7156 13.8566 14.1743 13.7337 14.3814 13.375C14.5885 13.0163 14.4656 12.5576 14.1069 12.3505L13.4997 11.9999L14.1067 11.6495C14.4654 11.4424 14.5883 10.9837 14.3812 10.625C14.1741 10.2663 13.7154 10.1434 13.3567 10.3505L12.7502 10.7006V10ZM6.73266 9.25C7.14687 9.25 7.48266 9.58579 7.48266 10V10.7006L8.0891 10.3505C8.44782 10.1434 8.90651 10.2663 9.11362 10.625C9.32073 10.9837 9.19782 11.4424 8.8391 11.6495L8.23217 11.9999L8.83934 12.3505C9.19806 12.5576 9.32096 13.0163 9.11386 13.375C8.90675 13.7337 8.44806 13.8566 8.08934 13.6495L7.48266 13.2993V14C7.48266 14.4142 7.14687 14.75 6.73266 14.75C6.31844 14.75 5.98266 14.4142 5.98266 14V13.2987L5.375 13.6495C5.01628 13.8566 4.55759 13.7337 4.35048 13.375C4.14337 13.0163 4.26628 12.5576 4.625 12.3505L5.23217 11.9999L4.62523 11.6495C4.26652 11.4424 4.14361 10.9837 4.35072 10.625C4.55782 10.2663 5.01652 10.1434 5.37523 10.3505L5.98266 10.7012V10C5.98266 9.58579 6.31844 9.25 6.73266 9.25ZM18.0181 10C18.0181 9.58579 17.6823 9.25 17.2681 9.25C16.8539 9.25 16.5181 9.58579 16.5181 10V10.7012L15.9106 10.3505C15.5519 10.1434 15.0932 10.2663 14.8861 10.625C14.679 10.9837 14.8019 11.4424 15.1606 11.6495L15.7676 11.9999L15.1604 12.3505C14.8017 12.5576 14.6788 13.0163 14.8859 13.375C15.093 13.7337 15.5517 13.8566 15.9104 13.6495L16.5181 13.2987V14C16.5181 14.4142 16.8539 14.75 17.2681 14.75C17.6823 14.75 18.0181 14.4142 18.0181 14V13.2993L18.6247 13.6495C18.9835 13.8566 19.4422 13.7337 19.6493 13.375C19.8564 13.0163 19.7335 12.5576 19.3747 12.3505L18.7676 11.9999L19.3745 11.6495C19.7332 11.4424 19.8561 10.9837 19.649 10.625C19.4419 10.2663 18.9832 10.1434 18.6245 10.3505L18.0181 10.7006V10Z" fill="currentColor" />{" "}
										</g>
									</svg>

									<input type="password" className="grow" name="oneTimePassword" value={otpForm.oneTimePassword} onChange={handleOTPFormChange} placeholder="OTP" />
								</label>
								{otpError && <div className="text-xs text-error">{otpError}</div>}
								<div className="card-actions">
									<button className="btn btn-primary btn-block h-10 min-h-10" onClick={handleOTPVerify}>
										Verify OTP
									</button>
								</div>
							</>
						) : (
							<>
								<h2 className="card-title justify-center mb-2 text-2xl">Login to your account</h2>
								<label className={`input input-bordered ${loginError ? "input-error" : ""} flex items-center gap-2`}>
									<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g id="SVGRepo_bgCarrier" strokeWidth={0} />
										<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
										<g id="SVGRepo_iconCarrier">
											{" "}
											<path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" fill="currentColor" />{" "}
										</g>
									</svg>
									<input type="text" className="grow" name="phone" value={loginForm.phone} onChange={handleLoginChange} placeholder="Phone Number" />
								</label>
								{loginError && <div className="text-xs text-error">{loginError}</div>}
								<div className="card-actions">
									<button className="btn btn-primary btn-block h-10 min-h-10" onClick={handleLoginRequest}>
										Request OTP
									</button>
								</div>
								<div className="divider">Don't have an account?</div>
								<h2 className="card-title justify-center mb-2 text-2xl">Create a new account</h2>
								<label className={`input input-bordered ${signupError ? "input-error" : ""} flex items-center gap-2`}>
									<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g id="SVGRepo_bgCarrier" strokeWidth={0} />
										<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
										<g id="SVGRepo_iconCarrier">
											{" "}
											<circle cx={12} cy={6} r={4} fill="currentColor" /> <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="currentColor" />{" "}
										</g>
									</svg>
									<input type="text" name="name" className="grow" value={signupForm.name} onChange={handleSignupChange} placeholder="Name" />
								</label>

								<label className={`input input-bordered ${signupError ? "input-error" : ""} flex items-center gap-2 pe-0`}>
									<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g id="SVGRepo_bgCarrier" strokeWidth={0} />
										<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
										<g id="SVGRepo_iconCarrier">
											{" "}
											<path d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z" fill="currentColor" />{" "}
										</g>
									</svg>
									<select className="select select-ghost grow ps-0 focus:outline-none focus:border-0 bg-transparent" name="countryCode" value={signupForm.countryCode} onChange={handleSignupChange}>
										<option value={0} disabled>
											Country Code
										</option>
										<option value={91}>🇮🇳 India (+91)</option>
										<option value={1}>🇺🇸 United States of America (+1)</option>
									</select>
								</label>

								<label className={`input input-bordered ${signupError ? "input-error" : ""} flex items-center gap-2`}>
									<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g id="SVGRepo_bgCarrier" strokeWidth={0} />
										<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
										<g id="SVGRepo_iconCarrier">
											{" "}
											<path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" fill="currentColor" />{" "}
										</g>
									</svg>
									<input type="text" className="grow" name="phone" value={signupForm.phone} onChange={handleSignupChange} placeholder="Phone Number" />
								</label>
								{signupError && <div className="text-xs text-error">{signupError}</div>}
								<div className="card-actions">
									<button className="btn btn-primary btn-block h-10 min-h-10" onClick={handleSignupRequest}>
										Signup
									</button>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}
