export const addMemberBasicInfo = [
  {
    id: 0,
    label: "First name",
    name: "first_name",
    placeholder: "Enter first name",
    type: "text",
  },
  {
    id: 1,
    label: "Last name",
    name: "last_name",
    placeholder: "Enter last name",
    type: "text",
  },
  {
    id: 2,
    label: "Gender",
    name: "gender",
    placeholder: "Select",
    type: "dropdown",
    list: [
      {
        value: "Male",
        label: "Male",
      },
      {
        value: "Female",
        label: "Female",
      },
    ],
  },
  {
    id: 3,
    label: "Date of birth",
    name: "dob",
    placeholder: "DD-MM-YYYY",
    type: "date",
  },
  {
    id: 4,
    label: "Phone number",
    name: "phone_number",
    placeholder: "Enter phone number",
    type: "text",
  },
  {
    id: 5,
    label: "Job title",
    name: "job_title",
    placeholder: "Select job",
    type: "dropdown",
    list: [
      {
        value: "Front-End Developer",
        label: "Front-End Developer",
        children: [
          {
            value: "Angular JS Developer",
            label: "Angular JS Developer",
          },
          {
            value: "React JS Developer",
            label: "React JS Developer",
          },
          {
            value: "Vue JS Developer",
            label: "Vue JS Developer",
          },
          {
            value: "Javascript Developer",
            label: "Javascript Developer",
          },
          {
            value: "NextJS Developer",
            label: "NextJS Developer",
          },
        ],
      },
      {
        value: "Back-End Developer",
        label: "Back-End Developer",
        children: [
          {
            value: "ASP.NET Developer",
            label: "ASP.NET Developer",
          },
          {
            value: "PHP Developer",
            label: "PHP Developer",
          },
          {
            value: "Java Developer",
            label: "Java Developer",
          },
          {
            value: "Python Developer",
            label: "Python Developer",
          },
          {
            value: "NodeJS Developer",
            label: "NodeJS Developer",
          },
          {
            value: "ExpressJS Developer",
            label: "ExpressJS Developer",
          },
        ],
      },
      {
        value: "Mobile App Developer",
        label: "Mobile App Developer",
        children: [
          {
            value: "IOS Developer",
            label: "IOS Developer",
          },
          {
            value: "Android Developer",
            label: "Android Developer",
          },
          {
            value: "Flutter Developer",
            label: "Flutter Developer",
          },
          {
            value: "React NAtive Developer",
            label: "React NAtive Developer",
          },
        ],
      },
      {
        value: "Embedded Developer",
        label: "Embedded Developer",
        children: [
          {
            value: "Firmware Developer",
            label: "Firmware Developer",
          },
          {
            value: "PCB Designer",
            label: "PCB Designer",
          },
          {
            value: "Embedded System Engineer",
            label: "Embedded System Engineer",
          },
        ],
      },
      {
        value: "Ecommerce Developer",
        label: "Ecommerce Developer",
        children: [
          {
            value: "Wordpress Developer",
            label: "Wordpress Developer",
          },
          {
            value: "Shopify Developer",
            label: "Shopify Developer",
          },
        ],
      },
      {
        value: "Digital Marketer",
        label: "Digital Marketer",
        children: [
          {
            value: "Social Media Expert",
            label: "Social Media Expert",
          },
          {
            value: "PPC Specialist",
            label: "PPC Specialist",
          },
          {
            value: "SEO Expert",
            label: "SEO Expert",
          },
          {
            value: "Performance Marketer",
            label: "Performance Marketer",
          },
        ],
      },
      {
        value: "Sale Development Representative",
        label: "Sale Development Representative",
        children: [
          {
            value: "Lead Generation Specialist",
            label: "Lead Generation Specialist",
          },
          {
            value: "Sale Representative",
            label: "Sale Representative",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    label: "Employee ID",
    name: "employee_id",
    placeholder: "Enter employee id",
    type: "text",
  },
  {
    id: 7,
    label: "Role",
    name: "role",
    placeholder: "Select role",
    type: "dropdown",
    list: [
      {
        value: "Senior",
        label: "Senior",
      },
      {
        value: "Intermediate",
        label: "Intermediate",
      },
      {
        value: "Junior",
        label: "Junior",
      },
      {
        value: "Intern",
        label: "Intern",
      },
    ],
  },
  {
    id: 8,
    label: "Image",
    name: "image",
    placeholder: "Upload image",
    type: "image",
  },
];

export const addMemberCredentials = [
  {
    id: 9,
    label: "Email",
    name: "email",
    placeholder: "Enter email",
    type: "text",
  },
  {
    id: 10,
    label: "Password",
    name: "password",
    placeholder: "Enter Password",
    type: "text",
  },
  {
    id: 11,
    label: "Confirm password",
    name: "confirm_password",
    placeholder: "Confirm password",
    type: "text",
  },
];
