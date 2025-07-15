import { useState } from "react";
import { useContacts } from "../contexts/ContactContext";
import useAxios from "../hooks/AxiosHooks";

export default function AddContactModal() {
    const [contactForm, setContactForm] = useState({ name: "", countryCode: 0, phone: "" });
    const { addContact } = useContacts();
    const axios = useAxios();

    const handleChange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        axios.get(`/user/${contactForm.phone}`)
        .then((res) => {
            if (res.data) {
                addContact({ ...contactForm, id: res.data.id, publicKey: res.data.publicKey, online: res.data.online, lastSeenAt: res.data.lastSeenAt });
                setContactForm({ name: "", countryCode: 0, phone: "" });
                document.getElementById("AddModalContacts").close();
            } else {
                throw new Error("User not found");
            }
        })
        .catch((err) => {
            console.error(err);
            return
        });
    };

	return (
		<dialog id="AddModalContacts" className="modal modal-bottom sm:modal-middle">
			<div className="modal-box">
				<div className="flex flex-row justify-between items-center">
					<h3 className="font-bold text-lg">Add Contacts</h3>
					<form method="dialog">
						<button className="btn btn-circle btn-outline w-8 h-8 min-h-8">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</form>
				</div>
				<div className="flex flex-col gap-2 mt-4">
					<label className="input input-bordered flex items-center gap-2">
						<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							<g id="SVGRepo_iconCarrier">
								{" "}
								<circle cx={12} cy={6} r={4} fill="currentColor" /> <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="currentColor" />{" "}
							</g>
						</svg>
						<input type="text" name="name" className="grow" placeholder="Name" value={contactForm.name} onChange={handleChange} />
					</label>
					<label className="input input-bordered flex items-center gap-2 pe-0">
						<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z" fill="currentColor" />{" "}
							</g>
						</svg>
						<select className="select select-ghost grow ps-0 focus:outline-none focus:border-0 bg-transparent" name="countryCode" value={contactForm.countryCode} onChange={handleChange}>
							<option value={0} disabled>
								Country Code
							</option>
							<option value={91}>🇮🇳 India (+91)</option>
							<option value={1}>🇺🇸 United States of America (+1)</option>
						</select>
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" fill="currentColor" />{" "}
							</g>
						</svg>
						<input type="text" className="grow" name="phone" placeholder="Phone Number" value={contactForm.phone} onChange={handleChange} />
					</label>
				</div>
				<div className="modal-action mt-3">
					<button className="btn btn-primary h-10 min-h-10 w-full" onClick={handleSubmit}>Create</button>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
}
