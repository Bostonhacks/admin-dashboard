const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const data = [
    {
      acceptTerms: true,
      acceptTerms2: true,
      acceptTerms3: true,
      address: "Taman Kenari Jagorawi Blok VD No.3 RT04/011 Puspasari, Citeureup, Kab.Bogor, Jawa Barat",
      age: "20",
      authProvider: "google",
      bostonhacks: "An opportunity to push my skill in building applications in a very short period of time, connect with other amazing people, learn business skills",
      city: "Jawa Barat, Kabupaten Bogor",
      collegeYear: "2024",
      country: "Indonesia",
      diet: "Halal",
      educationLevel: "Undergraduate University",
      email: "wegas125yf@bu.edu",
      ethnicity: "Prefer Not to Answer",
      firstName: "Wega Syafitra",
      gender: "Man",
      github: "https://github.com/wega-syf",
      lastName: "Winarso",
      linkedin: "https://www.linkedin.com/in/wega-syafitra-winarso/?trk=public_profile_browsemap&originalSubdomain=id",
      major: "Information Systems / Information Technology / System Administration",
      otherDiet: "",
      phoneNumber: "18572004402",
      portfolio: "",
      pronouns: "He / Him / His",
      schoolLabel: "Boston University Metropolitan College",
      schoolValue: "Boston University Metropolitan College",
      shirtSize: "M",
      sleep: true,
      state: "Outside US",
      status: "Rejected",
      uid: "kI6rcgzUTLP2KW4c4BY1XSfnMiU2",
      zipCode: "16810"
    },
    {
      acceptTerms: true,
      acceptTerms2: true,
      acceptTerms3: true,
      address: "1175 Boylston Street Apt 10",
      age: "24",
      authProvider: "google",
      bostonhacks: "I would like to participate in the hackathon and compete in a challenging environment which would enable me to showcase my innovation and problem-solving abilities. I am excited to work on innovative solutions and network with lots of techies.",
      city: "Boston",
      collegeYear: "2025",
      country: "United States of America",
      diet: "Vegetarian",
      educationLevel: "Graduate University",
      email: "mihiratha123le684@gmail.com",
      ethnicity: "Asian Indian",
      firstName: "Mihir",
      gender: "Man",
      github: "",
      lastName: "Athale",
      linkedin: "https://www.linkedin.com/in/mihirathale/",
      major: "Other",
      otherDiet: "Chicken friendly",
      phoneNumber: "8578699089",
      portfolio: "",
      pronouns: "He / Him / His",
      schoolLabel: "Northeastern University",
      schoolValue: "Northeastern University",
      shirtSize: "M",
      sleep: true, // Assuming "Maybe" translates to true in this boolean context
      state: "Massachusetts",
      status: "Rejected",
      uid: "r18yIMTfxzfDSZYmhGO1igRDDaW2",
      zipCode: "02215"
    },
    {
      acceptTerms: true,
      acceptTerms2: true,
      acceptTerms3: false,
      address: "1171 Boylston Street",
      age: "21",
      authProvider: "google",
      bostonhacks: "This is the first time that I attend an in-person hack, I'm really excited to meet and have fun with other talented hackers!",
      city: "Boston",
      collegeYear: "2025",
      country: "United States of America",
      diet: "None",
      educationLevel: "Undergraduate University",
      email: "ruicliu@bu.edu",
      ethnicity: "Chinese",
      firstName: "Ruichen",
      gender: "Man",
      github: "https://github.com/bjRichardLiu",
      lastName: "Liu",
      linkedin: "https://www.linkedin.com/in/ruichen-liu/",
      major: "Computer Science / Computer Engineering / Software Engineering",
      otherDiet: "",
      phoneNumber: "7654095911",
      portfolio: "",
      pronouns: "He / Him / His",
      schoolLabel: "Boston University",
      schoolValue: "Boston University",
      shirtSize:      "M",
      sleep: false, // Assuming "No" translates to false in this boolean context
      state: "Massachusetts",
      status: "Rejected",
      uid: "E8aTpOkebvO8yUwSgWaimmrGiLp2",
      zipCode: "02215"
    },
    {
      acceptTerms: true,
      acceptTerms2: true,
      acceptTerms3: true,
      address: "150 Colony Ct",
      age: "21",
      authProvider: "google",
      bostonhacks: "I'm eager to participate in BostonHacks, I have heard nothing but good stories and reviews by friends who attend school at BU. Being born in Boston, this city holds a special place in my heart, and the opportunity to engage in a STEM-focused competition like I used to during my time with the 3958 First Robotics team during high school is something I'm particularly excited about.",
      city: "Amherst",
      collegeYear: "2025",
      country: "United States of America",
      diet: "None",
      educationLevel: "Undergraduate University",
      email: "williambizier2111@gmail.com",
      ethnicity: "Other (Please Specify)",
      firstName: "William",
      gender: "Man",
      github: "https://github.com/WilliamBizier",
      lastName: "Bizier",
      linkedin: "https://www.linkedin.com/in/williambizier/",
      major: "Computer Science / Computer Engineering / Software Engineering",
      otherDiet: "",
      phoneNumber: "7817893928",
      portfolio: "",
      pronouns: "He / Him / His",
      schoolLabel: "University at Buffalo, SUNY",
      schoolValue: "University at Buffalo, SUNY",
      shirtSize: "L",
      sleep: true, // Assuming "Maybe" translates to true in this boolean context
      state: "New York",
      status: "Rejected",
      uid: "Da8xMqsZ0LZOpbUPU3eCEXASrO93",
      zipCode: "14226"
    },
    {
      acceptTerms: true,
      acceptTerms2: true,
      acceptTerms3: true,
      address: "1287 Charter Hill Drive",
      age: "22",
      authProvider: "google",
      bostonhacks: "I would love to attend BostonHacks because I believe in the power of innovation and collaboration through hackathons. I anticipate attending workshops and networking with mentors and startups from all over the country to further improve my knowledge. BostonHacks presents a unique opportunity for me to be part of this dynamic community and contribute to the advancement of emerging technology.",
      city: "Coquitlam",
      collegeYear: "2024",
      country: "Canada",
      diet: "None",
      educationLevel: "Undergraduate University",
      email: "maxy.ca12o@gmail.com",
      ethnicity: "Chinese",
      firstName: "Max",
      gender: "Man",
      github: "https://github.com/maxcao13",
      lastName: "Cao",
      linkedin: "https://linkedin.com/in/maxcao13",
      major: "Computer Science / Computer Engineering / Software Engineering",
      otherDiet: "",
      phoneNumber: "7782319087",
      portfolio: "",
      pronouns: "He / Him / His",
      schoolLabel: "The University of British Columbia",
      schoolValue: "The University of British Columbia",
      shirtSize: "M",
      sleep: false, // Assuming "No" translates to false in this boolean context
      state: "Outside US",
      status: "Rejected",
      uid: "hJKJhvSurdXMoUC0tME9OmOUWOj1",
      zipCode: "V3E1P1"
    }
  ];

  for (const entry of data) {
    await prisma.applicant.create({
      data: entry,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

