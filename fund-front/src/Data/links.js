export const navLinks = [
  { id: 1, title: "Home", link: "/#" },
  { id: 2, title: "About", link: "/#" },
  { id: 3, title: "Posts", link: "/#" },
  { id: 4, title: "Blog", link: "/#" },
  { id: 5, title: "Donate", link: "/#" },
  { id: 6, title: "Contact", link: "/#" },
];

export const donationPosts = [
  {
    id: 1,
    category: "Medical",
    title: "Help John Fight Cancer",
    shortText:
      "John has been diagnosed with stage 3 cancer. Help us raise funds for his treatment.",
    image: "./images/john.png",
    moneyGoal: 50000,
    amountRaised: 15000,
    featured: false,
    approved: true,
  },
  {
    id: 2,
    category: "Education",
    title: "Scholarship Fund for Emily",
    shortText:
      "Emily is a bright student who needs financial support to continue her education.",
    image: "./images/emily.png",
    moneyGoal: 20000,
    amountRaised: 13000,
    featured: false,
    approved: true,
  },
  {
    id: 3,
    category: "Community",
    title: "Rebuild Local Playground",
    shortText:
      "Our community playground was destroyed in a storm. Let's come together to rebuild it for our kids.",
    image: "./images/play.png",
    moneyGoal: 10000,
    amountRaised: 8000,
    featured: true,
    approved: true,
  },
  {
    id: 4,
    category: "Animal Welfare",
    title: "Save Homeless Dogs",
    shortText:
      "Support our shelter in providing care and finding homes for abandoned dogs.",
    image: "./images/dog.png",
    moneyGoal: 15000,
    amountRaised: 15000,
    featured: true,
    approved: true,
  },
  {
    id: 5,
    category: "Disaster Relief",
    title: "Support Flood Victims",
    shortText:
      "Help us provide essential supplies and support to families affected by the recent floods.",
    image: "./images/flood.png",
    moneyGoal: 30000,
    amountRaised: 21000,
    featured: true,
    approved: false,
  },
  {
    id: 6,
    category: "Disaster Relief 2",
    title: "Support Flood Victims",
    shortText:
      "Help us provide essential supplies and support to families affected by the recent floods.",
    image: "./images/flood.png",
    moneyGoal: 30000,
    amountRaised: 30000,
    featured: true,
    approved: false,
  },
];

export const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
  },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "User" },
  { id: 5, name: "Evan Davis", email: "evan@example.com", role: "Editor" },
];
