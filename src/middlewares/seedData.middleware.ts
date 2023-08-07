import {
  EducationExperienceStatus,
  IEducationExperience,
} from "../components/education_experience/data/interfaces/IEducationExperience";
import EducationExperienceModel from "../components/education_experience/data/schemas/EducationExperienceModel";
import { IUser } from "../components/users/data/interfaces/IUser";
import UserModel from "../components/users/data/schemas/UserModel";
import { hashPassword } from "../helpers/passwordHash";

import {
  UserRole,
} from "../components/users/data/interfaces/IUser";

const users: Partial<IUser>[] = [
  {
    email: "john.doe@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    phoneNumber: "123456789",
    role: UserRole.User,
    address: {
      country: "USA",
      stateOrProvince: "New York",
      city: "New York",
      district: "Manhattan",
      streetAddress: "34",
      postalCode: "12",
    },
  },
  {
    email: "jane.doe@example.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Doe",
    gender: "Female",
    phoneNumber: "987654321",
    role: UserRole.User,
    address: {
      country: "USA",
      stateOrProvince: "California",
      city: "Los Angeles",
      district: "Hollywood",
      streetAddress: "12",
      postalCode: "34",
    },
  },
];

const educationExperiences: (Partial<IEducationExperience> & {
  userEmail: string;
})[] = [
  {
    userEmail: "john.doe@example.com",
    schoolName: "Harvard University",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    startYear: 2010,
    endYear: 2014,
    grade: "A",
    description: "Studied Computer Science",
    status: EducationExperienceStatus.Completed,
  },
  {
    userEmail: "jane.doe@example.com",
    schoolName: "MIT",
    degree: "Master of Science",
    fieldOfStudy: "Artificial Intelligence",
    startYear: 2015,
    endYear: 2018,
    grade: "A+",
    description: "Specialized in Artificial Intelligence",
    status: EducationExperienceStatus.Completed,
  },
];

async function seedDatabase() {
  try {
    // Delete existing records
    await UserModel.deleteMany({});
    await EducationExperienceModel.deleteMany({});

    // Iterate through the users array
    for (const user of users) {
      try {
        if (user.password) {
          user.password = await hashPassword(user.password);
        }

        // Create the user
        const createdUser = await UserModel.create(user);
        console.log(`User ${createdUser.email} seeded successfully`);

        // Find corresponding education experiences
        const userEducationExperiences = educationExperiences.filter(
          (exp) => exp.userEmail === user.email
        );

        for (const exp of userEducationExperiences) {
          exp.userId = createdUser._id.toString(); // Update with the real user ID

          // Remove the temporary userEmail field and assert the correct type
          const { userEmail, ...educationExperienceData } = exp;
          await EducationExperienceModel.create(
            educationExperienceData as Partial<IEducationExperience>
          );

          console.log(
            `Education experience for ${createdUser.email} seeded successfully`
          );
        }
      } catch (error) {
        console.error(`Error seeding user ${user.email}:`, error);
      }
    }

    console.log("Database seeding completed");
  } catch (generalError) {
    console.error("General error seeding the database:", generalError);
  }
}

export default seedDatabase;
