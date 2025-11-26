import React from "react";
import Breadcrumbs from "../Components/Breadcrumbs";
import {
	ImageList,
	ImageListItem,
	useMediaQuery,
	useTheme,
} from "@mui/material";

const Powers = () => {
	const theme = useTheme();
	const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

	const cols = isXlUp ? 3 : isMdUp ? 2 : 1;

	const Power = ({ title, link, explainer, quote }) => {
		return (
			<div
				style={{
					backgroundColor: "white",
					padding: "20px",
					maxWidth: "500px",
				}}
			>
				<h3 style={{ marginBottom: "0", marginTop: "0" }}>{title}</h3>
				<span>{explainer}</span>
				<br />
				<div
					style={{
						whiteSpace: "pre-line",
						margin: "5px 5px 5px 30px",
						padding: "5px",
						// border: "1px solid black",
						display: "inline-block",
					}}
				>
					<em>{quote}</em>
				</div>
				<br />
				Source: <i>{link}</i>
			</div>
		);
	};

	return (
		<div className="subPageFull">
			<div className="subPage">
				<Breadcrumbs child="Council powers" />

				<h1>The Council has all the powers it needs</h1>

				<p>
					But you wouldn't know it.
					<br />
					<br />
					Despite a wide range of powers, tools and even statutory obligations,
					the City of Edinburgh Council acts as though there's nothing they can
					- or are required to - do about rogue landlords in our city.
					<br />
					<br />
					<b>That is nonsense.</b>
					<br />
					<br />
					<h3 style={{marginTop: '0'}}>
						Below are just some of the powers the Council has to take action.
					</h3>
				</p>
				<hr />
			</div>

			<div className="subPageFullInner">
				<ImageList
					variant="masonry"
					cols={cols}
					gap={40}
					sx={{
						paddingTop: '20px',
						width: "100%",
						height: "auto",
						"& .MuiImageListItem-root": {
							verticalAlign: "top", // 🔑 top-align cards across the row
							breakInside: "avoid",
						},
					}}
				>
					<ImageListItem>
						<Power
							title="Rent Penalty Notices"
							explainer="Where a landlord is not registered, local authorities can issue a notice stipulating that the tenant does not need to, and cannot be compelled to, pay rent."
							link={
								<span>
									Antisocial Behaviour etc. (Scotland) Act 2004{" "}
									<a
										href="https://www.legislation.gov.uk/asp/2004/8/section/94"
										target="_blank"
									>
										Section 22
									</a>
								</span>
							}
							quote={`“Where a notice is served under this section, during the relevant period—
(a)no rent shall be payable under any lease or occupancy arrangement in respect of the house to which the notice relates”`}
						/>{" "}
					</ImageListItem>

					<ImageListItem>
						{" "}
						<Power
							title="Third-Party Applications"
							explainer="Local authorities are able to make applications to the Housing Tribunal on behalf of tenants"
							link={
								<span>
									Housing (Scotland) Act 2006,{" "}
									<a
										href="https://www.legislation.gov.uk/asp/2006/1/section/22"
										target="_blank"
									>
										Section 22
									</a>
								</span>
							}
							quote={`“A person mentioned in subsection (1B) may apply to the First-tier
          Tribunal for determination of whether a landlord has failed to comply
          with the duty imposed by section 14(1)(b) [Landlord's duty to repair
          and maintain] [..]
          (1B)The persons are—
          (a)a local authority”`}
						/>
					</ImageListItem>

					<ImageListItem>
						<Power
							title="Tolerable Standard"
							explainer="Councils have a duty to ensure all houses in their area meet the basic minimum standard."
							link={
								<span>
									Housing (Scotland) Act 1987,{" "}
									<a
										href="https://www.legislation.gov.uk/ukpga/1987/26/section/85"
										target="_blank"
										rel="noreferrer"
									>
										Section 85(1)
									</a>
								</span>
							}
							quote={`“It shall be the duty of every local authority to secure that all houses in their district which do not meet the tolerable standard are closed, demolished or brought up to the tolerable standard within such period as is reasonable in all the circumstances.”`}
						/>
					</ImageListItem>
					<ImageListItem>
						{" "}
						<Power
							title="Action plans"
							explainer="Councils must give landlords advice and assistance where they could take steps to avoid refusal or removal from the register."
							link={
								<span>
									The Private Landlord Registration (Advice and Assistance)
									(Scotland) Regulations 2005,{" "}
									<a
										href="https://www.legislation.gov.uk/ssi/2005/557/regulation/3"
										target="_blank"
										rel="noreferrer"
									>
										Section 3
									</a>{" "}
									and{" "}
									<a
										href="https://www.gov.scot/publications/landlord-registration-statutory-guidance-local-authorities-2017-statutory-guidance-local/"
										target="_blank"
										rel="noreferrer"
									>
										Landlord Registration: Statutory Guidance
									</a>
								</span>
							}
							quote={`“that local authority shall, if it considers that the applicant or registered person can, or might be able to, take action to avert that proposed refusal or removal, give the applicant or registered person advice on the appropriate action to take.”`}
						/>
					</ImageListItem>
					<ImageListItem>
						{" "}
						<Power
							title="Work notices"
							explainer="Councils can require owners to carry out works to bring a sub-standard house into a reasonable state of repair."
							link={
								<span>
									Housing (Scotland) Act 2006,{" "}
									<a
										href="https://www.legislation.gov.uk/asp/2006/1/section/30"
										target="_blank"
										rel="noreferrer"
									>
										Section 30(1)
									</a>
								</span>
							}
							quote={`“The local authority may require the owner of a house to carry out work in it for the purposes of— [...]
            (b) bringing any house which the local authority considers to be sub-standard (whether or not situated in an HRA) into, or keeping it in, a reasonable state of repair.”`}
						/>
					</ImageListItem>
					<ImageListItem>
						{" "}
						<Power
							title="Abatement notices"
							explainer="Councils can act on statutory nuisances such as unsafe or unhealthy housing conditions."
							link={
								<span>
									Environmental Protection Act 1990,{" "}
									<a
										href="https://www.legislation.gov.uk/ukpga/1990/43/section/79"
										target="_blank"
										rel="noreferrer"
									>
										Section 79(1)(a)
									</a>{" "}
									and{" "}
									<a
										href="https://www.legislation.gov.uk/ukpga/1990/43/section/80"
										target="_blank"
										rel="noreferrer"
									>
										Section 80
									</a>
								</span>
							}
							quote={`“the following matters constitute “statutory nuisances” [...]
            any premises in such a state as to be prejudicial to health or a nuisance; [...]
            where a local authority is satisfied that a statutory nuisance exists, or is likely to occur or recur, in the area of the authority, the local authority shall serve a notice (“an abatement notice”)
            (a) requiring the abatement of the nuisance or prohibiting or restricting its occurrence or recurrence;
            (b) requiring the execution of such works, and the taking of such other steps, as may be necessary for any of those purposes”`}
						/>
					</ImageListItem>

					<ImageListItem>
						<Power
							title="Maintenance orders"
							explainer="Councils can require owners to prepare a plan for the long-term maintenance of a house."
							link={
								<span>
									Housing (Scotland) Act 2006,{" "}
									<a
										href="https://www.legislation.gov.uk/asp/2006/1/section/42"
										target="_blank"
										rel="noreferrer"
									>
										Section 42
									</a>
								</span>
							}
							quote={`“The local authority may by order (a “maintenance order”) require the owner of a house to prepare a plan (a “maintenance plan”) for securing the maintenance of the house to a reasonable standard over such period not exceeding 5 years as may be specified in the order.”`}
						/>
					</ImageListItem>
				</ImageList>
			</div>
		</div>
	);
};

export default Powers;
