import React from "react";
import Breadcrumbs from "../Components/Breadcrumbs";

const FPP = () => {
  return (
    <div
      className="subPage"
    >
      <Breadcrumbs child="The 'Fit and Proper Person' Test" />

      <section className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          The Fit and Proper Person test
        </h1>
        <p className="mb-4">
          Private landlords in Scotland must be registered with the council. To
          register, they must be considered fit and proper. This means the
          council has to be satisfied that the landlord and any agent can be
          trusted to manage homes lawfully and responsibly.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Councils can treat someone as failing the test if there is relevant
          evidence of:
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            criminal convictions, including offences involving fraud or
            dishonesty, firearms, violence, drugs, or sexual offences
          </li>
          <li>unlawful discrimination in the course of business</li>
          <li>
            contraventions of housing or landlord and tenant law, including
            ignoring duties as a landlord or failing to meet legal property
            standards
          </li>
          <li>
            antisocial behaviour linked to the landlord, their agent, their
            tenants, or the properties they manage
          </li>
          <li>
            failure to comply with statutory notices or orders, such as
            Repairing Standard Enforcement Orders, HMO licence conditions, or
            other housing enforcement action
          </li>
          <li>
            failure to follow applicable codes of practice or guidance for
            letting and property management where relevant
          </li>
          <li>
            any other information that suggests the person is not suitable to
            act as a landlord or manage property
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          What councils can do
        </h2>
        <p className="mb-2">
          Councils can refuse or remove registration. They can serve a rent
          penalty notice so rent is not lawfully payable, and they can prosecute
          unregistered letting. Tenants can report concerns and provide evidence
          to help the council act.
        </p>
      </section>
    </div>
  );
};

export default FPP;
