'use client';

import { useEffect, useState } from "react";

export default function ApplicationPage() {

    const [applicants , setApplicant] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/applicant")
        .then(res => res.json())
        .then(data => setApplicant(data));
    }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>BostonHacks </div>
      <ul>
        {applicants.map(applicant => (
            <li key={applicant.id} className="mb-5">
                <h3>Applicant name: {applicant.firstName}{applicant.lastName}</h3>
                <p>Applicant email: {applicant.email}</p>
                <p>Applicant school: {applicant.schoolLabel}</p>
                <p>Applicant github: {applicant.github}</p>
            </li>
        ))}
      </ul>
    </main>
  );
}
