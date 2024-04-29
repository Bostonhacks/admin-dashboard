"use client";
import { useEffect, useState } from "react";
import PieChartComponent from "@/components/PieChartComponent";

export default function StatsPage() {
    const [applicants, setApplicants] = useState([]);
    const [genderData, setGenderData] = useState({});
    const [schoolData, setSchoolData] = useState({});
    const [majorData, setMajorData] = useState({});
    const [gradYearData, setGradYearData] = useState({});
    const [ethnicityData, setEthnicityData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/applicant`);
                const data = await res.json();
                setApplicants(data);

                let gender = {};
                let school = {};
                let major = {};
                let gradYear = {};
                let ethnicity = {};

                // Count occurrences of each attribute
                data.forEach(applicant => {
                    // Count gender
                    if (applicant.gender ) 
                    gender[applicant.gender] = (gender[applicant.gender] || 0) + 1;
                    

                    // Count school
                    if (applicant.schoolValue){
                        const schoolParts = applicant.schoolValue.split(" ");
                        const firstTwoWords = schoolParts.slice(0, 2).join(" ");
                        const remainder = schoolParts.slice(2).join(" ");
                        const formattedSchool = `${firstTwoWords}\n${remainder}`;
                        school[formattedSchool] = (school[formattedSchool] || 0) + 1;
                    }

                    // Count major
                    if (applicant.major) {
                        const majorsArray = applicant.major.split("/").map(major => major.trim());
                        const formattedMajor = majorsArray.join("/\n");
                        major[formattedMajor] = (major[formattedMajor] || 0) + 1;
                    }

                    // Count grad year
                    if (applicant.collegeYear)
                    gradYear[applicant.collegeYear] = (gradYear[applicant.gradYear] || 0) + 1;

                    // Count ethnicity
                    if (applicant.ethnicity)
                    ethnicity[applicant.ethnicity] = (ethnicity[applicant.ethnicity] || 0) + 1;
                });

                setGenderData(gender);
                setSchoolData(school);
                setMajorData(major);
                setGradYearData(gradYear);
                setEthnicityData(ethnicity);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    const genderChartData = Object.entries(genderData).map(([gender, count]) => ({ value: count, label: gender }));
    const schoolChartData = Object.entries(schoolData).map(([school, count]) => ({ value: count, label: school }));
    const majorChartData = Object.entries(majorData).map(([major, count]) => ({ value: count, label: major }));
    const gradYearChartData = Object.entries(gradYearData).map(([gradYear, count]) => ({ value: count, label: gradYear }));
    const ethnicityChartData = Object.entries(ethnicityData).map(([ethnicity, count]) => ({ value: count, label: ethnicity }));

    const piechartStyles = "m-5 background-tertiary pb-5 rounded-lg shadow-xl";
    const headerStyles = "text-3xl font-[500] mt-10 text-primary ml-5";

    return (
        <main className="flex flex-col items-center background-primary text-primary w-full">
            <h1 className="text-3xl font-bold mt-10">Stats</h1>
            <div className="grid lg:grid-cols-2 grid-cols:1">
                <span className={piechartStyles}>
                <h1 className={headerStyles}>Gender</h1>
                <PieChartComponent data={genderChartData}/>
                </span>

                <span className={piechartStyles}>
                <h1 className={headerStyles}>Schools</h1>
                <PieChartComponent data={schoolChartData} />
                </span>
                
                <span className={piechartStyles}>
                <h1 className={headerStyles}>Majors</h1>
                <PieChartComponent data={majorChartData} />
                </span>

                <span className={piechartStyles}>
                <h1 className={headerStyles}>Class Year</h1>
                <PieChartComponent data={gradYearChartData} />
                </span>

                <span className={piechartStyles}>
                <h1 className={headerStyles}>Ethnicity</h1>
                <PieChartComponent data={ethnicityChartData} />
                </span>
            </div>
        </main>
    );
}
