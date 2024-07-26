const mysql = require("mysql");
const md5 = require("md5");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_fund_me",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database");
});

// Users table

const createUsersTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        email VARCHAR(80) NOT NULL UNIQUE,
        role SET('admin', 'user', 'editor') NOT NULL DEFAULT 'user',
        password CHAR(32) NOT NULL,
        session CHAR(32) NULL
    )`;

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table created");
  });
};

const dropUsersTable = () => {
  const sql = "DROP TABLE IF EXISTS users";

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table dropped");
  });
};

const seedUsersTable = () => {
  const sql = `
        INSERT INTO users
        (name, email, role, password)
        VALUES
        ('jonny', 'jonny@gmail.com', 'admin', '${md5("123")}'),
        ('peter', 'peter@gmail.com', 'user', '${md5("123")}'),
        ('meg', 'meg@gmail.com', 'editor', '${md5("123")}')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table seeded");
  });
};

const createPostsTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    image VARCHAR(255) NULL,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    amountRaised DECIMAL(10, 2) NOT NULL,
    category ENUM('animals', 'sports', 'family', 'other', 'medical', 'business', 'community', 'competitions', 'creative', 'education', 'emergencies', 'environment', 'events', 'faith', 'funerals & memorials', 'monthly bills', 'newlyweds', 'travel', 'ukraine relief', 'volunteer', 'wishes') NOT NULL DEFAULT 'other',
    featured BOOLEAN NOT NULL DEFAULT false,
    approved BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Posts table created");
  });
};

const createDonationsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS donations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      sponsorName VARCHAR(255) NOT NULL,
      post_id INT NOT NULL,
      donationAmount DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Donations table created");
  });
};

const dropPostsTable = () => {
  const sql = "DROP TABLE IF EXISTS posts";
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Posts table dropped");
  });
};

const dropDonationsTable = () => {
  const sql = "DROP TABLE IF EXISTS donations";
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Donations table dropped");
  });
};

const seedPostsTable = () => {
  const sql = `INSERT INTO posts (url, title, text, image, user_id, amount, amountRaised, category, featured, approved) VALUES 
      ('help-john-fight-cancer', 'Help John Fight Cancer', 'John has been diagnosed with stage 3 cancer. Help us raise funds for his treatment.', 'images/john.png', 1, 50000.00, 15000.00, 'medical', false, true),
      ('help-animals', 'Help Animals in Need', 'We are raising funds to help animals in shelters.', 'images/animals.jpg', 1,  1500.00, 500.00,'animals',  false, true),
      ('sports-equipment', 'Fund for New Sports Equipment', 'We need new equipment for our local sports team.', 'images/sports.jpg', 2, 2500.00, 800.00, 'sports',  false, true),
      ('family-support', 'Support for a Family in Need', 'Raising funds to support a family going through a tough time.', 'images/family.jpg', 3, 3000.00, 1200.00, 'family',  false, true),
      ('miscellaneous-help', 'Miscellaneous Help', 'Raising funds for various needs in the community.', 'images/other.jpg', 2, 1000.00, 400.00, 'other',  false, true)
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Posts table seeded");
  });
};

const seedDonationsTable = () => {
  const donations = [
    { sponsorName: "Alice Johnson", post_id: 1, donationAmount: 100.0 },
    { sponsorName: "Bob Smith", post_id: 2, donationAmount: 150.0 },
    { sponsorName: "Charlie Brown", post_id: 3, donationAmount: 200.0 },
    { sponsorName: "Diana Prince", post_id: 4, donationAmount: 250.0 },
    { sponsorName: "Eve Adams", post_id: 5, donationAmount: 300.0 },
  ];

  const sql =
    "INSERT INTO donations (sponsorName, post_id, donationAmount) VALUES ?";
  const values = donations.map((donation) => [
    donation.sponsorName,
    donation.post_id,
    donation.donationAmount,
  ]);

  connection.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
};

dropUsersTable();
dropPostsTable();
dropDonationsTable();
createUsersTable();
createPostsTable();
createDonationsTable();
seedUsersTable();
seedPostsTable();
seedDonationsTable();

connection.end(function (err) {
  if (err) throw err;
  console.log("Connection closed");
});
