import React from "react";
import Breadcrumbs from "../Components/Breadcrumbs";

const TolerableStandard = () => {
  return (
    <div className="subPage">
      <Breadcrumbs child="The Tolerable Standard" />

      <section className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">The Tolerable Standard</h1>
        <p className="mb-4">
          This is the minimum standard required by Scottish law for a home to be
          considered safe and liveable. If a property fails any one of these
          points, it is legally below the tolerable standard and the council can
          take action.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          A house meets the Tolerable Standard if it:
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>is structurally stable</li>
          <li>is substantially free from rising or penetrating damp</li>
          <li>
            has satisfactory natural and artificial lighting, ventilation, and
            heating
          </li>
          <li>has satisfactory thermal insulation</li>
          <li>
            has an adequate piped supply of clean, wholesome water inside the
            house
          </li>
          <li>has a sink with hot and cold water inside the house</li>
          <li>
            has a toilet exclusively for occupants, suitably placed inside the
            house
          </li>
          <li>
            has a fixed bath or shower and a wash hand basin, each with hot and
            cold water and suitably placed inside
          </li>
          <li>
            has an effective system for draining and disposing of foul water
            (sewage) and surface water (rain)
          </li>
          <li>
            has a supply of electricity and electrical installations that are
            adequate and safe to use
          </li>
          <li>has satisfactory facilities for cooking food inside</li>
          <li>
            has satisfactory access to all external doors and outbuildings
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Fire and carbon monoxide alarms required since 1 February 2022
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>one smoke alarm in the main living room</li>
          <li>
            one smoke alarm in every upstairs and downstairs hallway or landing
          </li>
          <li>one heat alarm in the kitchen</li>
          <li>all alarms must be ceiling mounted and interlinked</li>
          <li>
            a carbon monoxide detector in any room with a carbon fuelled heating
            appliance or flue (does not need to be interlinked)
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Why this matters</h2>
        <p className="mb-2">
          If any of the above is missing or unsafe, your home is below the legal
          minimum. Councils can issue repair notices, closing orders, or other
          enforcement. Reporting problems helps force action and protects
          tenants.
        </p>
      </section>
    </div>
  );
};

export default TolerableStandard;
