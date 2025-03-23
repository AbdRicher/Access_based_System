import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/Access"; // Update this line
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = 3000;

const currentuser = "";
app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
// ✅ Correct CORS settings
app.use(
    cors({
      origin: "http://localhost:5173", // Allow frontend
      credentials: true, // Allow cookies/auth headers
    })
  );

const Registration = mongoose.model(
  "Registration",
  new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["user", "admin"], // Only allows 'user' or 'admin'
      default: "user", // Default value if none is provided
    },
  })
);

app.post("/", async (req, res) => {
  console.log("📥 Full Request Body:", req.body); // Debugging step

  const email = req.body.email;
  const password = req.body.password;

  console.log("📥 email:", email);
  console.log("📥 Password:", password);

  try {
      // Check if a user exists in the database
      const user = await Registration.findOne({ email: email, password: password });

      if (!user) {
          console.log("❌ User not found or incorrect credentials.");
          return res.status(401).json({ message: "User not found or incorrect credentials." });
      }

      console.log("✅ Login successful:", user);
      currentuser = user.type;
      res.status(200).json({
        message: "Login successful",
        user: {
          email: user.email,
          type: user.type, // Send user role (admin/user)
        },
      });
      
  } catch (error) {
      console.error("❌ Error checking user:", error);
      res.status(500).json({ message: "An error occurred during login." });
  }
});


app.post("/adminlogin", async (req, res) => {
    console.log("📥 Full Request Body:", req.body); // Debugging step
  
    const email = req.body.email;
    const password = req.body.password;
  
    console.log("📥 email:", email);
    console.log("📥 Password:", password);
  
    try {
        // Check if a user exists in the database
        const user = await Registration.findOne({ email: email, password: password });
  
        if (!user) {
            console.log("❌ Admin not found or incorrect credentials.");
            return res.status(401).json({ message: "Admin not found or incorrect credentials." });
        }
  
        console.log("✅ Admin Login successful:", user);
        currentuser = user.type;
        res.status(200).json({
          message: "Admin Login successful",
          user: {
            email: user.email,
            type: user.type, // Send user role (admin/user)
          },
        });
        
    } catch (error) {
        console.error("❌ Error checking user:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
  });

  app.post("/type_details", async (req, res) => {
    const user = { type: "admin" }; // Hardcoded for now; replace with real user data

    res.status(200).json({
        message: "Data sent",
        user: {
            type: currentuser, // Ensure this exists
        },
    });
});

  

app.post("/register", async (req, res) => {
  try {
    const registrationData = req.body;
    console.log("📥 Received data:", registrationData);

    //   Check if email already exists
    const existingUser = await Registration.findOne({
      email: registrationData.email,
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Create and save new registration
    const newRegistration = new Registration(registrationData);
    await newRegistration.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("❌ Error during registration:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.message });
    }

    res.status(500).json({ message: "An error occurred during registration." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
