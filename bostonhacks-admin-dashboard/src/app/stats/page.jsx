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

    return (
        <main className="flex flex-col items-center bg-black text-white">
            <h1 className="text-3xl font-bold mt-10">Stats</h1>
            <div>
            <h1 className="text-3xl font-bold mt-10">Gender</h1>
            <PieChartComponent data={genderChartData}/>

            <h1 className="text-3xl font-bold mt-10">Schools</h1>
            <PieChartComponent data={schoolChartData} />
            
            <h1 className="text-3xl font-bold mt-10">Majors</h1>
            <PieChartComponent data={majorChartData} />
            
            <h1 className="text-3xl font-bold mt-10">Class Year</h1>
            <PieChartComponent data={gradYearChartData} />
            
            <h1 className="text-3xl font-bold mt-10">Ethnicity</h1>
            <PieChartComponent data={ethnicityChartData} />
            </div>
        </main>
    );
}
